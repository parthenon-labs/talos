import { startTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';
import useIdleCallback from '@/hooks/useIdleCallback';
import { Edit } from '@/routes';
import HandleBoundary from '@/stories/HandleBoundary';
import AwesomeLoading from '@/stories/AwesomeLoading';
import CourseServices from '@/apis/services/CourseServices';
import { CourseCacheKeys } from '@/apis/queryKeys';
import Card from './Card';

const CourseCategoryList = [
  { name: '学习', key: 'study' },
  // { name: '挑战', key: 'challenge' },
] as const;

const ListPage = () => {
  useIdleCallback(() => {
    startTransition(() => {
      Edit.preload();
    });
  });

  const courseList = useQuery(
    [CourseCacheKeys.CourseList],
    CourseServices.getCourseList,
  );

  return (
    <div className="flex h-[calc(100vh-52px)] justify-center bg-slate-50">
      <main className="flex w-[1200px] flex-col px-8 pt-8">
        <HandleBoundary
          query={courseList}
          loadingComponent={<AwesomeLoading />}
        >
          {data => (
            <>
              {CourseCategoryList.map(({ name, key }) => (
                <div key={key}>
                  <div className="text-2xl">{name}</div>
                  <div
                    className={cn(
                      'mb-10 mt-5 grid w-full gap-8',
                      'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
                    )}
                  >
                    {data[key].map(item => (
                      <Card key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </HandleBoundary>
      </main>
    </div>
  );
};
export default ListPage;
