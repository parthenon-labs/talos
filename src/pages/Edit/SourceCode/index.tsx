import { useEffect, useRef } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import HandleBoundary from '@/stories/HandleBoundary';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import loadable from '@/utils/loadable';
import ResizeBox from '@/stories/ResizeBox';
import FullScreenButton from '@/stories/FullScreenButton';
import Markdown from './Markdown';
import SwitchButton from './SwitchButton';
import PythonRuntime from './PythonRuntime';
import { EditCacheKeys } from '@/apis/queryKeys';
import EditServices from '@/apis/services/EditServices';
import type { ChapterContentResponse } from '@/apis/model/EditModel';
import { useCurrentIds } from './hook';
import { setPythonCode, setBlocklyCode } from '../store';

const BlocklyEditor = loadable(() => import('./BlocklyEditor'));
const PythonEditor = loadable(() => import('./PythonEditor'));

export const editor = {
  blockly: BlocklyEditor,
  python: PythonEditor,
};

interface SourceCodeProps {
  chapterContent: UseQueryResult<ChapterContentResponse>;
}

const SourceCode = ({ chapterContent }: SourceCodeProps) => {
  const { editMode } = useAppSelector(({ edit }) => edit);
  const dispatch = useAppDispatch();
  const editorArea = useRef<HTMLDivElement>(null!);

  const ids = useCurrentIds();

  useQuery(
    [EditCacheKeys.ChapterCode, Object.values(ids)],
    () => EditServices.getChapterCode(ids),
    {
      staleTime: 0,
      onSuccess: data => {
        dispatch(setPythonCode(data.pythonCode));
        dispatch(setBlocklyCode(data.blocklyCode));
      },
    },
  );

  useEffect(() => {
    PythonRuntime.getInstance();
  }, []);

  return (
    <div className="relative flex flex-grow flex-col">
      <SwitchButton />

      <ResizeBox direction="y" size={180}>
        <HandleBoundary query={chapterContent}>
          {data => <Markdown description={data?.description} />}
        </HandleBoundary>
      </ResizeBox>

      <div ref={editorArea} className="relative flex-shrink-0 flex-grow">
        {editMode === 'blockly' ? <BlocklyEditor /> : <PythonEditor />}
        <FullScreenButton
          className="absolute top-1 right-1 z-50"
          element={editorArea}
          color="primary"
        />
      </div>
    </div>
  );
};

export default SourceCode;
