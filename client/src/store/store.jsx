import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./reducers/studentReducer";
import internshipReducer from "./reducers/internshipReducer";
import jobReducer from "./reducers/jobReducer";
import employeeReducer from "./reducers/employeeReducer";
import appReducer from "./reducers/appReducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    student: studentReducer,
    employee: employeeReducer,
    internship: internshipReducer,
    job: jobReducer,
  },
});
