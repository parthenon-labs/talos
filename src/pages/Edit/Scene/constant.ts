export enum RoleAnimationKey {
  Failure = 'Failure',
  Fall = 'Fall',
  Fly = 'Fly',
  FlyInPlace = 'Fly_In_Place',
  Idle = 'Idle',
  Idle2 = 'Idle_2',
  JumpUp = 'Jump_Up',
  Land = 'Land',
  Roll = 'Roll',
  RollInPlace = 'Roll_In_Place',
  Sleep = 'Sleep',
  Success = 'Success',
  Talk = 'Talk',
  Walk = 'Walk',
  WalkInPlace = 'Walk_In_Place',
}

export enum ModelKey {
  role = 'RootNode (gltf orientation matrix)',
  scene = 'main_scene',
  roleBegin = 'role_begin',
  coin = 'coin',
  road = 'road',
  floor = 'floor',
  successOutput = 'success_output',
}

export enum DirctionKey {
  '+x',
  '-z',
  '-x',
  '+z',
}

export const roleYPosition = 1.07;

const angle = Math.PI / 2;

export const RoleDirctionAngle = [angle, angle * 2, angle * 3, angle * 4];

export const BlockDirctionAngle = [...new Array(4).keys()].map(i => i * angle);
