import * as BABYLON from '@babylonjs/core';
import gsap from 'gsap';
import type GameScene from '../GameScene';
import CommandQueue from './CommandQueue';
import { BlockType, blockMap } from './types';
import { localStaticBaseUrl } from '@/utils/constant';
import { ModelKey, BlockDirctionAngle } from '../constant';

class World {
  #scene: GameScene;

  #blockMap: Map<BlockType, BABYLON.TransformNode> = new Map();

  constructor(scene: GameScene) {
    this.#scene = scene;
  }

  async #loadBlock(blockList: BlockType[]) {
    Object.values(blockMap).forEach(({ name }) =>
      this.#scene.getTransformNodeById(name)?.parent?.parent?.dispose(),
    );

    await Promise.all(
      Object.entries(blockMap)
        .filter(([key]) => blockList.includes(<BlockType>key))
        .map(([key, { name }]) =>
          BABYLON.SceneLoader.AppendAsync(
            `${localStaticBaseUrl}static/model/`,
            `${name}.glb`,
            this.#scene,
          ).then(() => {
            const floorBlock = this.#scene
              .getTransformNodeById(name)!
              .setAbsolutePosition(new BABYLON.Vector3(0.5, 50, 0.5));

            this.#blockMap.set(<BlockType>key, floorBlock);
          }),
        ),
    );
  }

  #createNodeOfBlock(
    type: ModelKey,
    root: BABYLON.TransformNode,
  ): BABYLON.TransformNode {
    return new BABYLON.TransformNode(type, this.#scene).setParent(root);
  }

  #createRootNode() {
    const rootNode = new BABYLON.TransformNode(ModelKey.scene, this.#scene);
    const coinNode = this.#createNodeOfBlock(ModelKey.coin, rootNode);
    const roadNode = this.#createNodeOfBlock(ModelKey.road, rootNode);
    const floorNode = this.#createNodeOfBlock(ModelKey.floor, rootNode);

    return <Record<BlockType, BABYLON.TransformNode>>{
      coin: coinNode,
      floor: floorNode,
      woodenBridge: roadNode,
      stoneBridge: roadNode,
      road: roadNode,
      rotateRoad: roadNode,
    };
  }

  async run() {
    const queue = CommandQueue.getQueue();
    // 获取到需要加载的🧱类型列表，并去重
    const loadBlockList = [...new Set<BlockType>(queue.map(i => i.type))];
    // 加载🧱
    await this.#loadBlock(loadBlockList);
    // 创建🧱根节点
    const parentNodeMap = this.#createRootNode();

    return Promise.all(
      queue.map(({ type, position: [x, y, z], direction }, index) => {
        const block = this.#blockMap.get(type)!;
        const clonedBlock = block.clone(
          `${type}${index}`,
          parentNodeMap[type],
        )!;

        clonedBlock.rotation = new BABYLON.Vector3( // 控制🧱旋转角度
          0,
          BlockDirctionAngle[direction],
          0,
        );

        return gsap.fromTo(
          clonedBlock.position,
          { x, y: 30, z },
          { duration: 0.8, delay: 0.2 * index, x, y, z },
        );
      }),
    );
  }
}

export default World;
