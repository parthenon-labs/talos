import { useEffect, useMemo, startTransition, useDeferredValue } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon } from '@mui/icons-material';
import FullScreenButton from '@/stories/FullScreenButton';
import { toggleChapter } from '@/pages/Edit/store';
import { useAppDispatch } from '@/hooks/state';
import useChapterTitle from './useChapterTitle';
import logoImage from '@/assets/logo.webp';

const btnStyles = { color: 'rgba(255,255,255,1)' };
const MenuButton = styled(IconButton)(btnStyles);

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCenter = useMemo(() => !/^\/edit/.test(pathname), [pathname]);
  const chapterTitle = useChapterTitle();
  const deferChapterTitle = useDeferredValue(chapterTitle);

  useEffect(() => {
    document.title = `Talos ${deferChapterTitle}`;
  }, [deferChapterTitle]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 flex h-[52px] items-center justify-center',
          'z-10 bg-primary p-4 text-white shadow-primary',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between',
            'transition-all duration-300 ease-in-out',
            isCenter ? 'w-content' : 'w-full',
          )}
        >
          <div className="flex h-full select-none items-center">
            <div
              className={cn('mr-4 h-full pr-4', {
                'border-r-2 border-solid border-current': !isCenter,
              })}
            >
              <img src={logoImage} alt="京程一灯" className="w-[140px]" />
            </div>
            {!isCenter && (
              <>
                <MenuButton onClick={() => dispatch(toggleChapter())}>
                  <Tooltip title="章节列表" arrow>
                    <MenuIcon />
                  </Tooltip>
                </MenuButton>

                <span>{deferChapterTitle}</span>
              </>
            )}
          </div>

          <div>
            {!isCenter && (
              <>
                <FullScreenButton />
                <MenuButton onClick={() => startTransition(() => navigate(-1))}>
                  <Tooltip title="返回首页" arrow>
                    <HomeIcon className="h-6 w-6" />
                  </Tooltip>
                </MenuButton>
              </>
            )}

            {/* <Link to="/login">
              <MenuButton>
                <Tooltip title="登录" arrow>
                  <LoginIcon />
                </Tooltip>
              </MenuButton>
            </Link> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
