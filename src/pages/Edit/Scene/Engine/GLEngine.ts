import { Engine } from '@babylonjs/core';
import { isDev } from '@/utils/constant';
import GameScene from '../GameScene';
import { showAxis } from '../utils';
import '../config';

export class GLEngine extends Engine {
  gameScene!: GameScene;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas, true, {}, true);
    this.#addScene();
  }

  async #addScene() {
    const scene = GameScene.getInstance(this);

    this.runRenderLoop(() => {
      scene.render();
    });
    this.gameScene = scene;
    window.addEventListener('resize', () => this.resize());
    if (isDev) {
      await import('@babylonjs/inspector');
      scene.debugLayer.show({
        embedMode: true,
        globalRoot: document.querySelector<HTMLElement>('#devtool')!,
      });
      showAxis(scene, 6);
    }
  }

  destroy() {
    this.stopRenderLoop();
    GameScene.destroy();
  }
}
