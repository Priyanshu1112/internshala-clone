import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: null,
  isError: {},
  isAuthenticated: false,
};

export const employeeReducer = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employee = action.payload;
      state.isAuthenticated = true;
    },
    removeEmployee: (state) => {
      state.employee = null;
      state.isAuthenticated = false;
      state.isError = {};
    },
    isErrorEmployee: (state, action) => {
      state.isError = { ...state.isError, ...action.payload };
    },
    removeErrorEmployee: (state) => {
      state.isError = {};
    },
    updateLogo: (state, action) => {
      state.employee = action.payload;
    },
  },
});

export const {
  addEmployee,
  removeEmployee,
  isErrorEmployee,
  removeErrorEmployee,
} = employeeReducer.actions;

export default employeeReducer.reducer;
