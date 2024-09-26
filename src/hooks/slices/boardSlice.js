import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RsetShowLoading, RsetShowToast } from './main';
import { serGetBoards } from '../../services/masterServices';

const initialState = {
  shoModal: { show: false },
  fieldsEditProject: {},
  getAllBoard: [],
  itsBoard: [],
  boardMessage: {
    messages: [],
    inputText: ''
  }
};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "CreateSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

export const handleGetBoards = createAsyncThunk(
  'board/handleGetBoards',
  async (getIdProject, { dispatch }) => {
    dispatch(RsetGetAllBoard([]));
    dispatch(RsetShowLoading({ value: true }));
    if (!!getIdProject) {
      const resGetBoard = await serGetBoards(getIdProject);
      dispatch(RsetShowLoading({ value: false }));
      console.log(resGetBoard, getIdProject, 'Redux');
      if (resGetBoard?.data?.code === 1) {
        dispatch(RsetGetAllBoard(resGetBoard?.data?.data));
        const itsBoard = resGetBoard?.data?.data?.map((board) => {
          return board;
        });
        console.log(itsBoard);
        dispatch(RsetItsBoard(itsBoard));
      } else {
        dispatch(RsetGetAllBoard([]));
        dispatch(RsetShowToast({ show: true, title: resGetBoard?.data?.msg, bg: 'danger' }));
      }
    } else {
      dispatch(RsetGetAllBoard([]));
      dispatch(
        RsetShowToast({
          show: true,
          title: 'مشکلی در سرور پیش آمده است لطفا دوباره امتحان کنید',
          bg: 'danger'
        })
      );
    }
  }
);

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    RsetShowCreateModal: (state, { payload }) => {
      return { ...state, shoModal: payload };
    },
    RsetFieldsEditProject: (state, { payload }) => {
      return { ...state, fieldsEditProject: payload };
    },
    RsetGetAllBoard: (state, { payload }) => {
      return { ...state, getAllBoard: payload };
    },
    RsetItsBoard: (state, { payload }) => {
      return { ...state, itsBoard: payload };
    },
    RsetBoardMessage: (state, { payload }) => {
      return { ...state, boardMessage: payload };
    }
  }
});

export const {
  RsetShowCreateModal,
  RsetGetAllBoard,
  RsetFieldsEditProject,
  RsetItsBoard,
  RsetBoardMessage
} = boardSlice.actions;
export default boardSlice.reducer;
