import axios from "../../utils/Axios";
import {
  removeAuthenticated,
  setAuthenticated,
  updateResume,
  updateUserAvatar,
} from "../reducers/appReducer";
import {
  addAppliedInternship,
  addAppliedJob,
  addStudent,
  clearAppliedInternship,
  clearAppliedJob,
  isErrorStudent,
  removeErrorStudent,
  removeStudent,
  updateAvatarStudent,
  updateResumeStudent,
} from "../reducers/studentReducer";

export const asyncStudendSignup = (student) => async (dispatch) => {
  try {
    // console.log(student);
    dispatch(removeErrorStudent());
    const { data } = await axios.post("/student/signup", student);
    console.log(data);
    dispatch(addStudent(data.user));
    dispatch(
      setAuthenticated({
        authenticate: true,
        userRole: "student",
        user: data.user,
      })
    );
  } catch (error) {
    // console.log(error.response.data.message);
    if (error.response.status === 409) {
      dispatch(isErrorStudent({ email: error.response.data.message }));
    }
  }
};

export const asyncStudentSignIn = (student) => async (dispatch) => {
  try {
    dispatch(removeErrorStudent());
    const { data } = await axios.post("/student/signin", student);
    // console.log(data.user);
    dispatch(addStudent(data.user));
    dispatch(
      setAuthenticated({
        authenticate: true,
        userRole: "student",
        user: data.user,
      })
    );
  } catch (error) {
    if (error.response.status === 404) {
      dispatch(isErrorStudent({ email: error.response.data.message }));
    } else if (error.response.status === 500) {
      dispatch(isErrorStudent({ password: error.response.data.message }));
    }
    console.log(error);
  }
};

export const asyncStudentSignOut = () => async (dispatch) => {
  try {
    const data = await axios.get("/student/signout");
    // console.log(data);
    if (data.status === 200) {
      dispatch(removeStudent());
      dispatch(removeAuthenticated());
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncUpdateStudent = (student) => async (dispatch) => {
  try {
    // console.log(student);
    const { data } = await axios.post("/student/update", student);

    console.log(data.student);
    dispatch(addStudent(data.student));

    dispatch(
      setAuthenticated({
        authenticate: true,
        userRole: "student",
        user: data.student,
      })
    );
    // console.log(res.status);
    return data.success;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncUploadProfileStudent = (avatar) => async (dispatch) => {
  try {
    const res = await axios.post("/student/avatar", avatar);
    // console.log("res.status = " + res.status);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateAvatarStudent(res.data.avatar));
      dispatch(updateUserAvatar(res.data.avatar));
      // console.log("res.status = " + res.status);
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncAddEducation = (education) => async (dispatch) => {
  try {
    const res = await axios.post("/resume/add-edu", education);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncEditEducation = (education) => async (dispatch) => {
  try {
    console.log(education);
    const res = await axios.post(`/resume/edit-edu/${education.id}`, education);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncDeleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/resume/delete-edu/${id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncAddJob = (job) => async (dispatch) => {
  try {
    const res = await axios.post("/resume/add-job", job);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncEditJob = (job) => async (dispatch) => {
  try {
    const res = await axios.post(`/resume/edit-job/${job.id}`, job);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncDeleteJob = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/resume/delete-job/${id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncAddInternship = (internship) => async (dispatch) => {
  try {
    const res = await axios.post("/resume/add-internship", internship);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncEditInternship = (internship) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/resume/edit-internship/${internship.id}`,
      internship
    );
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncDeleteInternship = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/resume/delete-internship/${id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncApplyInternship = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const res = await axios.post(`/student/apply/internship/${id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncApplyJob = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const res = await axios.post(`/student/apply/job/${id}`);
    console.log(res);
    if (res.status === 200) {
      dispatch(updateResume(res.data.resume));
      dispatch(updateResumeStudent(res.data.resume));
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncResetPassword = (newPassword) => async (dispatch) => {
  try {
    const password = newPassword;
    const res = await axios.post("/student/reset-password", password);
    console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncDeleteStudent = () => async (dispatch) => {
  try {
    const res = await axios.delete("student/delete-account");
    console.log(res);
    dispatch(removeAuthenticated());
    dispatch(removeStudent());
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncSendMail = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/student/send-mail", data);
    console.log(res);
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncForgetPassword = (data) => async (dispatch) => {
  try {
    // console.log(data);
    const res = await axios.post(`/student/forget-link/${data.id}`, data);
    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncStudentInternships = () => async (dispatch) => {
  try {
    dispatch(clearAppliedInternship());
    const res = await axios.get("/student/applied/internships");
    // console.log(res);
    if (res.status == 200) {
      dispatch(addAppliedInternship(res.data.internships));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};

export const asyncStudentJobs = () => async (dispatch) => {
  try {
    dispatch(clearAppliedJob());
    const res = await axios.get("/student/applied/jobs");
    // console.log(res);
    if (res.status == 200) {
      dispatch(addAppliedJob(res.data.jobs));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 401) {
      dispatch(removeAuthenticated());
      dispatch(removeStudent());
      return 401;
    }
  }
};
