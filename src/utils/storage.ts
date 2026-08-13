import type { EditPageUrlParams, EditPageSearchParams } from '@/routes/types';
import type { PropType } from '@/utils/types';

export enum LocalStorageKeys {
  UserToken = 'blood',
  LastLevelKey = 'last-level-key',
}

export type LocalStorageLevelKeys = Omit<EditPageSearchParams, 'mode'>;

export type LevelKeyStorageKeyType =
  `${LocalStorageKeys.LastLevelKey}-${PropType<EditPageUrlParams, 'id'>}`;
