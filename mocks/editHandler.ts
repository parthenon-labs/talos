import { rest, DefaultRequestBody } from 'msw';
import { omit } from 'lodash-es';
import { baseResponse } from './index';
import {
  ChapterContentData,
  ChapterContentResponse,
  ChapterList,
} from '@/apis/model/EditModel';
import chapter1 from './data/chapter1.json';
import chapter2 from './data/chapter2.json';
import chapter3 from './data/chapter3.json';
import chapterContent1 from './data/chapterContent1.json';
import chapterContent2 from './data/chapterContent2.json';
import chapterContent3 from './data/chapterContent3.json';

export const chapterListHandler = (id: string): ChapterList => {
  const chapterMap = {
    '1': chapter1,
    '2': chapter2,
    '3': chapter3,
  };

  return chapterMap[id as keyof typeof chapterMap];
};

export const chapterContentHandler = (
  data: ChapterContentData,
): ChapterContentResponse => {
  const contentMap: Record<string, typeof chapterContent1> = {
    '1': chapterContent1,
    '2': chapterContent2,
    '3': chapterContent3,
  };
  const [currentContent] = contentMap[data.courseId].filter(
    i => i.chapterId === data.chapterId && i.childId === data.childId,
  );
  return omit(currentContent, ['chapterId', 'childId']);
};

export default [
  rest.get<DefaultRequestBody, { id: string }>(
    '/api/chapter-list/:id',
    (req, res, ctx) => {
      const { id } = req.params;
      return res(ctx.json(baseResponse(chapterListHandler(id))));
    },
  ),
  rest.post<ChapterContentData>('/api/chapter-content', (req, res, ctx) =>
    res(ctx.json(baseResponse(chapterContentHandler(req.body)))),
  ),
];
