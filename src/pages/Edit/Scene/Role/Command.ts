import CommandComputed from './CommandComputed';

class Command {
  static moveForward() {
    CommandComputed.addCommand({
      type: 'moveForward',
    });
  }

  static turnLeft() {
    CommandComputed.addCommand({
      type: 'left',
    });
  }

  static turnRight() {
    CommandComputed.addCommand({
      type: 'right',
    });
  }

  static collectCoin() {
    CommandComputed.addCommand({
      type: 'collectCoin',
    });
  }

  static move(step: number = 1) {
    CommandComputed.addCommand({
      type: 'move',
      args: step,
    });
  }

  static place(x: number, z: number) {
    CommandComputed.addCommand({
      type: 'place',
      args: [x, z],
    });
  }

  // python中通过`isCoin`调用， 运行时候替换成 `isCoin()`
  static isCoin() {
    return CommandComputed.isCoin();
  }

  // python中通过`isBlocked`调用，运行时候替换成 `isBlocked()`
  static isBlocked() {
    return CommandComputed.isBlocked();
  }

  static isRightBlocked() {
    return CommandComputed.isRightBlocked();
  }

  static restore() {
    CommandComputed.restore();
  }
}

export default Command;
