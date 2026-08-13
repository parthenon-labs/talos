import * as BABYLON from '@babylonjs/core';
import type GameScene from './GameScene';
import { localStaticBaseUrl } from '@/utils/constant';

class Music {
  #bgMusic!: BABYLON.Sound;

  #coinEffect!: BABYLON.Sound;

  #victoryMusic!: BABYLON.Sound;

  #errorMusic!: BABYLON.Sound;

  #bgMusicPlaying: boolean;

  #effectPlaying: boolean;

  constructor(
    scene: GameScene,
    bgMusicPlaying: boolean,
    effectPlaying: boolean,
  ) {
    this.#bgMusicPlaying = bgMusicPlaying;
    this.#effectPlaying = effectPlaying;
    this.#createMusic(scene);
  }

  static makeSound(scene: GameScene, key: string): BABYLON.Sound {
    return new BABYLON.Sound(
      `coin-${key}`,
      `${localStaticBaseUrl}static/sound/${key}.mp3`,
      scene,
      () => {},
      { loop: false, volume: 1 },
    );
  }

  #createMusic(scene: GameScene) {
    this.#bgMusic = new BABYLON.Sound(
      'bg-music',
      `${localStaticBaseUrl}static/sound/background-music.mp3`,
      scene,
      () => {},
      { loop: true, autoplay: this.#bgMusicPlaying, volume: 0.05 },
    );
    this.#coinEffect = Music.makeSound(scene, 'coin');
    this.#victoryMusic = Music.makeSound(scene, 'victory');
    this.#errorMusic = Music.makeSound(scene, 'error');
  }

  toggleBGMusic(state: boolean) {
    this.#bgMusicPlaying = state;
    if (state) return this.#bgMusic.play();
    this.#bgMusic.stop();
  }

  toggleEffectMusic(state: boolean) {
    this.#effectPlaying = state;
  }

  collectCoinEffect() {
    if (!this.#effectPlaying) return;
    this.#coinEffect.play();
  }

  victoryEffect() {
    if (!this.#effectPlaying) return;
    this.#victoryMusic.play();
  }

  errorEffect() {
    if (!this.#effectPlaying) return;
    this.#errorMusic.play();
  }
}

export default Music;
