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
   * true (default): solid primary button. false: outlined secondary button.
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
      'min-w-[110px] whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold',
      'transition-all duration-200 ease-in-out',
      opacity
        ? 'bg-primary text-white shadow-primary hover:bg-[#1E6FE8]'
        : 'border border-primary bg-white text-primary hover:bg-light',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default AwesomeButton;
