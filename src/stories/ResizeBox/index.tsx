import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import cn from 'classnames';
import { useWindowSize } from 'react-use';

interface BaseProps {
  /**
   * 子元素
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * 默认(宽度/高度)
   */
  size?: number;
  /**
   * 可拖住缩放的最大宽度
   */
  max?: number;
  /**
   * 可拖住缩放的最小宽度
   */
  min?: number;
  /**
   * 容器 className
   */
  className?: string;
  /**
   * 触发中的回调：e参数为 DOMRect
   */
  onChange?: (e: DOMRect) => void;
}

interface XProps extends BaseProps {
  /**
   * resize方向
   */
  direction: 'x';

  /**
   * 拖拽条位置
   */
  barPosition?: 'left' | 'right';
}

interface YProps extends BaseProps {
  /**
   * resize方向
   */
  direction: 'y';

  /**
   * 拖拽条位置
   */
  barPosition?: 'top' | 'bottom';
}

export type ResizeBoxProps = XProps | YProps;

const ResizeBox = ({
  size = 300,
  max = 500,
  min = 100,
  direction = 'y',
  barPosition,
  className,
  children,
  onChange = () => {},
}: ResizeBoxProps) => {
  const { width: windowWidth } = useWindowSize();
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState(size);
  const [isResizing, setIsResizing] = useState(false);

  const isY = useMemo(() => direction === 'y', [direction]);

  const handleUp = useCallback(() => setIsResizing(false), []);

  useEffect(() => {
    if (boxRef.current && boxSize < max && boxSize > min) {
      onChange(boxRef.current.getBoundingClientRect());
    }
  }, [boxSize]);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && boxRef.current) {
        const { top, right } = boxRef.current.getBoundingClientRect();
        const { clientWidth } = document.body;
        setBoxSize(
          isY
            ? mouseMoveEvent.clientY - top
            : clientWidth - mouseMoveEvent.clientX - (clientWidth - right),
        );
      }
    },
    [isResizing, windowWidth],
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [resize]);

  const barPos = useMemo(() => {
    const pos = barPosition ?? (direction === 'x' ? 'left' : 'bottom');
    return {
      left: 'left-0',
      right: 'right-0',
      top: 'top-0',
      bottom: 'bottom-0',
    }[pos];
  }, [direction, barPosition]);

  return (
    <div
      style={
        isY
          ? {
              maxHeight: max,
              minHeight: min,
              height: boxSize,
            }
          : {
              maxWidth: max,
              minWidth: min,
              width: boxSize,
            }
      }
      className={cn('relative flex h-full w-full flex-col', className)}
      ref={boxRef}
    >
      <div className="w-full flex-grow overflow-auto">{children}</div>
      <div
        onMouseDown={() => setIsResizing(true)}
        onTouchStart={() => setIsResizing(true)}
        tabIndex={0}
        role="button"
        className={cn(
          'transition-all duration-100 hover:bg-lightHover',
          'flex items-center justify-center text-xs text-white',
          `absolute select-none ${barPos}`,
          isY
            ? 'w-full cursor-[row-resize] hover:h-2'
            : 'h-full cursor-[col-resize] hover:w-2',
          isResizing ? 'bg-lightHover' : 'bg-light',
          {
            'writing-mode-lr': !isY,
            'h-1': !isResizing && isY,
            'h-2': isResizing && isY,
            'w-1': !isResizing && !isY,
            'w-2': isResizing && !isY,
          },
        )}
      >
        ······
      </div>
    </div>
  );
};

export default ResizeBox;
