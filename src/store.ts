import { configureStore } from '@reduxjs/toolkit';
import editReducer from '@/pages/Edit/store';
import { isDev } from '@/utils/constant';

export const store = configureStore({
  reducer: {
    edit: editReducer,
  },
  devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
