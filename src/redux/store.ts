import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './slices/typingSlice';

export const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
