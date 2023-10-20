import { setAuthenticated } from "../reducers/appReducer";
import { addEmployee, removeErrorEmployee } from "../reducers/employeeReducer";
import { addStudent, removeErrorStudent } from "../reducers/studentReducer";
import axios from "../../utils/Axios";

export const asyncCurrentUser = () => async (dispatch) => {
  try {
    dispatch(removeErrorStudent());
    dispatch(removeErrorEmployee());
    axios
      .get("/currentUser")
      .then(({ data }) => {
        // console.log(data);
        if (data.role === "student") {
          dispatch(addStudent(data.student));
          dispatch(
            setAuthenticated({
              authenticate: true,
              userRole: "student",
              user: data.student,
            })
          );
        } else if (data.role === "employee") {
          dispatch(addEmployee(data.employee));
          dispatch(
            setAuthenticated({
              authenticate: true,
              userRole: "employee",
              user: data.employee,
            })
          );
        }
      })
      .catch((err) => {
        return err.response.status;
      });
    // console.log(data);
  } catch (err) {
    // console.log(err.response.status);
    console.log(err);
  }
};
