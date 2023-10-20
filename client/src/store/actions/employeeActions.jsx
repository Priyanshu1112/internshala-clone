import axios from "../../utils/Axios";
import { removeAuthenticated, setAuthenticated } from "../reducers/appReducer";
import {
  addEmployee,
  isErrorEmployee,
  removeEmployee,
  removeErrorEmployee,
} from "../reducers/employeeReducer";
import {
  addInternships,
  clearInternships,
} from "../reducers/internshipReducer";
import { addJobs } from "../reducers/jobReducer";
import { asyncCurrentUser } from "./appActions";

export const asyncEmployeeSignup = (employee) => async (dispatch) => {
  try {
    console.log(employee);
    dispatch(removeErrorEmployee());
    const { data } = await axios.post("/employee/signup", employee);
    dispatch(addEmployee(data.user));
    dispatch(
      setAuthenticated({
        authenticate: true,
        userRole: "employee",
        user: data.user,
      })
    );
  } catch (error) {
    // console.log(error.response.data.message);
    if (error.response.status === 409) {
      dispatch(isErrorEmployee({ email: error.response.data.message }));
    }
  }
};

export const asyncEmployeeSignIn = (employee) => async (dispatch) => {
  try {
    dispatch(removeErrorEmployee());
    const { data } = await axios.post("/employee/signin", employee);
    console.log(data.user);
    dispatch(addEmployee(data.user));
    dispatch(
      setAuthenticated({
        authenticate: true,
        userRole: "employee",
        user: data.user,
      })
    );
  } catch (error) {
    if (error.response.status === 404) {
      dispatch(isErrorEmployee({ email: error.response.data.message }));
    } else if (error.response.status === 500) {
      dispatch(isErrorEmployee({ password: error.response.data.message }));
    }
    console.log(error);
  }
};

export const asyncEmployeeSignOut = () => async (dispatch) => {
  try {
    const data = await axios.get("/employee/signout");
    // console.log(data);
    if (data.status === 200) {
      dispatch(removeEmployee());
      dispatch(removeAuthenticated());
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncResetPasswordEmployee = (newPassword) => async (dispatch) => {
  try {
    const password = newPassword;
    const res = await axios.post("/employee/reset-password", password);
    // console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeEmployee());
      return 401;
    }
  }
};

export const asyncDeleteStudentEmployee = () => async (dispatch) => {
  try {
    const res = await axios.delete("student/delete-account");
    console.log(res);
    dispatch(removeAuthenticated());
    dispatch(removeEmployee());
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeEmployee());
      return 401;
    }
  }
};

export const asyncCreateInternship = (internship) => async (dispatch) => {
  try {
    const res = await axios.post("/employee/internship/create", internship);
    if (res.status == 200) {
      asyncCurrentUser();
      return res.status;
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeEmployee());
      return 401;
    }
  }
};

export const asyncCreateJob = (job) => async (dispatch) => {
  try {
    const res = await axios.post("/employee/job/create", job);
    if (res.status == 200) {
      asyncCurrentUser();
      return res.status;
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeEmployee());
      return 401;
    }
  }
};

export const asyncInternshipApplications = () => async (dispatch) => {
  try {
    dispatch(clearInternships());
    const res = await axios.get(`/employee/internship/read`);
    if (res.status == 200) {
      dispatch(addInternships(res.data.internships));
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeEmployee());
      return 401;
    }
  }
};

export const asyncJobApplications = () => async (dispatch) => {
  try {
    dispatch(clearInternships());
    const res = await axios.get(`/employee/job/read`);
    if (res.status == 200) {
      dispatch(addJobs(res.data.jobs));
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeEmployee());
      return 401;
    }
  }
};
