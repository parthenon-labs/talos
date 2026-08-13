import { useCallback, useEffect, useRef } from 'react';
import 'requestidlecallback-polyfill';

const useIdleCallback: typeof useEffect = (callback, dps) => {
  const handle = useRef<number | null>(null);
  const cb = useCallback(callback, []);
  useEffect(
    () => {
      handle.current = requestIdleCallback(cb);
      return () => {
        const { current: currentHandle } = handle;
        handle.current = null;
        if (currentHandle === null) return;
        cancelIdleCallback(currentHandle);
      };
    },
    dps ? [cb, ...dps] : [cb],
  );
};

export default useIdleCallback;
