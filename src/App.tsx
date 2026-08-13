import { HashRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material';
import Compose from '@/stories/ComposeProvider';
import AppRoutes from '@/routes';
import { themeOptions } from '@/theme';
import { store } from '@/store';
import { isDev } from './utils/constant';
import '@/styles.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <Compose
    components={[
      [QueryClientProvider, { client: queryClient }],
      [ThemeProvider, { theme: themeOptions }],
      [ReduxProvider, { store }],
      // Always HashRouter: this build has no live backend or server-side
      // routing (static portfolio demo hosted on GitHub Pages).
      [HashRouter],
    ]}
  >
    <AppRoutes />
    {isDev && <ReactQueryDevtools />}
  </Compose>
);

export default App;
