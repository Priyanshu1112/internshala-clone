import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncDeleteStudent } from "../../../store/actions/studentActions";
import { asyncDeleteStudentEmployee } from "../../../store/actions/employeeActions";

const DeleteStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userRole } = useSelector((state) => state.app);
  const { student } = useSelector((state) => state.student);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    if (email.length == 0) {
      setError("Email is required");
      return;
    }
    if (!emailPattern.test(email)) {
      // console.log("email invalid");
      setError("Please fill a valid email address");
      return;
    }
    if (email !== student.email) {
      setError("Email does not match!");
      return;
    }
    setBtnClicked(true);
    if (userRole == "student") {
      dispatch(asyncDeleteStudent()).then((status) => {
        if (status == 200) {
          navigate("/");
        }
      });
    } else {
      dispatch(asyncDeleteStudentEmployee()).then((status) => {
        if (status == 200) {
          navigate("/");
        }
      });
    }
    setBtnClicked(false);
  };

  return (
    <div className="sm:w-[60vw] md:w-[30vw] mx-auto">
      <p className="text-center font-bold font-lg">Delete Account</p>
      <form className="w-full px-2" method="post" onSubmit={ValidateForm}>
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            style={{ borderColor: error ? "red" : "" }}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="email"
            id="email"
            placeholder={
              userRole == "student"
                ? "student@example.com"
                : "employee@example.com"
            }
            value={email}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error}</small>
        </div>
        <button
          disabled={btnClicked}
          className="text-white bg-sky-500 w-[90%] rounded ms-[5%] py-1 mt-1"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteStudent;
