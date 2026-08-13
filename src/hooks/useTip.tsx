import { useState } from 'react';

import { Snackbar, Alert } from '@mui/material';

interface Tip {
  status: boolean;
  msg: string;
}
interface OutTip {
  setOpen: Function;
  Tip: React.ReactNode;
}
export const useTip = (openInfo: Tip): OutTip => {
  const [info, setOpen] = useState<Tip>(openInfo);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ status: false, msg: '' });
  };
  const Tip = (
    <Snackbar
      open={info.status}
      autoHideDuration={2000}
      message={info.msg}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">{info.msg}</Alert>
    </Snackbar>
  );

  return {
    Tip,
    setOpen,
  };
};
