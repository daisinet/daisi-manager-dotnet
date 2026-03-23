/**
 * Browser Host Engine — glues @daisinet/llogos-webgpu with Blazor UI and ORC connection.
 * Exposes a global `browserHost` object for Blazor JS interop.
 */

import { LlogosEngine } from '@daisinet/llogos-webgpu';
import type { GgufModelInfo, DownloadProgress } from '@daisinet/llogos-webgpu';
import { OrcConnection } from './orc-connection.js';
import { CommandHandler } from './command-handler.js';

class BrowserHost {
  private engine = new LlogosEngine();
  private orcConnection = new OrcConnection();
  private commandHandler: CommandHandler | null = null;
  private abortController: AbortController | null = null;
  private dotNetRef: any = null;

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

    // Wire sendCommand so the command handler can stream tokens back
    this.commandHandler.setSendCommand((cmd) => this.orcConnection.sendCommand(cmd));

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
}

(window as any).browserHost = new BrowserHost();
