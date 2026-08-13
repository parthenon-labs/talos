// import axios from 'axios';
import { chapterListHandler, chapterContentHandler } from '@mocks/editHandler';
import type {
  ChapterList,
  ChapterContentData,
  ChapterContentResponse,
  GetChapterCodeData,
  SaveChapterCodeData,
  CodeType,
} from '@/apis/model/EditModel';
import IDB from '../db/editDB';

class EditServices {
  /**
   * 通过课程id获取章节列表
   */
  static getChapterList(id: string): Promise<ChapterList> {
    // return axios.get(`/chapter-list/${id}`);

    return Promise.resolve(chapterListHandler(id));
  }

  /**
   * 通过 chapterId childId获取章节内容（描述，模型路径）
   */
  static getChapterContentById(
    data: ChapterContentData,
  ): Promise<ChapterContentResponse> {
    // return axios.post(`/chapter-content`, data);

    return Promise.resolve(chapterContentHandler(data));
  }

  /**
   * 保存用户代码
   */
  static async saveChapterCode(data: SaveChapterCodeData): Promise<void> {
    const idb = new IDB();
    return idb.set(data);
  }

  /**
   * 获取用户代码
   */
  static getChapterCode(data: GetChapterCodeData): Promise<CodeType> {
    const idb = new IDB();
    return idb.get(data);
    // return axios.post(`/chapter/getCode`, data);
  }
}

export default EditServices;
