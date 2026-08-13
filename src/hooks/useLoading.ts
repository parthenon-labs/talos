import { useCallback, useEffect, useState } from 'react';

const useLoading = <T>(
  callback: () => Promise<T>,
  dps: ReadonlyArray<unknown>,
) => {
  const [loading, setLoading] = useState(true);

  const showLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const cb = useCallback(async () => {
    showLoading();
    await callback();
    hideLoading();
  }, []);

  useEffect(
    () => {
      cb();
    },
    dps ? [cb, ...dps] : [cb],
  );

  return {
    loading,
    showLoading,
    hideLoading,
  };
};

export default useLoading;
