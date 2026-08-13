import type { EditModeType } from '@/pages/Edit/store';

export type EditPageUrlParams = { id: string };

export interface EditPageSearchParams {
  mode: EditModeType;
  chapterId?: string;
  childId?: string;
}
