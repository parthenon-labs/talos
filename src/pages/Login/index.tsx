import cn from 'classnames';
import { useLogin } from './common/login';

export default function Index() {
  const login = useLogin();
  return (
    <div
      className={cn(
        `flex h-full items-center justify-center`,
        `bg-opacity-100 bg-cover bg-center`,
      )}
    >
      {login}
    </div>
  );
}
