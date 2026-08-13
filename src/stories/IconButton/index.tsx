import { IconButtonProps, IconButton as Button, styled } from '@mui/material';
import { themeOptions } from '@/theme';

const IconButton = styled(Button)({
  color: 'rgba(255,255,255,1)',
  backgroundColor: themeOptions.palette.primary.main,
  '&:hover': { backgroundColor: themeOptions.palette.primary.main },
});

const AppIconButton = ({ children, ...props }: IconButtonProps) => {
  return <IconButton {...props}>{children}</IconButton>;
};

export default AppIconButton;
