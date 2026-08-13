import { DirctionKey } from '../constant';

export type BlockType =
  | 'floor'
  | 'road'
  | 'rotateRoad'
  | 'woodenBridge'
  | 'stoneBridge'
  | 'coin'
  | 'treeFloor';

export interface BlockMapValue {
  name: `${BlockType}_block`;
  text: string;
  scale?: number;
  y?: number;
}

export const blockMap: Record<BlockType, BlockMapValue> = {
  floor: {
    name: 'floor_block',
    text: 'Ground',
  },
  road: {
    name: 'road_block',
    text: 'Straight path',
  },
  rotateRoad: {
    name: 'rotateRoad_block',
    text: 'Corner path',
  },
  woodenBridge: {
    name: 'woodenBridge_block',
    text: 'Wooden bridge',
  },
  stoneBridge: {
    name: 'stoneBridge_block',
    text: 'Stone bridge',
  },
  coin: {
    name: 'coin_block',
    text: 'Coin',
  },
  treeFloor: {
    name: 'treeFloor_block',
    text: 'Forest ground',
    scale: 1.7,
    y: -1.2,
  },
};

export interface CommandType {
  type: BlockType;
  position: [x: number, y: number, z: number];
  direction: DirctionKey;
}
