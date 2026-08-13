import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import gsap from 'gsap';
import Role, { RolePosition } from './Role/Role';
import RoleCommandQueue from './Role/CommandQueue';
import WorldCommandQueue from './World/CommandQueue';
import { rgba, createGrid } from './utils';
import { RoleAnimationKey, ModelKey, roleYPosition } from './constant';
import { store } from '@/store';
import { localStaticBaseUrl } from '@/utils/constant';
import {
  setRunning,
  clearWallet,
  setTotalWallet,
  incrementWallet,
} from '../store';
import Music from './Music';
import World from './World';

type RoadRangeItem = [start: number, end: number];
interface RoadRange {
  x: RoadRangeItem;
  y: number;
  z: RoadRangeItem;
}

type CoinPosType = [x: number, y: number, z: number, isVisible: boolean];

class GameScene extends BABYLON.Scene {
  static #instance: BABYLON.Nullable<GameScene>;

  #camera!: BABYLON.ArcRotateCamera;

  #shadowGenerator!: BABYLON.ShadowGenerator;

  #role!: Role;

  #coinList: BABYLON.Mesh[] = [];

  roadRange: RoadRange[] = [];

  coinPositions: Array<CoinPosType> = [];

  gameSound!: Music;

  #grid!: ReturnType<typeof createGrid>;

  #world!: World;

  #customWorldFlag = false;

  constructor(engine: BABYLON.Engine) {
    super(engine);
    this.clearColor = rgba(142, 182, 249, 1);
    this.#createCamera();
    this.#createLight();
    this.#createBackground();
  }

  get role() {
    return this.#role;
  }

  static destroy() {
    this.#instance = null;
  }

  static getInstance(engine?: BABYLON.Engine) {
    if (!this.#instance && engine instanceof BABYLON.Engine) {
      this.#instance = new GameScene(engine);
    }
    return this.#instance!;
  }

  #createLight() {
    const hemispheric = new BABYLON.HemisphericLight(
      'SceneHemisphericLight',
      new BABYLON.Vector3(0, 1, 0),
      this,
    );
    hemispheric.intensity = 0.5;

    const directionalLight = new BABYLON.DirectionalLight(
      'SceneDirectionalLight',
      new BABYLON.Vector3(-4, -4, 4 * Math.PI),
      this,
    );
    directionalLight.intensity = 3.5;

