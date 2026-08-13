import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '@mui/material';
import notFoundImg from '@/assets/not-found.webp';

const NotFound = () => (
  <div
    className={cn(
      'h-[calc(100vh-52px)] w-full',
      'flex flex-col items-center justify-center',
    )}
  >
    <img className="w-[400px]" src={notFoundImg} alt="404" />
    <p className="py-4 text-lg text-primary">页面找不到了~</p>
    <Link to="/">
      <Button variant="contained">返回首页</Button>
    </Link>
  </div>
);

export default NotFound;
