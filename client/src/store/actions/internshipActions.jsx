import {
  addInternship,
  addInternships,
  addLatestInternship,
  clearInternship,
  clearInternships,
  clearLatestInternship,
} from "../reducers/internshipReducer";
import axios from "../../utils/Axios";

export const getLatestInternships = () => async (dispatch) => {
  try {
    dispatch(clearLatestInternship());
    const { data } = await axios.get(`/latestInternships?limit=10`);
    dispatch(addLatestInternship(data.latestInternships));
  } catch (err) {
    return err.response.status;
  }
};

export const asyncGetInternships = () => async (dispatch) => {
  try {
    dispatch(clearInternships());
    const { data } = await axios.get(`/latestInternships`);
    dispatch(addInternships(data.latestInternships));
  } catch (err) {
    return err.response.status;
  }
};

export const asyncGetInternship = (id) => async (dispatch) => {
  try {
    dispatch(clearInternship());
    const { data } = await axios.get(`/employee/internship/read/${id}`);
    dispatch(addInternship(data.internship));
  } catch (err) {
    return err.response.status;
  }
};
