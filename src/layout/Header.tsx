import { useEffect, useMemo, startTransition, useDeferredValue } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon } from '@mui/icons-material';
import FullScreenButton from '@/stories/FullScreenButton';
import { toggleChapter } from '@/pages/Edit/store';
import { useAppDispatch } from '@/hooks/state';
import useChapterTitle from './useChapterTitle';

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
          'z-10 bg-gradient-to-b from-[#3D8BFF] to-[#256FEA] p-4',
          'text-white shadow-primary',
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
                'border-r border-solid border-white/25': !isCenter,
              })}
            >
              <span className="block w-[140px] text-2xl font-extrabold tracking-tight">
                Talos
              </span>
            </div>
            {!isCenter && (
              <>
                <MenuButton onClick={() => dispatch(toggleChapter())}>
                  <Tooltip title="Lessons" arrow>
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
                  <Tooltip title="Back to home" arrow>
                    <HomeIcon className="h-6 w-6" />
                  </Tooltip>
                </MenuButton>
              </>
            )}

            {/* <Link to="/login">
              <MenuButton>
                <Tooltip title="Sign in" arrow>
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
