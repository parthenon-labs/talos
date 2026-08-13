import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  startTransition,
} from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useWindowSize, useLocalStorage } from 'react-use';
import { useSearchParams, useParams } from 'react-router-dom';
import cn from 'classnames';
import {
  List,
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import HandleBoundary from '@/stories/HandleBoundary';
import { ChapterList as ChapterListData } from '@/apis/model/EditModel';
import { LocalStorageKeys, LocalStorageLevelKeys } from '@/utils/storage';
import type { EditPageUrlParams } from '@/routes/types';
import { toggleChapter, setBlocklyCodeChanged } from '../store';
import { localStaticBaseUrl } from '@/utils/constant';

interface ChapterListProps {
  chapterList: UseQueryResult<ChapterListData>;
}

const ChapterList = ({ chapterList }: ChapterListProps) => {
  const urlParams = useParams<EditPageUrlParams>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { chapterListState, chapterClickDisable, running } = useAppSelector(
    ({ edit }) => edit,
  );
  const [, setLevelKey] = useLocalStorage<LocalStorageLevelKeys>(
    `${LocalStorageKeys.LastLevelKey}-${urlParams.id}`,
  );
  const [closeKey, setCloseKey] = useState<string[]>([]);

  useEffect(() => {
    dispatch(toggleChapter(width >= 1400));
  }, [width]);

  const handleClick = useCallback(
    (_id: string) => {
      setCloseKey(preState => {
        const exist = preState.includes(_id);
        if (exist) return preState.filter(i => i !== _id);
        return [...preState, _id];
      });
    },
    [closeKey],
  );

  const selectChapter = useCallback(
    (chapterId: string, childId: string) => {
      startTransition(() => {
        dispatch(setBlocklyCodeChanged(false));
        const oldSearch = Object.fromEntries(searchParams.entries());
        setSearchParams(
          { ...oldSearch, chapterId, childId },
          { replace: true },
        );
        setLevelKey({
          chapterId,
          childId,
        });
      });
    },
    [searchParams],
  );

  const listDisabled = useMemo(
    () => chapterClickDisable || running,
    [chapterClickDisable, running],
  );

  return (
    <div
      className={cn(
        'border-r border-primary transition-all duration-300',
        'flex-shrink-0 overflow-y-auto overflow-x-hidden',
        chapterListState ? 'w-[250px]' : 'w-0',
      )}
    >
      <HandleBoundary query={chapterList}>
        {data => (
          <List component="nav" className="min-w-[250px]">
            {data.map(({ text, _id, children, icon }) => (
              <div key={_id}>
                <ListItemButton
                  onClick={() => handleClick(_id)}
                  disabled={listDisabled}
                >
                  <ListItemIcon>
                    <img
                      className="h-9 w-9"
                      src={`${localStaticBaseUrl}${icon}`}
                      alt="icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {closeKey.includes(_id) ? <ChevronRight /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={!closeKey.includes(_id)}
                  timeout="auto"
                  unmountOnExit
                >
                  {children.map(item => (
                    <List disablePadding key={item._id}>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        selected={
                          searchParams.get('chapterId') === _id &&
                          searchParams.get('childId') === item._id
                        }
                        onClick={() => selectChapter(_id, item._id)}
                        disabled={listDisabled}
                      >
                        <ListItemIcon>
                          <img
                            className="h-7 w-7"
                            src={`${localStaticBaseUrl}${item.icon}`}
                            alt="icon"
                          />
                        </ListItemIcon>
                        <span className="text-sm text-gray-600">
                          {item.text}
                        </span>
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </div>
            ))}
          </List>
        )}
      </HandleBoundary>
    </div>
  );
};

export default ChapterList;
