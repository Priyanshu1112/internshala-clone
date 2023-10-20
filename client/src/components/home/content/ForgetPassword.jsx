import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { asyncSendMail } from "../../../store/actions/studentActions";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (email.length == 0) {
      setError("Email is required");
      return;
    }
    if (!emailPattern.test(email)) {
      // console.log("email invalid");
      setError("Please fill a valid email address");
      return;
    }
    const formData = new FormData();
    formData.set("email", email);
    formData.set(
      "url",
      `${window.location.protocol}//${window.location.host}/student/forget-link/`
    );

    // console.log(
    //   `${window.location.protocol}://${window.location.host}/student/forget-link/`
    // );
    dispatch(asyncSendMail(formData)).then((status) => {
      if (status == 200) {
        // navigate("/");
        setSuccess("Email sent successfully!!");
      }
    });
  };
  return (
    <div className="">
      <p className="text-center font-bold font-lg">Forget Password</p>
      <form className="w-full px-2" method="post" onSubmit={ValidateForm}>
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            style={{ borderColor: error ? "red" : success ? "green" : "" }}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="email"
            id="email"
            placeholder="john@example.com"
            value={email}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error}</small>
          <small className="text-green-800 text-xs italic">{success}</small>
        </div>
        <button className="text-white bg-sky-500 w-[90%] rounded ms-[5%] py-1 mt-1">
          Send Mail
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
