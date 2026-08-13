import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '@/hooks/state';
import { switchMode, EditModeType } from '@/pages/Edit/store';
import ChapterList from './ChapterList';
import SourceCode from './SourceCode';
import Scene from './Scene';
import { useChapterContent, useChapterList } from './hook';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.get('mode') &&
      dispatch(switchMode(searchParams.get('mode') as EditModeType));
  }, [searchParams.get('mode')]);

  const chapterList = useChapterList();
  const chapterContent = useChapterContent(chapterList);

  return (
    <div className="flex h-[calc(100vh-52px)] min-w-[800px]">
      <ChapterList chapterList={chapterList} />
      <SourceCode chapterContent={chapterContent} />
      <Scene chapterContent={chapterContent} />
      <ToastContainer />
    </div>
  );
};

export default Edit;
