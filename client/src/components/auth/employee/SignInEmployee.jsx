import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncEmployeeSignIn } from "../../../store/actions/employeeActions";

const SignInEmployee = () => {
  const { isError } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    setError(isError);
  }, [isError]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };
  const resetErrors = () => {
    setError({
      email: "",
      password: "",
    });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    resetErrors();

    if (formData.email === "") {
      setError({ email: "Email is required" });
      return;
    }
    if (!emailPattern.test(formData.email)) {
      // console.log("email invalid");
      setError({ email: "Please fill a valid email address" });
      return;
    }

    if (formData.password === "") {
      setError({ password: "Password is required" });
      return;
    }
    if (formData.password.length < 6 || formData.password.length > 15) {
      setError({
        password: "Password must be between 6 to 15 characters",
      });
      return;
    }
    SubmitForm();
  };

  const SubmitForm = () => {
    // console.log(formData);
    dispatch(asyncEmployeeSignIn(formData));
  };
  return (
    <div className="w-full px-2 sm:w-[60%] sm:mx-auto">
      <form method="post" onSubmit={ValidateForm}>
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold "
            htmlFor="Email"
          >
            Email
          </label>
          <input
            style={{ borderColor: error.email ? "red" : "" }}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="email"
            id="email"
            placeholder="employee@example.com"
            value={formData.email}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.email}</small>
        </div>
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            style={{ borderColor: error.password ? "red" : "" }}
            className="w-full mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="password"
            name="password"
            id="password"
            placeholder="Must be atleast 6 characters"
            value={formData.password}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">
            {error.password}
          </small>
        </div>
        <p
          className="text-end text-sky-500 text-fs-1 mt-4 pe-2 sm:text-sm"
          onClick={() => {
            navigate("/forget-password");
          }}
        >
          Forgot password?
        </p>
        <button className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded text-white font-bold mt-3">
          Login
        </button>
        <p className="text-center mt-4">
          New to Internshala? Register{" "}
          <Link className="text-sky-500" to={"/registerEmployee"}>
            Employee
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInEmployee;
