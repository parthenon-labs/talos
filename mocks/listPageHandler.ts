import { rest } from 'msw';
import { baseResponse } from './index';
import { CourseList } from '../src/apis/model/CourseModel';
import listPageData from './data/listPage.json';

export default [
  rest.get('/api/course-list', (req, res, ctx) => {
    return res(ctx.json(baseResponse<CourseList>(listPageData)));
  }),
];
