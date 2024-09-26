import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  messageModal: { title: '', show: false },
  showToast: { title: '', bg: '', show: false },
  showQuestionModal: { show: false, answer: false },
  allUsers: {},
  showLoading: { btnName: '', value: false },
  allEnums: {},
  deleteModal: { value: false, name: '', answer: '', title: '' }
};

const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    RsetMessageModal: (state, actions) => {
      return { ...state, messageModal: actions.payload };
    },
    RsetShowLoading: (state, actions) => {
      return { ...state, showLoading: actions.payload };
    },
    RsetAllUsers: (state, actions) => {
      return { ...state, allUsers: actions.payload };
    },
    RsetAllEnums: (state, { payload }) => {
      return { ...state, allEnums: payload };
    },
    RsetProjPriorty: (state, { payload }) => {
      return { ...state, projPriorty: payload };
    },
    RsetProjStatus: (state, { payload }) => {
      return { ...state, projStatus: payload };
    },
    RsetProjType: (state, { payload }) => {
      return { ...state, projType: payload };
    },
    RsetProjRole: (state, { payload }) => {
      return { ...state, projRole: payload };
    },
    RsetUserRole: (state, { payload }) => {
      return { ...state, userRole: payload };
    },
    RsetShowToast: (state, { payload }) => {
      return { ...state, showToast: payload };
    },
    RsetDeleteModal: (state, { payload }) => {
      return { ...state, deleteModal: payload };
    }
  }
});

export const {
  RsetProjPriorty,
  RsetMessageModal,
  RsetProjType,
  RsetProjStatus,
  RsetAllEnums,
  RsetFromDate,
  RsetShowLoading,
  RsetAllUsers,
  RsetProjRole,
  RsetUserRole,
  RsetDeleteModal,
  RsetShowToast
} = MainSlice.actions;
export default MainSlice.reducer;
