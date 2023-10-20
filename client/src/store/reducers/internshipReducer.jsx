import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestInternship: [],
  internships: null,
  internship: null,
};

export const internshipReducer = createSlice({
  name: "internship",
  initialState,
  reducers: {
    addLatestInternship: (state, action) => {
      state.latestInternship.push(action.payload);
    },
    clearLatestInternship: (state) => {
      state.latestInternship = [];
    },
    addInternships: (state, action) => {
      state.internships = action.payload;
    },
    clearInternships: (state) => {
      state.internships = null;
    },
    addInternship: (state, action) => {
      state.internship = action.payload;
    },
    clearInternship: (state) => {
      state.internship = null;
    },
  },
});

export const {
  addLatestInternship,
  clearLatestInternship,
  addInternships,
  clearInternships,
  addInternship,
  clearInternship,
} = internshipReducer.actions;

export default internshipReducer.reducer;
