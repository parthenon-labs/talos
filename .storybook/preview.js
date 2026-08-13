import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { themeOptions } from '@/theme';
import { queryClient } from '@/App';
import '@/styles.css';

addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>
    <ThemeProvider theme={themeOptions}>
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    </ThemeProvider>
  </MemoryRouter>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    // inlineStories: false,
  },
  darkMode: {
    classTarget: 'html',
    stylePreview: true,
  },
};
