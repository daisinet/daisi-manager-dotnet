/**
 * ORC connection — connects directly from browser via grpc-web.
 * Includes automatic reconnection with exponential backoff.
 */

import { createChannel, createClientFactory } from 'nice-grpc-web';
import { createAuthMiddleware } from '@daisi/sdk-web';
import { HostCommandsProtoDefinition } from '@daisi/sdk-generated-commands';
import type { Command } from '@daisi/sdk-generated-commands';
import { getTypeName } from './proto-helpers.js';

export type CommandHandler = (command: Command) => Promise<Command | null>;
export type HeartbeatBuilder = () => Partial<Command>;
export type LogHandler = (level: string, message: string) => void;

const MAX_RETRIES = 10;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30000;

/** Describe a command in human-readable form for logging. */
function describeCommand(command: Partial<Command>): string {
  const parts = [command.Name || '?'];
  if (command.SessionId) parts.push(`session=${command.SessionId.substring(0, 16)}`);
  if (command.RequestId) parts.push(`req=${command.RequestId.substring(0, 12)}`);
  if (command.Message) parts.push(`msg="${command.Message.substring(0, 50)}"`);
  if (command.Payload) {
    const typeName = getTypeName(command.Payload);
    if (typeName) parts.push(`payload=${typeName}`);
  }
  return parts.join(' | ');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class OrcConnection {
  private abortController: AbortController | null = null;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private client: any = null;
  private onCommand: CommandHandler | null = null;
  private onDisconnect: (() => void) | null = null;
  private buildHeartbeat: HeartbeatBuilder = () => ({ Name: 'HeartbeatRequest' });
  private onLog: LogHandler = () => {};
  private consecutiveHeartbeatFailures = 0;
  private shouldReconnect = false;

  async connect(
    clientKey: string,
    orcAddress: string,
    onCommand: CommandHandler,
    onDisconnect: () => void,
    buildHeartbeat: HeartbeatBuilder,
    onLog: LogHandler,
  ): Promise<void> {
    this.onCommand = onCommand;
    this.onDisconnect = onDisconnect;
    this.buildHeartbeat = buildHeartbeat;
    this.onLog = onLog;
    this.shouldReconnect = true;
    this.abortController = new AbortController();

    this.log('info', `Connecting to ${orcAddress}...`);

    // Create grpc-web channel directly
    const channel = createChannel(orcAddress);
    const authMiddleware = createAuthMiddleware({ getClientKey: () => clientKey });
    this.client = createClientFactory()
      .use(authMiddleware)
      .create(HostCommandsProtoDefinition, channel);

    this.log('info', 'Client created, starting listener and heartbeat...');
    this.startListeningWithReconnect();
    this.startHeartbeat();
  }

  disconnect(): void {
    this.shouldReconnect = false;
    this.abortController?.abort();
    this.abortController = null;
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    this.client = null;
    this.log('warn', 'Disconnected');
  }

  async sendCommand(command: Partial<Command>): Promise<void> {
    if (!this.client) return;
    await this.client.sendCommand({ Command: command });
  }

  private async startListeningWithReconnect(): Promise<void> {
    let retryCount = 0;

    while (this.shouldReconnect && this.client) {
      try {
        await this.listenToStream();
        // Stream ended normally — if we should reconnect, treat as a retry
        if (!this.shouldReconnect) break;
        retryCount++;
      } catch (e: any) {
        if (e.name === 'AbortError' || !this.shouldReconnect) break;
        retryCount++;
      }

      if (retryCount > MAX_RETRIES) {
        this.log('error', `Connection lost after ${MAX_RETRIES} retries`);
        break;
      }

      // Exponential backoff with jitter
      const delay = Math.min(BASE_DELAY_MS * Math.pow(2, retryCount - 1), MAX_DELAY_MS);
      const jitter = Math.round(delay * 0.2 * Math.random());
      const totalDelay = delay + jitter;
      this.log('warn', `Reconnecting in ${(totalDelay / 1000).toFixed(1)}s (attempt ${retryCount}/${MAX_RETRIES})...`);
      await sleep(totalDelay);

      if (!this.shouldReconnect) break;
      this.log('info', 'Reconnecting...');
    }

    this.onDisconnect?.();
  }

  private async listenToStream(): Promise<void> {
    if (!this.client || !this.abortController) return;

    this.log('info', 'Opening ListenForCommands stream...');
    const stream = this.client.listenForCommands({}, {
      signal: this.abortController.signal,
    });

    for await (const command of stream) {
      this.consecutiveHeartbeatFailures = 0; // Stream is alive
      this.log('info', `← ${describeCommand(command)}`);
      if (this.onCommand) {
        const response = await this.onCommand(command);
        if (response) {
          this.log('success', `→ ${describeCommand(response)}`);
          await this.sendCommand(response);
        }
      }
    }
    this.log('warn', 'Stream ended');
  }

  private startHeartbeat(): void {
    this.sendHeartbeat();
    this.heartbeatInterval = setInterval(() => this.sendHeartbeat(), 60000);
  }

  private async sendHeartbeat(): Promise<void> {
    if (!this.client) return;
    try {
      const hb = this.buildHeartbeat();
      await this.sendCommand(hb);
      this.consecutiveHeartbeatFailures = 0;
      this.log('success', `→ ${describeCommand(hb)}`);
    } catch (e: any) {
      this.consecutiveHeartbeatFailures++;
      this.log('error', `Heartbeat failed (${this.consecutiveHeartbeatFailures}/3): ${e.message}`);
      // 3 consecutive failures → force reconnect
      if (this.consecutiveHeartbeatFailures >= 3) {
        this.log('warn', 'Connection appears dead, forcing reconnect...');
        this.abortController?.abort();
        this.abortController = new AbortController();
      }
    }
  }

  private log(level: string, message: string): void {
    console.log(`[orc] ${message}`);
    this.onLog(level, message);
  }
}
