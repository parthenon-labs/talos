import type {
  DefaultControlTask,
  MoveControlTask,
  PlaceControlTask,
  ControlTask,
} from './type';
import type { RolePosition } from './Role';
import { DirctionKey } from '../constant';

interface RoleDetail {
  currentPosition: RolePosition;
  currentDirction: DirctionKey;
}

export type MergedRoleDetail<T extends ControlTask> = T & RoleDetail;

export type ControlDetialTask =
  | MergedRoleDetail<DefaultControlTask>
  | MergedRoleDetail<MoveControlTask>
  | MergedRoleDetail<PlaceControlTask>;

export default class CommandQueue {
  private static queue: ControlDetialTask[] = [];

  static push(cmd: ControlDetialTask) {
    this.queue.push(cmd);
  }

  static getQueue(): ControlDetialTask[] {
    return this.queue;
  }

  static clear() {
    this.queue.length = 0;
  }
}
