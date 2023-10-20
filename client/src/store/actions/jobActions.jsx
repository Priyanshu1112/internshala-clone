import axios from "../../utils/Axios";
import {
  addJob,
  addJobs,
  addLatestJob,
  clearJob,
  clearJobs,
  clearLatestJob,
} from "../reducers/jobReducer";

export const getLatestJobs = () => async (dispatch) => {
  try {
    dispatch(clearLatestJob());
    const { data } = await axios.get(`/latestJobs?limit=10`);
    dispatch(addLatestJob(data.latestJobs));
  } catch (error) {
    return error.message;
  }
};

export const asyncGetJobs = () => async (dispatch) => {
  try {
    dispatch(clearJobs());
    const { data } = await axios.get(`/latestJobs`);
    dispatch(addJobs(data.latestJobs));
  } catch (err) {
    return err.response.status;
  }
};

export const asyncGetJob = (id) => async (dispatch) => {
  try {
    dispatch(clearJob());
    const { data } = await axios.get(`/employee/job/read/${id}`);
    console.log(data);
    dispatch(addJob(data.job));
  } catch (err) {
    return err.response.status;
  }
};
