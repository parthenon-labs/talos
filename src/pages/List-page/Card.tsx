import { useCallback } from 'react';
import cn from 'classnames';
import { useLocalStorage } from 'react-use';
import { stringify } from 'qs';
import { useNavigate } from 'react-router-dom';
import { omitBy, isNil } from 'lodash-es';
import AwesomeButton from '@/stories/AwesomeButton';
import { LocalStorageKeys, LocalStorageLevelKeys } from '@/utils/storage';
import { editor } from '@/pages/Edit/SourceCode';
import type { EditModeType } from '@/pages/Edit/store';
import type { CourseItem as CardProps } from '@/apis/model/CourseModel';
import { localStaticBaseUrl } from '@/utils/constant';

const Card = ({ id, imgUrl, name, descriptors, enabled }: CardProps) => {
  const navigate = useNavigate();
  const [levelKey] = useLocalStorage<LocalStorageLevelKeys>(
    `${LocalStorageKeys.LastLevelKey}-${id}`,
  );

  const handleClick = useCallback(
    (crouseId: string, mode: EditModeType) => {
      const query = {
        mode,
        chapterId: levelKey?.chapterId,
        childId: levelKey?.childId,
      };

      navigate(`/edit/${crouseId}?${stringify(omitBy(query, isNil))}`);
    },
    [levelKey],
  );

  const preloadEditor = (mode: EditModeType) => editor[mode].preload();

  return (
    <div
      key={id}
      className={cn(
        'group h-full w-full overflow-hidden rounded-[40px] bg-white',
        'relative flex flex-col flex-wrap justify-between shadow-lg',
      )}
    >
      <img
        className="aspect-1 min-h-[300px] w-full bg-cyan-100"
        src={`${localStaticBaseUrl}${imgUrl}`}
        alt={name}
      />
      <div
        className={cn(
          'absolute top-[calc(100%-100px)] w-full rounded-tl-[40px] bg-white',
          'after:absolute after:top-[-79px] after:right-[-1px] after:block after:h-[80px] after:w-[80px]',
          'after:bg-white after:content-[""] after:[clip-path:path("M_40_80_c_22_0_40_-22_40_-40_v_40_Z")]',
          'transition-all duration-300 ease-in-out group-hover:-translate-y-[60px]',
        )}
      >
        <div className="flex h-[100px] flex-col justify-center px-6">
          <div className="text-xl text-gray-700">{name}</div>
          <div className="text-sm text-gray-400">{descriptors}</div>
        </div>

        <div className="flex justify-around p-2 pb-8">
          {enabled ? (
            <>
              <AwesomeButton
                onMouseEnter={() => preloadEditor('blockly')}
                onClick={() => handleClick(id, 'blockly')}
                opacity={false}
                className="w-2/5"
              >
                Start with blocks
              </AwesomeButton>

              <AwesomeButton
                onMouseEnter={() => preloadEditor('python')}
                onClick={() => handleClick(id, 'python')}
                className="w-2/5"
              >
                Start with Python
              </AwesomeButton>
            </>
          ) : (
            <span className="text-gray-400">Coming soon...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
