import type { CommandType } from './types';

export default class CommandQueue {
  static queue: CommandType[] = [];

  static push(cmd: CommandType) {
    this.queue.push(cmd);
  }

  static getQueue(): CommandType[] {
    return this.queue;
  }

  static clear() {
    this.queue.length = 0;
  }
}
