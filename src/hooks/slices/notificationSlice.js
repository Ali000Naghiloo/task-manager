import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updated: false
};

const boardSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationUpdated: (state, { payload }) => {
      state.updated = payload;
    }
  }
});

export const { setNotificationUpdated } = boardSlice.actions;
export default boardSlice.reducer;
