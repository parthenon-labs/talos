import { useEffect, useState, useCallback, RefObject } from 'react';
import screenfull from 'screenfull';

const useFullScreen = (ref?: RefObject<Element>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', event => {
        if (event.target === (ref?.current ?? document.documentElement)) {
          setIsFullScreen(screenfull.isFullscreen);
        }
      });
    }
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (screenfull.isEnabled) {
      screenfull.toggle(ref?.current ?? document.documentElement);
    }
  }, [ref]);

  return { isFullScreen, toggleFullScreen };
};

export default useFullScreen;
