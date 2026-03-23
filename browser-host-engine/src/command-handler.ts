/**
 * Command handler — dispatches incoming ORC commands to the local inference engine.
 * Uses proper protobuf Any pack/unpack for command payloads.
 */

import type { LlogosEngine } from '@daisinet/llogos-webgpu';
import type { Command } from '@daisi/sdk-generated-commands';
import {
  HeartbeatRequest,
} from '@daisi/sdk-generated-command-models';
import {
  SendInferenceRequest,
  SendInferenceResponse,
  CreateInferenceRequest,
  CreateInferenceResponse,
  CloseInferenceRequest,
  CloseInferenceResponse,
} from '@daisi/sdk-generated-inference-models';
import {
  ConnectRequest,
  ConnectResponse,
} from '@daisi/sdk-generated-session-models';
import { packAny, unpackAny } from './proto-helpers.js';

export type SendCommandFn = (command: Partial<Command>) => Promise<void>;
export type ClaimSessionFn = (sessionId: string) => Promise<boolean>;

export class CommandHandler {
  private engine: LlogosEngine;
  private activeSessions = new Map<string, AbortController>();
  private sendCommand: SendCommandFn | null = null;
  private claimSession: ClaimSessionFn | null = null;
  private log: (level: string, msg: string) => void = () => {};

  constructor(engine: LlogosEngine) {
    this.engine = engine;
  }

  setSendCommand(fn: SendCommandFn): void {
    this.sendCommand = fn;
  }

  setClaimSession(fn: ClaimSessionFn): void {
    this.claimSession = fn;
  }

  setLog(fn: (level: string, msg: string) => void): void {
    this.log = fn;
  }

  /** Build a heartbeat command with model info for sending to ORC. */
  buildHeartbeat(): Command {
    const modelInfo = this.engine.info;
    const heartbeat: HeartbeatRequest = {
      Settings: {
        Model: {
          ModelFolderPath: '',
          Models: modelInfo ? [{
            Name: modelInfo.name || 'Browser Model',
            FileName: '',
            Url: '',
            IsMultiModal: false,
            IsDefault: true,
            Enabled: true,
            LoadAtStartup: false,
            ThinkLevels: [],
            HasReasoning: false,
            Id: '',
          }] : [],
          AutomaticDownloads: false,
        },
      },
    };
    return {
      Name: 'HeartbeatRequest',
      Payload: packAny('daisi.protos.v1.HeartbeatRequest', heartbeat, HeartbeatRequest),
    };
  }

  /** Handle an incoming command from ORC. Returns a response command or null. */
  async handle(command: Command): Promise<Command | null> {
    switch (command.Name) {
      case 'HeartbeatRequest':
        // ORC heartbeat is a response to ours — don't echo back
        return null;

      case 'ConnectRequest':
        return this.handleConnect(command);

      case 'CreateInferenceRequest':
        return this.handleCreateInference(command);

      case 'SendInferenceRequest':
        return this.handleSendInference(command);

      case 'CloseInferenceRequest':
        return this.handleCloseInference(command);

      case 'CancelStreamRequest':
        return this.handleCancelStream(command);

      case 'DownloadModelRequest':
        // Browser hosts manage their own models — ignore
        return null;

      case 'UpdateRequiredRequest':
        // Browser hosts are always up to date — ignore
        return null;

      default:
        console.warn(`[cmd] Unhandled command: ${command.Name}`);
        return null;
    }
  }

  private async handleConnect(command: Command): Promise<Command> {
    const request = unpackAny(command.Payload, ConnectRequest);
    const sessionId = request?.SessionId || command.SessionId || '';

    let hasCapacity = true;
    // Claim the session with ORC
    if (this.claimSession) {
      try {
        hasCapacity = await this.claimSession(sessionId);
      } catch {
        hasCapacity = false;
      }
    }

    const response: ConnectResponse = {
      Id: hasCapacity ? sessionId : '',
      HasCapacity: hasCapacity,
      AlreadyConnected: this.activeSessions.has(sessionId),
    };

    return {
      Name: 'ConnectResponse',
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny('daisi.protos.v1.ConnectResponse', response, ConnectResponse),
    };
  }