    this.#shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight);
  }

  #createCamera() {
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      (Math.PI / 2) * 0.5,
      Math.PI / 4,
      16,
      new BABYLON.Vector3(0, 0, 0),
      this,
    );
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2.5;
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 30;
    camera.wheelPrecision = 100;
    camera.pinchPrecision = 100;
    camera.panningDistanceLimit = 10;
    camera.attachControl();
    this.#camera = camera;
  }

  #createBackground() {
    const skybox = BABYLON.MeshBuilder.CreateBox(
      'BackgroundSkybox',
      {
        size: 50,
        sideOrientation: BABYLON.Mesh.BACKSIDE,
      },
      this,
    );
    const backgroundMaterial = new BABYLON.BackgroundMaterial(
      'backgroundMaterial',
      this,
    );

    backgroundMaterial.reflectionTexture = new BABYLON.CubeTexture(
      `${localStaticBaseUrl}static/textures/background/bg`,
      this,
      ['px', 'py', 'pz', 'nx', 'ny', 'nz'].map(i => `_${i}.webp`),
    );
    backgroundMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skybox.material = backgroundMaterial;
  }

  createGrid(enabled: boolean) {
    const grid = createGrid(this);
    grid.setEnabled(enabled);
    this.#grid = grid;
  }

  setGridEnabled(enabled: boolean) {
    this.#grid.setEnabled(enabled);
    return enabled;
  }

  initMusic(bgMusicPlaying: boolean, effectPlaying: boolean): Music {
    this.gameSound = new Music(this, bgMusicPlaying, effectPlaying);
    return this.gameSound;
  }

  #getMeshChildrenListById(id: string): BABYLON.Mesh[] {
    return <BABYLON.Mesh[]>(this.getTransformNodeById(id)?.getChildren() ?? []);
  }

  async #makeScene(url: string) {
    const filepathArr = url.split('/');
    const filename = filepathArr.at(-1);
    const filepath = filepathArr.slice(0, filepathArr.length - 1).join('/');

    await BABYLON.SceneLoader.AppendAsync(`${filepath}/`, filename, this);
    this.#entryAnimation();

    // const scene = this.getTransformNodeById(ModelKey.scene)!;
    // scene

    const position = this.#getRoleStartPosition();
    if (this.#role) {
      position && this.#role.setPosition(position);
      this.#role.restoreRole();
    } else {
      this.#role = new Role(this, position ?? [0, 40, 0]);
    }
    this.#initSceneContent();
  }

  #initSceneContent() {
    const glow = new BABYLON.GlowLayer('glow', this);
    glow.intensity = 2;
    this.#playSceneAnimation();
    this.#getRoadRange();
    this.#makeCoin();
    this.#getCoinPositions();
  }

  #entryAnimation() {
    return gsap.fromTo(
      this.getTransformNodeById(ModelKey.scene)!.position,
      { y: 15 },
      { y: 0, duration: 0.8 },
    );
  }

  #getRoadRange() {
    const road = this.#getMeshChildrenListById(ModelKey.road);
    const roadRange: RoadRange[] = road.map(node => {
      const { x, y, z } = node.getAbsolutePosition();
      return {
        x: [x - 0.5, x + 0.5],
        y,
        z: [z - 0.5, z + 0.5],
      };
    });
    this.roadRange = roadRange;
  }

  #getRoleStartPosition(): RolePosition | undefined {
    const position =
      this.getMeshById(ModelKey.roleBegin)?.getAbsolutePosition() ||
      this.getTransformNodeById(ModelKey.roleBegin)?.getAbsolutePosition();

    if (position)
      return [
        position?.x,
        roleYPosition + (position?.y ? position?.y - 15 : 0),
        position?.z,
      ];
  }

  #makeCoin() {
    const coinList = this.#getMeshChildrenListById(ModelKey.coin);
    this.#coinList = coinList;
    store.dispatch(setTotalWallet(coinList.length));
    coinList?.forEach(node => {
      node.rotation = new BABYLON.Vector3(0, 0, 0);
      gsap.to(node.rotation, {
        duration: 2,
        repeat: -1,
        y: Math.PI * 2,
        ease: 'linear',
      });
    });
  }

  #getCoinPositions() {
    const coinPositions: CoinPosType[] = this.#coinList?.map(coin => {
      const { x, y, z } = coin.getAbsolutePosition();
      return [x, y, z, true];
    });
    this.coinPositions = coinPositions;
  }

  #playSceneAnimation() {
    const roleAnimation = Object.values(RoleAnimationKey);
    this.animationGroups
      .filter(
        animate => !roleAnimation.includes(<RoleAnimationKey>animate.name),
      )
      .forEach(i => i.play(true));
  }

  #win() {
    this.#role?.roleAction(RoleAnimationKey.Success);
    this.gameSound.victoryEffect();
    // 发送网络请求 通关
  }

  async #preRun() {
    if (!this.#customWorldFlag) return;
    const oldScene = this.getTransformNodeById(ModelKey.scene);
    if (!oldScene) return;
    await gsap.to(oldScene.position, {
      duration: 0.8,
      y: -25,
    });
    oldScene.dispose();
  }

  async run() {
    await this.#preRun();
    if (this.#customWorldFlag) {
      await this.#world.run();
      this.#initSceneContent();
    }
    await this.#role?.playRoleAnimation();
    this.#postRun();
  }

  #postRun() {
    store.dispatch(setRunning(false));
    RoleCommandQueue.clear();
    WorldCommandQueue.clear();
    // 判断是否胜利
    const {
      edit: { wallet, totalWallet },
    } = store.getState();
    if (wallet === totalWallet) return this.#win();
    this.#role?.roleAction(RoleAnimationKey.Idle);
  }

  visibleCoin(position: RolePosition) {
    const [x, , z] = position;
    this.coinPositions.forEach(([a, , c], idx) => {
      if (a === x && c === z) {
        this.coinPositions[idx][3] = false;
      }
    });
  }

  collectCoin(position: RolePosition) {
    const [x, , z] = position;
    this.coinPositions.forEach(([a, , c], idx) => {
      if (a === x && c === z) {
        const coin = this.#getMeshChildrenListById(ModelKey.coin)[idx];
        this.coinPositions[idx][3] = false;
        this.gameSound.collectCoinEffect();
        store.dispatch(incrementWallet(1));
        gsap.to(coin.position, {
          duration: 1.4,
          y: 10,
        });
        gsap.to(coin.scaling, {
          duration: 1,
          x: 0.001,
          y: 0.001,
          z: 0.001,
        });
      }
    });
  }

  async #destroySceneModel() {
    const destroySceneModel = <BABYLON.TransformNode>(
      this.getTransformNodeById(ModelKey.scene)?.parent?.parent
    );
    if (!destroySceneModel) return;
    await Promise.all([
      gsap.to(destroySceneModel?.position, {
        duration: 0.8,
        y: -25,
      }),
      this.#role.outAnimation(),
    ]);
    store.dispatch(clearWallet());
    destroySceneModel?.dispose();
  }

  async loadSceneModel(sceneUrl?: string) {
    await this.#destroySceneModel();
    // 如果有场景模型路径，则加载场景模型，初始化角色位置，金币状态等。
    // 否则场景为空,不初始化角色位置，金币状态。用户可能通过我们提供的tile-Map自己构建场景
    if (sceneUrl) {
      await this.#makeScene(`${localStaticBaseUrl}${sceneUrl}`);
      return;
    }
    const world = new World(this);
    this.#world = world;
    this.#customWorldFlag = true;
  }

  restoreScene() {
    store.dispatch(clearWallet());

    this.coinPositions = this.coinPositions.map(([x, y, z]) => [x, y, z, true]);

    this.#getMeshChildrenListById(ModelKey.coin).forEach(coin => {
      gsap.to(coin.position, {
        y: 1.5,
        duration: 0.5,
      });
      gsap.to(coin.scaling, {
        duration: 0.5,
        x: 0.5,
        y: 0.5,
        z: 0.5,
      });
    });
    this.#role?.restoreRole();
    this.#role?.roleAction(RoleAnimationKey.Idle2);
  }
}

export default GameScene;
