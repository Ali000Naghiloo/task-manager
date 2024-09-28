import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slices/homeSlice';
import MainSlice from './slices/main';
import boardSlice from './slices/boardSlice';
import notification from './slices/notificationSlice';

const rootReducer = {
  home: homeSlice,
  main: MainSlice,
  board: boardSlice,
  notification
};

export const store = configureStore({
  reducer: rootReducer
});
