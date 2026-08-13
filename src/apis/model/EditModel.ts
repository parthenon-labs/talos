interface ChapterListItem {
  _id: string;
  text: string;
  icon: string;
  children: Omit<ChapterListItem, 'children'>[];
}

export type ChapterList = ChapterListItem[];

export interface ChapterContentData {
  courseId: string;
  chapterId: string;
  childId: string;
}

export interface CodeType {
  pythonCode: string;
  blocklyCode: string;
}

export interface ChapterContentResponse {
  description: string;
  sceneUrl?: string;
}

export interface GetChapterCodeData {
  courseId: string;
  chapterId: string;
  childId: string;
}

export interface SaveChapterCodeData extends GetChapterCodeData, CodeType {
  passed: boolean;
}
