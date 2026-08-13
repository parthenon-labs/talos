import { useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useSearchParams, useParams } from 'react-router-dom';
import { EditCacheKeys } from '@/apis/queryKeys';
import EditServices from '@/apis/services/EditServices';
import type { ChapterList } from '@/apis/model/EditModel';
import type { EditPageUrlParams } from '@/routes/types';

export const useChapterList = () => {
  const urlParams = useParams<EditPageUrlParams>();
  const [searchParams, setSearchParams] = useSearchParams();

  const chapterList = useQuery(
    [EditCacheKeys.ChapterList, urlParams.id],
    () => EditServices.getChapterList(<string>urlParams.id),
    {
      notifyOnChangeProps: ['data'],
    },
  );
  useEffect(() => {
    if (searchParams.get('chapterId') && searchParams.get('childId')) return;

    const oldSearch = Object.fromEntries(searchParams.entries());
    const firstLevel = chapterList?.data?.[0];

    if (firstLevel?._id && firstLevel?.children?.[0]?._id) {
      setSearchParams(
        {
          ...oldSearch,
          chapterId: firstLevel._id,
          childId: firstLevel?.children[0]._id,
        },
        { replace: true },
      );
    }
  }, [chapterList.data]);

  return chapterList;
};

export const useChapterContent = (chapterList: UseQueryResult<ChapterList>) => {
  const urlParams = useParams<EditPageUrlParams>();
  const [searchParams] = useSearchParams();

  return useQuery(
    [
      EditCacheKeys.ChapterContent,
      urlParams.id,
      searchParams.get('chapterId'),
      searchParams.get('childId'),
    ],
    () =>
      EditServices.getChapterContentById({
        courseId: <string>urlParams.id,
        chapterId: <string>searchParams.get('chapterId'),
        childId: <string>searchParams.get('childId'),
      }),
    {
      enabled:
        !!(searchParams.get('chapterId') && searchParams.get('childId')) ||
        chapterList.isSuccess,
    },
  );
};
