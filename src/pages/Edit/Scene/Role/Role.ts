import { TransformNode, SceneLoader, Vector3 } from '@babylonjs/core';
import gsap from 'gsap';
import {
  ModelKey,
  RoleAnimationKey,
  DirctionKey,
  RoleDirctionAngle,
} from '../constant';
import type { MoveControlTask, RoleRotateType } from './type';
import CommandQueue, {
  ControlDetialTask,
  MergedRoleDetail,
} from './CommandQueue';
import type GameScene from '../GameScene';
import { localStaticBaseUrl } from '@/utils/constant';

export type RolePosition = [x: number, y: number, z: number];
class Role {
  #scene: GameScene;

  #role!: TransformNode;

  #cacheKey!: RoleAnimationKey;

  #position!: RolePosition;

  #dirction: DirctionKey = DirctionKey['-x'];

  get position() {
    return this.#position;
  }

  get dirction() {
    return this.#dirction;
  }

  constructor(scene: GameScene, position: RolePosition) {
    this.#scene = scene;
    this.#init(position);
  }

  async #init(position: RolePosition) {
    await SceneLoader.AppendAsync(
      `${localStaticBaseUrl}static/model/`,
      'role.glb',
      this.#scene,
    );
    const role = <TransformNode>(
      this.#scene.getTransformNodeById(ModelKey.role)?.parent
    );
    this.#role = role;
    this.#position = position;
    this.#roleRotate('right');
    role.scaling = new Vector3(0.008, 0.008, 0.008);
    this.#entryAnimation(position);
  }

  setPosition(position: RolePosition, idle = true) {
    this.#position = position;
    return this.#entryAnimation(position, idle);
  }

  // Level switching waits on this walk-off before the next level may
  // appear, and the chapter list stays disabled for its whole duration, so
  // its length is the switch latency almost by itself — the actual work
  // (GLB parse, scene setup) is well under 200ms. Keep it long enough to
  // read as a walk, short enough not to feel like a stall.
  outAnimation() {
    this.roleAction(RoleAnimationKey.WalkInPlace);
    return gsap.to(this.#role.position, {
      ease: 'none',
      duration: 0.7,
      x: -10,
      y: 5,
    });
  }

  async #entryAnimation(position: RolePosition, idle: boolean = true) {
    const [x, y, z] = position;
    this.roleAction(RoleAnimationKey.WalkInPlace);
    await gsap.fromTo(
      this.#role.position,
      { x: 10, y: 5, z: 0 },
      { duration: 0.7, x, y, z },
    );
    idle && this.roleAction(RoleAnimationKey.Idle2);
  }

  async playRoleAnimation() {
    const commandQueue = CommandQueue.getQueue();
    this.roleAction(RoleAnimationKey.WalkInPlace);
    const firstControl: ControlDetialTask = {
      currentPosition: this.#position,
      currentDirction: this.#dirction,
      type: 'move',
      args: 1,
    };

    await commandQueue.reduce<Promise<ControlDetialTask>>(async (pre, curr) => {
      if (['move', 'moveForward', 'collectCoin'].includes(curr.type)) {
        await this.#moveAnimation(await pre, curr);
        if (curr.type === 'collectCoin') {
          await this.#collectCoin(curr.currentPosition);
        }
      } else if (['left', 'right'].includes(curr.type)) {
        await this.#rotationAnimation(await pre, curr);
      } else if (curr.type === 'place') {
        await this.setPosition(curr.currentPosition, false);
      }
      return curr;
    }, Promise.resolve(firstControl));
  }

  #moveAnimation(pre: ControlDetialTask, curr: ControlDetialTask) {
    const [px, py, pz] = pre.currentPosition;
    const [cx, cy, cz] = curr.currentPosition;

    return gsap.fromTo(
      this.#role.position,
      { x: px, y: py, z: pz },
      {
        duration: 0.6 * ((<MergedRoleDetail<MoveControlTask>>curr).args ?? 1),
        ease: 'none',
        x: cx,
        y: cy,
        z: cz,
      },
    );
  }

  #rotationAnimation(pre: ControlDetialTask, curr: ControlDetialTask) {
    const preAngle = RoleDirctionAngle[pre.currentDirction];
    const angle = Math.PI / 2;
    const rotateAngle = curr.type === 'left' ? -angle : angle;

    return gsap.fromTo(
      this.#role.rotation,
      {
        y: preAngle,
      },
      {
        duration: 1,
        ease: 'none',
        y: preAngle + rotateAngle,
      },
    );
  }

  async #collectCoin(position: RolePosition) {
    this.#scene.collectCoin(position);
    await this.roleAction(RoleAnimationKey.JumpUp, false);
  }

  #roleRotate(direction: RoleRotateType) {
    const angle = Math.PI / 2;
    this.#role.rotation = new Vector3(
      0,
      direction === 'left' ? angle : -angle,
      0,
    );
  }

  roleAction(key: RoleAnimationKey, loop = true): Promise<void> | void {
    this.#cacheKey = key;
    this.#scene.getAnimationGroupByName(this.#cacheKey)?.stop();
    this.#scene.getAnimationGroupByName(key)?.play(loop);
    if (!loop) {
      return new Promise(res => {
        this.#scene
          .getAnimationGroupByName(key)
          ?.onAnimationGroupEndObservable.addOnce(() => res());
      });
    }
  }

  restoreRole() {
    this.#role.rotation = new Vector3(0, 0, 0);
    this.#roleRotate('right');
  }
}

export default Role;
