import { WebGPUEngine } from '@babylonjs/core';
import GameScene from '../GameScene';
import { isDev } from '@/utils/constant';

export class GPUEngine extends WebGPUEngine {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas, {
      adaptToDeviceRatio: true,
      antialiasing: true,
      powerPreference: 'high-performance',
    });
  }

  gameScene!: GameScene;

  async initEngine(): Promise<GPUEngine> {
    await this.initAsync();

    const scene = GameScene.getInstance(this);

    window.addEventListener('resize', () => this.resize());
    if (isDev) {
      await import('@babylonjs/inspector');
      scene.debugLayer.show({
        embedMode: true,
        globalRoot: document.querySelector<HTMLDivElement>('#devtool')!,
      });
    }

    this.runRenderLoop(() => {
      scene.render();
    });
    this.gameScene = scene;
    return this;
  }

  destroy() {
    this.stopRenderLoop();
    GameScene.destroy();
  }
}