  private handleCreateInference(command: Command): Command {
    const request = unpackAny(command.Payload, CreateInferenceRequest);
    const sessionId = request?.SessionId || command.SessionId || '';

    this.engine.resetSession();
    this.activeSessions.set(sessionId, new AbortController());

    const response: CreateInferenceResponse = {
      SessionId: sessionId,
      InferenceId: request?.SessionId || '',
    };

    return {
      Name: 'CreateInferenceResponse',
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny('daisi.protos.v1.CreateInferenceResponse', response, CreateInferenceResponse),
    };
  }

  private async handleSendInference(command: Command): Promise<Command | null> {
    const request = unpackAny(command.Payload, SendInferenceRequest);
    const sessionId = request?.SessionId || command.SessionId || '';
    const controller = this.activeSessions.get(sessionId);
    if (!controller) return null;

    const prompt = request?.Text || command.Message || '';
    if (!prompt) return null;

    const maxTokens = request?.MaxTokens || 512;
    const temperature = request?.Temperature || 0.7;
    const startTime = performance.now();

    this.log('success', `→ SendInferenceResponse Starting (max ${maxTokens} tokens)`);

    let tokenCount = 0;
    let tokenBuffer = '';
    const BATCH_SIZE = 10;
    const inferenceId = request?.InferenceId || '';

    const flushTokens = async () => {
      if (!tokenBuffer || !this.sendCommand) return;
      const streamResponse: SendInferenceResponse = {
        SessionId: sessionId,
        InferenceId: inferenceId,
        Id: '',
        Type: 0, // Text
        Content: tokenBuffer,
        AuthorRole: 'assistant',
        Format: 0,
        MessageTokenCount: tokenCount,
        SessionTokenCount: tokenCount,
        ComputeTimeMs: Math.round(performance.now() - startTime),
      };
      await this.sendCommand({
        Name: 'SendInferenceResponse',
        SessionId: sessionId,
        RequestId: command.RequestId,
        Payload: packAny('daisi.protos.v1.SendInferenceResponse', streamResponse, SendInferenceResponse),
      });
      tokenBuffer = '';
    };

    try {
      for await (const token of this.engine.generate(prompt, {
        maxTokens,
        temperature,
        signal: controller.signal,
      })) {
        tokenBuffer += token;
        tokenCount++;

        if (tokenCount % BATCH_SIZE === 0) {
          await flushTokens();
        }
      }
      // Flush remaining tokens
      await flushTokens();
    } catch {
      // Aborted or error — flush what we have
      await flushTokens();
    }

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
    const tokSec = tokenCount > 0 ? (tokenCount / ((performance.now() - startTime) / 1000)).toFixed(1) : '0';
    this.log('success', `→ SendInferenceResponse Complete: ${tokenCount} tokens in ${elapsed}s (${tokSec} tok/s)`);

    // Send ENDSTREAM to signal completion to ORC
    if (this.sendCommand) {
      await this.sendCommand({
        Name: 'ENDSTREAM',
        SessionId: sessionId,
        RequestId: command.RequestId,
      });
    }

    return null;
  }

  private handleCloseInference(command: Command): Command {
    const request = unpackAny(command.Payload, CloseInferenceRequest);
    const sessionId = request?.SessionId || command.SessionId || '';
    const controller = this.activeSessions.get(sessionId);
    controller?.abort();
    this.activeSessions.delete(sessionId);

    const response: CloseInferenceResponse = {
      SessionId: sessionId,
      InferenceId: request?.InferenceId || '',
      Success: true,
    };

    return {
      Name: 'CloseInferenceResponse',
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny('daisi.protos.v1.CloseInferenceResponse', response, CloseInferenceResponse),
    };
  }

  private handleCancelStream(command: Command): null {
    const sessionId = command.SessionId ?? '';
    const controller = this.activeSessions.get(sessionId);
    controller?.abort();
    return null;
  }
}
