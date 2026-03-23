/**
 * Browser Host Engine — glues @daisinet/llogos-webgpu with Blazor UI.
 * Exposes a global `browserHost` object for JS interop from Blazor.
 */

import { LlogosEngine } from '@daisinet/llogos-webgpu';
import type { GgufModelInfo, DownloadProgress } from '@daisinet/llogos-webgpu';

interface HostState {
  status: 'uninitialized' | 'ready' | 'loading' | 'loaded' | 'generating' | 'error';
  modelInfo: GgufModelInfo | null;
  error: string | null;
  tokensGenerated: number;
  tokPerSec: number;
  vramMb: number;
}

class BrowserHost {
  private engine = new LlogosEngine();
  private abortController: AbortController | null = null;
  private dotNetRef: any = null;

  /** Set the Blazor DotNetObjectReference for callbacks. */
  setDotNetRef(ref: any): void {
    this.dotNetRef = ref;
  }

  /** Initialize WebGPU. Returns GPU capabilities or throws. */
  async initGpu(): Promise<any> {
    if (!LlogosEngine.isSupported()) {
      throw new Error('WebGPU not available');
    }
    return await this.engine.initGpu();
  }

  /** Inspect a model URL without downloading. */
  async inspectModel(url: string): Promise<GgufModelInfo> {
    return await this.engine.inspectModel(url);
  }

  /** Load a model with progress callbacks to Blazor. */
  async loadModel(url: string): Promise<GgufModelInfo> {
    const info = await this.engine.loadModel(url, {
      onProgress: (p: DownloadProgress & { phase: string }) => {
        this.dotNetRef?.invokeMethodAsync('OnLoadProgress', p.phase, p.bytesDownloaded, p.totalBytes);
      },
    });
    return info;
  }

  /** Unload the current model. */
  unloadModel(): void {
    this.engine.unloadModel();
  }

  /** Reset the conversation (clear KV cache). */
  resetSession(): void {
    this.engine.resetSession();
  }

  /** Generate text from a prompt. Streams tokens to Blazor via callback. */
  async generate(prompt: string, maxTokens: number, temperature: number): Promise<void> {
    this.abortController = new AbortController();
    let count = 0;
    const start = performance.now();

    try {
      for await (const token of this.engine.generate(prompt, {
        maxTokens,
        temperature,
        signal: this.abortController.signal,
      })) {
        count++;
        this.dotNetRef?.invokeMethodAsync('OnToken', token);
      }
    } finally {
      const elapsed = (performance.now() - start) / 1000;
      const tokPerSec = elapsed > 0 ? count / elapsed : 0;
      this.dotNetRef?.invokeMethodAsync('OnGenerationComplete', count, tokPerSec);
      this.abortController = null;
    }
  }

  /** Stop the current generation. */
  stopGeneration(): void {
    this.abortController?.abort();
  }

  /** Get current state for UI. */
  getState(): HostState {
    return {
      status: this.engine.status,
      modelInfo: this.engine.info,
      error: null,
      tokensGenerated: 0,
      tokPerSec: 0,
      vramMb: Math.round(this.engine.vramUsage / 1024 / 1024),
    };
  }

  /** Check if WebGPU is supported. */
  isSupported(): boolean {
    return LlogosEngine.isSupported();
  }

  /** Check if a model URL is cached and ready to load. */
  async isCached(url: string): Promise<boolean> {
    try {
      const cache = await caches.open('llogos-webgpu-models');
      const match = await cache.match(url);
      return !!match;
    } catch {
      return false;
    }
  }

  // ── ORC Connection ──────────────────────────────────────────────────

  private clientKey: string | null = null;
  private connected = false;

  /** Connect to ORC with a client key (obtained from Manager server). */
  async connectToOrc(clientKey: string): Promise<void> {
    this.clientKey = clientKey;
    this.connected = true;
    // TODO: Use daisi-sdk-typescript to:
    // 1. Create DaisiClient with clientKey
    // 2. Call ListenForCommands() server-stream
    // 3. Start heartbeat loop via SendCommand()
    // 4. Handle incoming commands (CreateInference, SendInference, etc.)
    console.log('[browser-host] Connected to ORC with clientKey');
    this.dotNetRef?.invokeMethodAsync('OnOrcConnectionChanged', true);
  }

  /** Disconnect from ORC. */
  async disconnectFromOrc(): Promise<void> {
    this.connected = false;
    this.clientKey = null;
    console.log('[browser-host] Disconnected from ORC');
    this.dotNetRef?.invokeMethodAsync('OnOrcConnectionChanged', false);
  }
}

// Expose globally for Blazor JS interop
(window as any).browserHost = new BrowserHost();
