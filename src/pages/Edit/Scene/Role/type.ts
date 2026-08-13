export type RoleRotateType = 'left' | 'right';
export type RoleActionType = 'collectCoin';
export type RoleMoveType = 'moveForward' | 'move';
export type DefaultControlType =
  | RoleRotateType
  | RoleActionType
  | 'moveForward';

export type ControlType = 'move' | 'place' | DefaultControlType;

export interface DefaultControlTask {
  type: DefaultControlType;
}

export interface MoveControlTask {
  type: 'move';
  args: number;
}

export interface PlaceControlTask {
  type: 'place';
  args: [x: number, z: number];
}

export type ControlTask =
  | DefaultControlTask
  | MoveControlTask
  | PlaceControlTask;
