import { ReactElement } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Button } from '@mui/material';
import Loading from '../Loading';
import errorImage from '@/assets/error.webp';

export interface HandleBoundaryProps<T, E> {
  /**
   * 传入函数，参数data 为响应结果
   */
  children: (data: T) => ReactElement;

  /**
   * useQuery 返回值
   */
  query: UseQueryResult<T, E>;

  /**
   * loading 状态组件，默认为 stories/Loading
   */
  loadingComponent?: ReactElement;
}

const HandleBoundary = <T extends unknown, E = unknown>({
  children,
  query,
  loadingComponent = <Loading />,
}: HandleBoundaryProps<T, E>) => {
  if (query.isLoading) return loadingComponent;
  if (query.isSuccess) return children(query.data);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img className="w-[200px]" src={errorImage} alt="error_image" />
      <p className="my-4 text-primary">Something went wrong. Please try again.</p>
      <Button onClick={() => query.refetch()} variant="outlined">
        Retry
      </Button>
    </div>
  );
};

export default HandleBoundary;
