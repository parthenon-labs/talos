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
    <p className="py-4 text-lg text-primary">Page not found</p>
    <Link to="/">
      <Button variant="contained">Back to home</Button>
    </Link>
  </div>
);

export default NotFound;
