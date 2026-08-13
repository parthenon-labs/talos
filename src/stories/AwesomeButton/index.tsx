import cn from 'classnames';

export interface AwesomeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮文字
   */
  children: React.ReactNode;
  /**
   * className
   */
  className?: string;
  /**
   * 按钮点击事件
   */
  onClick?: () => void;

  /**
   * 按钮背景是否透明
   */
  opacity?: boolean;
}

const AwesomeButton = ({
  children,
  onClick,
  className,
  opacity = true,
  ...props
}: AwesomeButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'relative py-1.5 px-2 hover:after:bg-[rgba(0,0,0,0.7)]',
      'z-0 text-sm text-white transition-all duration-300 ease-in-out',

      opacity ? 'after:bg-[rgba(0,0,0,0.4)]' : 'after:bg-black',
      'after:absolute after:left-0 after:top-0 after:z-[-1] after:h-full after:w-full',
      'after:transition-all after:duration-150 after:ease-in-out',

      "before:absolute before:top-[-2px] before:left-[-2px] before:content-['']",
      'before:h-[calc(100%+4px)] before:w-[calc(100%+4px)]',
      'before:z-[-1] before:bg-awesomeButton before:bg-[length:400%] before:blur-sm',
      'before:animate-awesome-button',
      'hover:before:h-[calc(100%+10px)] hover:before:w-[calc(100%+10px)]',
      'hover:before:top-[-5px] hover:before:left-[-5px]',
      'before:transition-all before:duration-300 before:ease-in-out',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default AwesomeButton;
