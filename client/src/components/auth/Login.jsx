import React, { useState } from "react";
import SignInStudent from "./student/SignInStudent";
import SignInEmployee from "./employee/SignInEmployee";

const Login = () => {
  const [showStudentSignIn, setShowStudentSignIn] = useState(true);

  const HandleStudentSignIn = () => {
    setShowStudentSignIn(!showStudentSignIn);
  };

  return (
    <div className="w-screen px-3 ">
      <div className="flex justify-center mb-3 text-fs-1 sm:text-md">
        <button
          className="px-4 py-2 mx-1 font-bold "
          style={
            showStudentSignIn
              ? { color: "#38BDF8", borderBottom: "2px solid #38BDF8" }
              : {}
          }
          onClick={HandleStudentSignIn}
        >
          Student{" "}
        </button>
        <button
          className="px-4 py-2 mx-1 font-bold "
          style={
            !showStudentSignIn
              ? { color: "#38BDF8", borderBottom: "2px solid #38BDF8" }
              : {}
          }
          onClick={HandleStudentSignIn}
        >
          Employee
        </button>
      </div>
      <div>{showStudentSignIn ? <SignInStudent /> : <SignInEmployee />}</div>
    </div>
  );
};

export default Login;
