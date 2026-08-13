import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { EditCacheKeys } from '@/apis/queryKeys';
import type { ChapterList } from '@/apis/model/EditModel';
import type { EditPageUrlParams } from '@/routes/types';

const useChapterTitle = () => {
  const queryClient = useQueryClient();
  const urlParams = useParams<EditPageUrlParams>();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState('');
  const [chapterList, setChapterList] = useState<ChapterList>([]);

  useEffect(() => {
    if (!urlParams.id) return;
    const queryCache = queryClient.getQueryCache();
    const queryHash = JSON.stringify([EditCacheKeys.ChapterList, urlParams.id]);

    const changeTitle = (data?: ChapterList) => {
      data && setChapterList(data);
      const chapterId = searchParams.get('chapterId');
      const childId = searchParams.get('childId');
      const currentChapter = (data ?? chapterList)?.find(
        chapter => chapter._id === chapterId,
      );
      const child = currentChapter?.children.find(i => i._id === childId);
      if (!(currentChapter && child)) return;
      setTitle(`${currentChapter.text}-${child.text}`);
    };

    queryCache.subscribe(event => {
      if (
        event?.type === 'updated' &&
        event.query.queryHash === queryHash &&
        event.action.type === 'success'
      ) {
        changeTitle(event.action.data);
      }
    });
    changeTitle();
  }, [urlParams.id, searchParams]);
  return title;
};

export default useChapterTitle;
