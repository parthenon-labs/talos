import { toast } from 'react-toastify';
import { errorToastOptions } from '@/utils/constant';
import GameScene from '../GameScene';
import RoleController from './RoleController';
import CommandQueue from './CommandQueue';
import { roleYPosition } from '../constant';
import type {
  RoleRotateType,
  RoleMoveType,
  ControlTask,
  MoveControlTask,
} from './type';
import type { RolePosition } from './Role';

// wasm中透明转换不能使用私有属性，暂时使用private关键字
class CommandComputed {
  private static scene = GameScene.getInstance();

  private static currentPosition = GameScene.getInstance().role?.position; // 当前位置

  private static currentDirction = GameScene.getInstance().role?.dirction; // 当前方向

  private static block = false; // 是否停止执行下一个动作

  private static verifiedPosition([roleX, , roleZ]: RolePosition): boolean {
    const { roadRange } = this.scene;
    return roadRange.some(({ x, z }) => {
      const [startX, endX] = x;
      const [startZ, endZ] = z;

      return roleX > startX && roleX < endX && roleZ > startZ && roleZ < endZ;
    });
  }

  static addCommand(task: ControlTask) {
    const taskMap = {
      moveForward: RoleController.moveForward,
      move: () => RoleController.move((<MoveControlTask>task).args),
      left: RoleController.turnLeft,
      right: RoleController.turnRight,
    };
    if (['left', 'right'].includes(task.type)) {
      this.currentDirction =
        taskMap[<RoleRotateType>task.type].call(RoleController);
    } else if (['moveForward', 'move'].includes(task.type)) {
      const lastPosition =
        taskMap[<RoleMoveType>task.type].call(RoleController);
      this.currentPosition = lastPosition;
      // 验证动作是否可执行
      !this.verifiedPosition(lastPosition) && (this.block = true);
    } else if (task.type === 'collectCoin') {
      this.scene.visibleCoin(this.currentPosition);
    } else if (task.type === 'place') {
      const [x, z] = task.args;
      const currentPosition: RolePosition = [x, roleYPosition, z];
      this.currentPosition = currentPosition;
      if (!this.verifiedPosition(currentPosition)) {
        this.block = true;
        toast.error('Place the character on a walkable tile', errorToastOptions);
      }
    }
    !this.block &&
      CommandQueue.push({
        ...task,
        currentPosition: this.currentPosition,
        currentDirction: this.currentDirction,
      });
  }

  static isCoin(): boolean {
    const coinPos = GameScene.getInstance().coinPositions;

    const [x, , z] = this.currentPosition;
    return coinPos.some(
      ([a, , c, isVisible]) => a === x && c === z && isVisible,
    );
  }

  static isBlocked(): boolean {
    const position = RoleController.getMovePosition();
    return !this.verifiedPosition(position);
  }

  static isRightBlocked(): boolean {
    const position = RoleController.getMovePosition(1, 1);
    return !this.verifiedPosition(position);
  }

  static restore() {
    this.scene = GameScene.getInstance();
    this.currentPosition = this.scene.role?.position;
    this.currentDirction = this.scene.role?.dirction;
    RoleController.restore();
    this.block = false;
  }
}

export default CommandComputed;
