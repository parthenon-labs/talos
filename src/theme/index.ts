import { createTheme } from '@mui/material';

// Keep in sync with the `fontFamily.sans` override in tailwind.config.js —
// MUI components (buttons, tooltips, menus) don't inherit Tailwind's base
// font stack, so without this they fall back to MUI's default
// Roboto/Helvetica/Arial and visibly mismatch every Tailwind-styled element
// next to them.
export const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',');

export const themeOptions = createTheme({
  palette: {
    primary: {
      main: '#297EFF',
    },
    secondary: {
      main: '#f50057',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily,
    button: {
      // MUI's default all-caps buttons ("RUN", "BLOCKS") read as a dated
      // Material Design default rather than a deliberate choice.
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        contained: {
          boxShadow: '0 2px 10px rgba(41, 126, 255, 0.28)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(41, 126, 255, 0.36)',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
  },
});
