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
    text: '普通陆地',
  },
  road: {
    name: 'road_block',
    text: '直路',
  },
  rotateRoad: {
    name: 'rotateRoad_block',
    text: '转弯路',
  },
  woodenBridge: {
    name: 'woodenBridge_block',
    text: '木桥',
  },
  stoneBridge: {
    name: 'stoneBridge_block',
    text: '石桥',
  },
  coin: {
    name: 'coin_block',
    text: '金币',
  },
  treeFloor: {
    name: 'treeFloor_block',
    text: '长有🌲的陆地',
    scale: 1.7,
    y: -1.2,
  },
};

export interface CommandType {
  type: BlockType;
  position: [x: number, y: number, z: number];
  direction: DirctionKey;
}
