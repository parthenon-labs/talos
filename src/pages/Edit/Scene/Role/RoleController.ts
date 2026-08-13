import GameScene from '../GameScene';
import { DirctionKey } from '../constant';
import type { RolePosition } from './Role';

/**
 * 返回动作执行后的位置
 */
export default class RoleController {
  private static position = GameScene.getInstance().role?.position; // 当前位置;

  private static dirction = GameScene.getInstance().role?.dirction; // 当前方向;

  static getMovePosition(
    step: number = 1, // 步数
    direction: number = 0, // 方向: `0`为前方 `-1`为左方 `+1`为右方
  ): RolePosition {
    const [x, y, z] = this.position;
    const currentPosition =
      (<RolePosition[]>[
        [x + step, y, z],
        [x, y, z - step],
        [x - step, y, z],
        [x, y, z + step],
      ]).at(this.dirction + direction) ?? this.position;
    return currentPosition;
  }

  static moveForward(step: number = 1): RolePosition {
    const currentPosition = this.getMovePosition(step);
    this.position = currentPosition;
    return currentPosition;
  }

  static turnLeft(): DirctionKey {
    if (this.dirction === 0) {
      this.dirction = 3;
    } else {
      this.dirction--;
    }
    return this.dirction;
  }

  static turnRight(): DirctionKey {
    if (this.dirction === 3) {
      this.dirction = 0;
    } else {
      this.dirction++;
    }
    return this.dirction;
  }

  static move(step: number): RolePosition {
    return this.moveForward(step);
  }

  static restore() {
    const scene = GameScene.getInstance();
    this.position = scene.role?.position; // 当前位置;
    this.dirction = scene.role?.dirction; // 当前方向;
  }
}
