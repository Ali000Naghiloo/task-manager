import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "homeSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

//  -> Slice overtime
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // RsetFormErrors: (state, { payload }) => {
    //     return { ...state, formErrors: payload };
    // },
  }
});

export const { RsetFromDate } = homeSlice.actions;
export default homeSlice.reducer;
