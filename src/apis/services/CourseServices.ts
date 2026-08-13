// import axios from 'axios';
import listPageData from '@mocks/data/listPage.json';
import { CourseList } from '@/apis/model/CourseModel';

class CourseServices {
  static getCourseList(): Promise<CourseList> {
    // return axios.get('/course-list');
    return Promise.resolve(listPageData);
  }
}

export default CourseServices;
