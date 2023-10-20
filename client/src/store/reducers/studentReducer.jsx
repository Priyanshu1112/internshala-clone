import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
  isError: {},
  isAuthenticated: false,
  appliedInternship: null,
  appliedJob: null,
};

export const studentReducer = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.student = action.payload;
      state.isAuthenticated = true;
    },
    removeStudent: (state) => {
      state.student = null;
      state.isAuthenticated = false;
      state.isError = {};
    },
    isErrorStudent: (state, action) => {
      state.isError = { ...state.isError, ...action.payload };
    },
    removeErrorStudent: (state) => {
      state.isError = {};
    },
    updateAvatarStudent: (state, action) => {
      state.student.avatar = action.payload;
    },
    updateResumeStudent: (state, action) => {
      state.student.resume = action.payload;
    },
    addAppliedInternship: (state, action) => {
      state.appliedInternship = action.payload;
    },
    clearAppliedInternship: (state) => {
      state.appliedInternship = null;
    },
    addAppliedJob: (state, action) => {
      state.appliedJob = action.payload;
    },
    clearAppliedJob: (state) => {
      state.appliedJob = null;
    },
  },
});

export const {
  addStudent,
  removeStudent,
  isErrorStudent,
  removeErrorStudent,
  updateAvatarStudent,
  updateResumeStudent,
  addAppliedInternship,
  clearAppliedInternship,
  addAppliedJob,
  clearAppliedJob,
} = studentReducer.actions;

export default studentReducer.reducer;
