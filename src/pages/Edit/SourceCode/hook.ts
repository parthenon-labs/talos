import { useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import type { EditPageUrlParams } from '@/routes/types';

export const useCurrentIds = () => {
  const urlParams = useParams<EditPageUrlParams>();
  const [searchParams] = useSearchParams();

  return useMemo(
    () => ({
      courseId: <string>urlParams.id,
      chapterId: <string>searchParams.get('chapterId'),
      childId: <string>searchParams.get('childId'),
    }),
    [urlParams.id, searchParams.get('chapterId'), searchParams.get('childId')],
  );
};
