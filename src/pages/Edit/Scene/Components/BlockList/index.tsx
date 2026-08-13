import { useState, useImperativeHandle, forwardRef } from 'react';
import cn from 'classnames';
import { omit } from 'lodash-es';
import Models from './Models';
import { blockMap, BlockType } from '../../World/types';
import { localStaticBaseUrl } from '@/utils/constant';

export interface BlockListRefHandle {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockList = forwardRef<BlockListRefHandle>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [currentShowKey, setShowKey] = useState<BlockType | ''>('');
  const [imgHidden, setImgHidden] = useState<BlockType | ''>('');

  useImperativeHandle(ref, () => ({ setOpen }));

  return (
    <div
      className={cn(
        'absolute top-0 h-full w-[max(14vw,200px)] bg-primary/20 py-3',
        'transition-all duration-300',
        open ? 'right-0' : 'right-[min(-14vw,-200px)]',
      )}
      aria-hidden="true"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div
        onClick={() => setOpen(pre => !pre)}
        className={cn(
          'absolute -left-10 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center',
          'select-none rounded-l-full backdrop-blur transition-all',
          open ? 'bg-primary/20' : 'bg-primary shadow-md shadow-blue-400/50',
        )}
        role="button"
        aria-hidden="true"
      >
        🧱
      </div>

      <div className="h-full overflow-auto">
        {Object.entries(omit(blockMap, ['coin'])).map(([key, blockValue]) => (
          <div
            key={blockValue.name}
            aria-hidden="true"
            onMouseEnter={() => setShowKey(key as BlockType)}
            onMouseLeave={() => {
              setShowKey('');
              setImgHidden('');
            }}
            className={cn(
              'relative mx-3 mb-3 h-[calc(max(14vw,200px)-12px*2)] last:mb-0',
              'bg-primary/30 bg-contain bg-center backdrop-blur-sm',
            )}
            style={omit(
              {
                backgroundImage: `url(${localStaticBaseUrl}static/images/models/${blockValue.name}.webp)`,
              },
              imgHidden === key ? ['backgroundImage'] : [],
            )}
          >
            {currentShowKey === key && (
              <Models
                blockValue={blockValue}
                onCreated={() => setImgHidden(key as BlockType)}
              />
            )}
            <div
              className={cn(
                'absolute bottom-0 flex h-10 w-full items-center justify-center',
                'bg-primary/10 text-white backdrop-blur-sm',
              )}
            >
              {blockValue.text}: {key}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BlockList;
