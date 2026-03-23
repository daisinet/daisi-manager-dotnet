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
import { packAny, unpackAny } from './proto-helpers.js';

export type SendCommandFn = (command: Partial<Command>) => Promise<void>;

export class CommandHandler {
  private engine: LlogosEngine;
  private activeSessions = new Map<string, AbortController>();
  private sendCommand: SendCommandFn | null = null;

  constructor(engine: LlogosEngine) {
    this.engine = engine;
  }

  setSendCommand(fn: SendCommandFn): void {
    this.sendCommand = fn;
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

    let fullResponse = '';
    let tokenCount = 0;
    try {
      for await (const token of this.engine.generate(prompt, {
        maxTokens,
        temperature,
        signal: controller.signal,
      })) {
        fullResponse += token;
        tokenCount++;

        // Stream individual tokens back to ORC
        if (this.sendCommand) {
          const streamResponse: SendInferenceResponse = {
            SessionId: sessionId,
            InferenceId: request?.InferenceId || '',
            Id: '',
            Type: 0, // Token
            Content: token,
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
        }
      }
    } catch {
      // Aborted or error
    }

    // Send final "done" response
    const finalResponse: SendInferenceResponse = {
      SessionId: sessionId,
      InferenceId: request?.InferenceId || '',
      Id: '',
      Type: 2, // Done
      Content: '',
      AuthorRole: 'assistant',
      Format: 0,
      MessageTokenCount: tokenCount,
      SessionTokenCount: tokenCount,
      ComputeTimeMs: Math.round(performance.now() - startTime),
    };

    return {
      Name: 'SendInferenceResponse',
      SessionId: sessionId,
      RequestId: command.RequestId,
      Payload: packAny('daisi.protos.v1.SendInferenceResponse', finalResponse, SendInferenceResponse),
    };
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
