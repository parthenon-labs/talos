import cn from 'classnames';
import logo from '@/assets/icon_512.png';

const Spin = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'absolute top-0 right-0 left-0 bottom-0 animate-spin-slow',
      'after:block after:rotate-180 after:rounded-full after:border-4 after:border-dark/40 after:content-[""]',
      'after:absolute after:-top-[3px] after:-left-[3px] after:-right-[3px] after:-bottom-[3px]',
      'after:[clip-path:polygon(calc(50%+4px/2)_50%,calc(50%+4px/2)_0%,100%_0%,100%_calc(10%-4px/2),50%_calc(50%-4px/2))]',
      'before:block before:rounded-full before:border-4 before:border-dark/40 before:content-[""]',
      'before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:-bottom-[3px]',
      'before:[clip-path:polygon(calc(50%+4px/2)_50%,calc(50%+4px/2)_0%,100%_0%,100%_calc(10%-4px/2),50%_calc(50%-4px/2))]',
      className,
    )}
  />
);

const AwesomeLoading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div
      className={cn(
        'relative flex items-center justify-center bg-primary/10',
        'h-[160px] w-[160px] rounded-full border-2 border-dark/40',
      )}
    >
      <Spin />
      <div
        className={cn(
          'relative flex items-center justify-center bg-primary/10',
          'h-[120px] w-[120px] rounded-full border-2 border-dark/60',
        )}
      >
        <Spin className="before:rotate-90 after:-rotate-90" />
        <div
          className={cn(
            'relative h-[80px] w-[80px] rounded-full border-2 border-dark/30',
            'flex items-center justify-center overflow-hidden bg-primary/20 shadow-inner',
            'after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0',
            'after:block after:rounded-full after:border-2 after:border-dark after:content-[""]',
          )}
        >
          <div
            style={{
              backgroundImage: `url(${logo})`,
            }}
            className="h-[50px] w-[50px] animate-pulse rounded-full bg-contain bg-center"
          />
        </div>
      </div>
    </div>
  </div>
);

export default AwesomeLoading;
