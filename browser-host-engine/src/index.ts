/**
 * Browser Host Engine — glues @daisinet/llogos-webgpu with Blazor UI and ORC connection.
 * Exposes a global `browserHost` object for Blazor JS interop.
 */

import { LlogosEngine } from '@daisinet/llogos-webgpu';
import type { GgufModelInfo, DownloadProgress } from '@daisinet/llogos-webgpu';
import { createChannel, createClientFactory } from 'nice-grpc-web';
import { createAuthMiddleware } from '@daisi/sdk-web';
import { SessionsProtoDefinition } from '@daisi/sdk-generated-sessions';
import { InferencesProtoDefinition } from '@daisi/sdk-generated-inferences';
import { OrcConnection } from './orc-connection.js';
import { CommandHandler } from './command-handler.js';

class BrowserHost {
  private engine = new LlogosEngine();
  private orcConnection = new OrcConnection();
  private commandHandler: CommandHandler | null = null;
  private abortController: AbortController | null = null;
  private dotNetRef: any = null;
  private orcClientKey: string = '';
  private orcAddress: string = '';

  setDotNetRef(ref: any): void { this.dotNetRef = ref; }

  async initGpu(): Promise<any> {
    if (!LlogosEngine.isSupported()) throw new Error('WebGPU not available');
    const caps = await this.engine.initGpu();
    const ai = caps.adapterInfo;
    console.log('[gpu] adapterInfo:', { vendor: ai.vendor, architecture: ai.architecture, device: ai.device, description: ai.description });
    // Flatten adapterInfo since GPUAdapterInfo properties aren't enumerable
    return {
      ...caps,
      adapterInfo: { vendor: ai.vendor, architecture: ai.architecture, device: ai.device, description: ai.description },
    };
  }

  async inspectModel(url: string): Promise<GgufModelInfo> {
    return await this.engine.inspectModel(url);
  }

  async loadModel(url: string): Promise<GgufModelInfo> {
    const info = await this.engine.loadModel(url, {
      onProgress: (p: DownloadProgress & { phase: string }) => {
        this.dotNetRef?.invokeMethodAsync('OnLoadProgress', p.phase, p.bytesDownloaded, p.totalBytes);
      },
    });
    this.commandHandler = new CommandHandler(this.engine);
    return info;
  }

  unloadModel(): void {
    this.engine.unloadModel();
    this.commandHandler = null;
  }

  resetSession(): void { this.engine.resetSession(); }

  async generate(prompt: string, maxTokens: number, temperature: number): Promise<void> {
    this.abortController = new AbortController();
    let count = 0;
    const start = performance.now();
    try {
      for await (const token of this.engine.generate(prompt, {
        maxTokens, temperature, signal: this.abortController.signal,
      })) {
        count++;
        this.dotNetRef?.invokeMethodAsync('OnToken', token);
      }
    } finally {
      const elapsed = (performance.now() - start) / 1000;
      this.dotNetRef?.invokeMethodAsync('OnGenerationComplete', count, elapsed > 0 ? count / elapsed : 0);
      this.abortController = null;
    }
  }

  stopGeneration(): void { this.abortController?.abort(); }

  getState() {
    const info = this.engine.info;
    return {
      status: this.engine.status,
      vramMb: Math.round(this.engine.vramUsage / 1024 / 1024),
      model: info ? {
        name: (info.metadata.get('general.name') as string) || info.architecture || 'Unknown',
        architecture: info.architecture,
        blockCount: info.blockCount,
        embeddingLength: info.embeddingLength,
        headCount: info.headCount,
        headCountKv: info.headCountKv,
        contextLength: info.contextLength,
        vocabSize: info.vocabSize,
        feedForwardLength: info.feedForwardLength,
        tensorCount: info.tensors.length,
        quantization: info.metadata.get('general.file_type') as string || '',
      } : null,
    };
  }

  isSupported(): boolean { return LlogosEngine.isSupported(); }

  async isCached(url: string): Promise<boolean> {
    try {
      const cache = await caches.open('llogos-webgpu-models');
      return !!(await cache.match(url));
    } catch { return false; }
  }

  // ── ORC Connection ──────────────────────────────────────────────────

