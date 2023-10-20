import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userRole: "",
  user: "",
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.authenticate;
      state.userRole = action.payload.userRole;
      state.user = action.payload.user;
    },
    updateUserAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
    removeAuthenticated: (state) => {
      state.isAuthenticated = false;
      state.userRole = "";
      state.user = "";
    },
    updateResume: (state, action) => {
      state.user.resume = action.payload;
    },
  },
});

export const {
  setAuthenticated,
  updateUserAvatar,
  removeAuthenticated,
  updateResume,
} = appReducer.actions;

export default appReducer.reducer;
