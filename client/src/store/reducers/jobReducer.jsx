import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestJob: null,
  jobs: null,
  job: null,
};

export const jobReducer = createSlice({
  name: "job",
  initialState,
  reducers: {
    addLatestJob: (state, action) => {
      state.latestJob = action.payload;
    },
    clearLatestJob: (state) => {
      state.latestJob = [];
    },
    addJobs: (state, action) => {
      state.jobs = action.payload;
    },
    clearJobs: (state) => {
      state.jobs = null;
    },
    addJob: (state, action) => {
      state.job = action.payload;
    },
    clearJob: (state) => {
      state.job = null;
    },
  },
});

export const {
  addLatestJob,
  clearLatestJob,
  addJobs,
  clearJobs,
  addJob,
  clearJob,
} = jobReducer.actions;

export default jobReducer.reducer;
