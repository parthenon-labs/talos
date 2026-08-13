import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useLogin } from '../common/login';

export const ModalLogin = () => {
  const [open, setOpen] = useState(true);
  const login = useLogin('down');

  const handleClose = () => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  return pathname === '/login' ? null : (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>主人请登录，便于您下次快速找到我</DialogTitle>
        <DialogContent style={{ width: '400px' }}>{login}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>再看看</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
