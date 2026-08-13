import {
  useRef,
  useEffect,
  useMemo,
  memo,
  useState,
  useLayoutEffect,
} from 'react';
import cn from 'classnames';
import { useWindowSize } from 'react-use';
import type { UseQueryResult } from '@tanstack/react-query';
import { useDebounceCallback } from '@react-hook/debounce';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppSelector, useAppDispatch } from '@/hooks/state';
import ResizeBox from '@/stories/ResizeBox';
import { isDev } from '@/utils/constant';
import { GLEngine, GPUEngine } from './Engine';
import PythonRuntime from '../SourceCode/PythonRuntime';
import coinsImage from '@/assets/coins.webp';
import loadable from '@/utils/loadable';
import type { ChapterContentResponse } from '@/apis/model/EditModel';
import MusicButton from './Components/MusicButton';
import GridButton from './Components/GridButton';
import PositionTip from './Components/PositionTip';
import type { BlockListRefHandle } from './Components/BlockList';
import { setRunning, toggleChapterClickDisable } from '../store';

const BlockList = loadable(() => import('./Components/BlockList'));

const RunButton = styled(LoadingButton)({ borderRadius: '18px' });

interface SceneProps {
  chapterContent: UseQueryResult<ChapterContentResponse>;
}

const Scene = ({ chapterContent }: SceneProps) => {
  const { width: windowWidth } = useWindowSize();
  const canvas = useRef<HTMLCanvasElement>(null);
  const blockListRef = useRef<BlockListRefHandle>(null);
  const pythonRuntime = useRef<PythonRuntime>(null!);
  const engine = useRef<GLEngine | GPUEngine>(null!);
  const [engineReady, setEngineReady] = useState(false);
  const [blockList, setBlockList] = useState(false);

  const { pythonRuntimeReady, running, wallet, totalWallet } = useAppSelector(
    ({ edit }) => edit,
  );
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    (async () => {
      if (!canvas.current) return;

      if ('gpu' in navigator) {
        // navigator.gpu existing doesn't guarantee a usable adapter — on
        // some browsers/VMs/drivers the WebGPU handshake inside
        // initEngine() can hang or reject instead of failing fast, which
        // would otherwise leave the scene stuck loading forever. Time it
        // out and fall back to the WebGL engine.
        const gpuInitPromise = new GPUEngine(canvas.current).initEngine();
        // If the timeout below wins the race, this promise is still running
        // in the background and may reject later once we've already moved
        // on to GLEngine — swallow that so it doesn't surface as a stray
        // unhandled-rejection console error.
        gpuInitPromise.catch(() => {});

        try {
          engine.current = await Promise.race([
            gpuInitPromise,
            new Promise<never>((_, reject) =>
              setTimeout(
                () => reject(new Error('WebGPU init timed out')),
                8000,
              ),
            ),
          ]);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn(
            'WebGPU engine init failed, falling back to WebGL:',
            err,
          );
          engine.current = new GLEngine(canvas.current);
        }
      } else {
        engine.current = new GLEngine(canvas.current);
      }

      setEngineReady(true);
      pythonRuntime.current = PythonRuntime.getInstance();
    })();
    return () => {
      engine.current.destroy();
      pythonRuntime.current?.unregister();
    };
  }, []);

  useEffect(() => {
    pythonRuntimeReady && pythonRuntime.current?.register();
  }, [pythonRuntimeReady]);

  useEffect(() => {
    if (!chapterContent.isSuccess) return;
    dispatch(toggleChapterClickDisable(true));
    engine.current?.gameScene
      .loadSceneModel(chapterContent.data.sceneUrl)
      .then(() => dispatch(toggleChapterClickDisable(false)));
    !chapterContent.data.sceneUrl && setBlockList(true);
  }, [chapterContent.data?.sceneUrl, engineReady]);

  const runButtonLoading = useMemo(
    () => !pythonRuntimeReady || running,
    [pythonRuntimeReady, running],
  );

  const clickRun = useDebounceCallback(() => {
    dispatch(setRunning());
    pythonRuntime?.current?.run();
  }, 300);

  return (
    <div className="relative flex">
      <ResizeBox
        direction="x"
        size={windowWidth / 2}
        min={400}
        max={windowWidth / 2}
        onChange={() => engine.current?.resize()}
      >
        <div
          className="relative h-full w-full"
          onClick={() => blockListRef.current?.setOpen(false)}
          aria-hidden="true"
        >
          <canvas
            ref={canvas}
            className="h-full max-h-[calc(100vh-52px)] w-full outline-none"
          />
          <div
            className={cn(
              'pointer-events-none absolute bottom-6 z-20 flex w-full items-center justify-center',
            )}
          >
            <RunButton
              className="pointer-events-auto"
              loading={runButtonLoading}
              loadingPosition="end"
              variant="contained"
              endIcon={<PlayArrowIcon />}
              onClick={clickRun}
            >
              {!pythonRuntimeReady ? 'Loading' : running ? 'Running' : 'Run'}
            </RunButton>
          </div>
          <div className="absolute left-10 top-10 flex justify-center">
            <img
              alt="Coin"
              src={coinsImage}
              className="mr-4 inline-block h-[42px] w-[42px]"
            />
            <span className="flex items-center text-2xl text-[rgb(251,222,8)]">
              {wallet} / {totalWallet}
            </span>
          </div>
          {engineReady && (
            <>
              <MusicButton />
              <GridButton />
            </>
          )}
          {blockList && <BlockList ref={blockListRef} />}
        </div>
      </ResizeBox>
      <PositionTip />
      {isDev && <div id="devtool" className="absolute right-[-300px] h-full" />}
    </div>
  );
};

export default memo(Scene);