  async connectToOrc(clientKey: string, orcAddress: string): Promise<void> {
    if (!this.commandHandler) throw new Error('Model not loaded');
    this.orcClientKey = clientKey;
    this.orcAddress = orcAddress;

    // Wire sendCommand so the command handler can stream tokens back
    this.commandHandler.setSendCommand((cmd) => this.orcConnection.sendCommand(cmd));
    this.commandHandler.setLog((level, msg) => this.dotNetRef?.invokeMethodAsync('OnOrcLog', level, msg));

    // Wire claimSession for ConnectRequest handling
    const claimChannel = createChannel(orcAddress);
    const claimAuth = createAuthMiddleware({ getClientKey: () => clientKey });
    const claimClient = createClientFactory().use(claimAuth).create(SessionsProtoDefinition, claimChannel);
    this.commandHandler.setClaimSession(async (sessionId: string) => {
      const resp = await claimClient.claim({ Id: sessionId });
      return resp.Success;
    });

    await this.orcConnection.connect(
      clientKey,
      orcAddress,
      async (command) => this.commandHandler!.handle(command),
      () => this.dotNetRef?.invokeMethodAsync('OnOrcConnectionChanged', false),
      () => this.commandHandler!.buildHeartbeat(),
      (level, message) => this.dotNetRef?.invokeMethodAsync('OnOrcLog', level, message),
    );

    this.dotNetRef?.invokeMethodAsync('OnOrcConnectionChanged', true);
  }

  async disconnectFromOrc(): Promise<void> {
    this.orcConnection.disconnect();
    this.dotNetRef?.invokeMethodAsync('OnOrcConnectionChanged', false);
  }

  // ── ORC Chat (consumer path) ─────────────────────────────────────

  async sendViaOrc(prompt: string): Promise<void> {
    if (!this.orcAddress || !this.orcClientKey) throw new Error('Not connected to ORC');

    // Create a separate consumer client (same ORC, same auth)
    const channel = createChannel(this.orcAddress);
    const authMiddleware = createAuthMiddleware({ getClientKey: () => this.orcClientKey });
    const factory = createClientFactory().use(authMiddleware);

    const sessionClient = factory.create(SessionsProtoDefinition, channel);
    const inferenceClient = factory.create(InferencesProtoDefinition, channel);

    // 1. Create ORC session
    const session = await sessionClient.create({
      ModelName: '',
      DirectConnectRequired: false,
      PreferredHostNames: [],
    });
    const sessionId = session.Id;
    console.log(`[orc-chat] Session created: ${sessionId}`, session);
    this.dotNetRef?.invokeMethodAsync('OnOrcLog', 'info', `ORC Chat: session ${sessionId.substring(0, 12)}...`);

    // 2. Create inference
    const createResp = await inferenceClient.create({
      SessionId: sessionId,
      ThinkLevel: 0,
      ModelName: '',
      InitializationPrompt: '',
      ToolGroups: [],
      SecureTools: [],
    });
    console.log(`[orc-chat] Inference created: ${createResp.InferenceId}`);

    // 3. Send prompt and stream tokens
    const start = performance.now();
    let tokenCount = 0;

    const stream = inferenceClient.send({
      SessionId: sessionId,
      InferenceId: createResp.InferenceId,
      Text: prompt,
      AntiPrompts: [],
    });

    for await (const resp of stream) {
      if (resp.Type === 3) { // Error
        this.dotNetRef?.invokeMethodAsync('OnToken', `[Error: ${resp.Content}]`);
      } else if (resp.Type === 0 || resp.Type === 1) { // Text or Thinking
        tokenCount = resp.MessageTokenCount || tokenCount + 1;
        this.dotNetRef?.invokeMethodAsync('OnToken', resp.Content);
      }
    }

    const elapsed = (performance.now() - start) / 1000;
    this.dotNetRef?.invokeMethodAsync('OnGenerationComplete', tokenCount, elapsed > 0 ? tokenCount / elapsed : 0);
    this.dotNetRef?.invokeMethodAsync('OnOrcLog', 'success', `ORC Chat: ${tokenCount} tokens in ${elapsed.toFixed(1)}s`);
  }
}

(window as any).browserHost = new BrowserHost();
