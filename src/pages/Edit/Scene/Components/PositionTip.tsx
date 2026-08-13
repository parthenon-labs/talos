import cn from 'classnames';
import { useAppSelector } from '@/hooks/state';

const PositionTip = () => {
  const { display, tipPosition, value } = useAppSelector(
    ({ edit }) => edit.positionTip,
  );
  return (
    <div
      className={cn(
        'fixed flex h-10 w-32 items-center justify-center rounded-md bg-primary text-white',
        'before:absolute before:top-[-28px] before:left-[calc(128px/2-14px)]',
        'before:block before:border-[14px] before:border-transparent before:border-b-[rgb(41,126,255)]',
        {
          hidden: !display,
        },
      )}
      style={{
        top: tipPosition.y + 14,
        left: tipPosition.x - 128 / 2,
      }}
    >
      (x: {value.x}, z: {value.z})
    </div>
  );
};

export default PositionTip;
