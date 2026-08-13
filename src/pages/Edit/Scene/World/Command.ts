import { toast } from 'react-toastify';
import { errorToastOptions } from '@/utils/constant';
import { BlockType, blockMap, CommandType } from './types';
import CommandQueue from './CommandQueue';
import { DirctionKey } from '../constant';

class Command {
  static Block(type: BlockType, direction: DirctionKey) {
    return {
      type,
      direction: DirctionKey[direction] ?? DirctionKey['+x'],
    };
  }

  static Coin() {
    return {
      type: 'coin',
    } as const;
  }

  static make(
    { type, direction }: Pick<CommandType, 'type' | 'direction'>,
    x: number,
    z: number,
    y: number = 0,
  ) {
    if (!Object.keys(blockMap).includes(type)) {
      return toast.error('Unknown tile type', errorToastOptions);
    }
    CommandQueue.push({
      type,
      position: [x, type === 'coin' ? 1.5 + y : 0 + y, z],
      direction,
    });
  }
}

export default Command;
