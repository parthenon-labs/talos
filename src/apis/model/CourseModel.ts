export interface CourseItem {
  id: string;
  name: string;
  descriptors: string;
  imgUrl?: string;
  enabled: boolean;
}

export interface CourseList {
  study: CourseItem[];
  challenge: CourseItem[];
}
