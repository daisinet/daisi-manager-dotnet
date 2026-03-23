/**
 * ORC connection — connects directly from browser via grpc-web.
 */

import { createChannel, createClientFactory } from 'nice-grpc-web';
import { createAuthMiddleware } from '@daisi/sdk-web';
import { HostCommandsProtoDefinition } from '@daisi/sdk-generated-commands';
import type { Command } from '@daisi/sdk-generated-commands';
import { getTypeName } from './proto-helpers.js';

export type CommandHandler = (command: Command) => Promise<Command | null>;
export type HeartbeatBuilder = () => Partial<Command>;
export type LogHandler = (level: string, message: string) => void;

/** Describe a command in human-readable form for logging. */
function describeCommand(command: Partial<Command>): string {
  const parts = [command.Name || '?'];
  if (command.SessionId) parts.push(`session=${command.SessionId.substring(0, 8)}`);
  if (command.RequestId) parts.push(`req=${command.RequestId.substring(0, 8)}`);
  if (command.Message) parts.push(`msg="${command.Message.substring(0, 50)}"`);
  if (command.Payload) {
    const typeName = getTypeName(command.Payload);
    if (typeName) parts.push(`payload=${typeName}`);
  }
  return parts.join(' | ');
}

export class OrcConnection {
  private abortController: AbortController | null = null;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;
  private client: any = null;
  private onCommand: CommandHandler | null = null;
  private onDisconnect: (() => void) | null = null;
  private buildHeartbeat: HeartbeatBuilder = () => ({ Name: 'HeartbeatRequest' });
  private onLog: LogHandler = () => {};

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
    this.abortController = new AbortController();

    this.log('info', `Connecting to ${orcAddress}...`);

    // Create grpc-web channel directly
    const channel = createChannel(orcAddress);
    const authMiddleware = createAuthMiddleware({ getClientKey: () => clientKey });
    this.client = createClientFactory()
      .use(authMiddleware)
      .create(HostCommandsProtoDefinition, channel);

    this.log('info', 'Client created, starting listener and heartbeat...');
    this.startListening();
    this.startHeartbeat();
  }

  disconnect(): void {
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

  private async startListening(): Promise<void> {
    if (!this.client || !this.abortController) return;
    try {
      this.log('info', 'Opening ListenForCommands stream...');
      const stream = this.client.listenForCommands({}, {
        signal: this.abortController.signal,
      });
      for await (const command of stream) {
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
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        this.log('error', `Stream error: ${e.message}`);
      }
    } finally {
      this.onDisconnect?.();
    }
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
      this.log('success', `→ ${describeCommand(hb)}`);
    } catch (e: any) {
      this.log('error', `Heartbeat failed: ${e.message}`);
    }
  }

  private log(level: string, message: string): void {
    console.log(`[orc] ${message}`);
    this.onLog(level, message);
  }
}
