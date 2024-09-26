import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slices/homeSlice';
import MainSlice from './slices/main';
import boardSlice from './slices/boardSlice';

const rootReducer = {
  home: homeSlice,
  main: MainSlice,
  board: boardSlice
};

export const store = configureStore({
  reducer: rootReducer
});
