import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from '@mui/icons-material';
import useFullScreen from '@/hooks/useFullScreen';

export interface FullScreenButtonProps {
  /**
   * 需要全屏的元素，默认为 `根元素`
   */
  element?: React.RefObject<Element>;

  /**
   * className
   */
  className?: string;

  /**
   * ICON颜色
   */
  color?: IconButtonProps['color'];
}

const FullScreenButton = ({
  element,
  className,
  color = 'inherit',
}: FullScreenButtonProps) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen(element);

  return (
    <span className={className}>
      <IconButton onClick={() => toggleFullScreen()} color={color}>
        <Tooltip title={`${isFullScreen ? '退出' : '进入'}全屏`} arrow>
          {isFullScreen ? (
            <FullscreenExitIcon className="h-6 w-6" />
          ) : (
            <FullscreenIcon className="h-6 w-6" />
          )}
        </Tooltip>
      </IconButton>
    </span>
  );
};

export default FullScreenButton;
