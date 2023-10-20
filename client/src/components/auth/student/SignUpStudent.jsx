import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncStudendSignup } from "../../../store/actions/studentActions";
import { Link } from "react-router-dom";

const SignUpStudent = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.student);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    city: "",
    gender: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    city: "",
    gender: "",
  });
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const resetErrors = () => {
    setError({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contact: "",
      city: "",
      gender: "",
    });
    // console.log("reset errors");
  };

  const validateForm = (e) => {
    e.preventDefault();
    // console.log("validator called");
    resetErrors();

    if (formData.firstName === "") {
      setError({ firstName: "First Name is required" });
      return;
    }
    if (formData.firstName.length < 4) {
      setError({
        firstName: "First Name must be at least 4 characters",
      });
      return;
    }

    if (formData.lastName === "") {
      setError({ lastName: "Last Name is required" });
      return;
    }
    if (formData.lastName.length < 4) {
      setError({
        lastName: "Last Name must be at least 4 characters",
      });
      return;
    }

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

    if (formData.contact === "") {
      setError({ contact: "Contact is required" });
      return;
    }
    if (formData.contact.length !== 10) {
      setError({ contact: "Contact must be exact 10 characters" });
      return;
    }

    if (formData.city === "") {
      setError({ city: "City is required" });
      return;
    }
    if (formData.city.length < 3) {
      setError({ city: "City must be atleast 3 characters" });
      return;
    }

    if (formData.gender === "") {
      setError({ gender: "Gender is required" });
      return;
    }

    SubmitForm();
  };

  useEffect(() => {
    setError(isError);
  }, [isError]);

  const SubmitForm = () => {
    // console.log(formData);
    dispatch(asyncStudendSignup(formData));
  };

  return (
    <div className="w-screen py-3 flex justify-center sm:w-[60%] sm:mx-auto">
      <form
        action=""
        onSubmit={validateForm}
        method="post"
        className="w-full px-4 "
      >
        <h1 className="text-xl font-bold mb-4">Sign-up and apply for free</h1>
        <div className="w-full flex justify-between mb-2">
          <div className="w-2/4 px-1 ">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="w-[90%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              style={{ borderColor: error.firstName ? "red" : "" }}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInput}
            />
            <small className="text-red-500 text-xs italic">
              {error.firstName}
            </small>
          </div>
          <div className="w-2/4 px-1 ">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-[90%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              style={{ borderColor: error.lastName ? "red" : "" }}
              name="lastName"
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInput}
            />
            <small className="text-red-500 text-xs italic">
              {error.lastName}
            </small>
          </div>
        </div>
        <div className="w-full px-2 mb-2 flex flex-col">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            style={{ borderColor: error.email ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="email"
            id="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.email}</small>
        </div>
        <div className="w-[95%] px-2 mb-2">
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
        <div className="w-full flex justify-between">
          <div className="w-1/3 px-2 mb-2">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              style={{ borderColor: error.contact ? "red" : "" }}
              className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="Number"
              name="contact"
              id="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleInput}
            />
          </div>
          <div className="w-1/3 px-2 mb-2">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="city"
            >
              City
            </label>
            <input
              style={{ borderColor: error.city ? "red" : "" }}
              className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="city"
              name="city"
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInput}
            />
          </div>
          <div className="w-1/3 px-2 mb-2">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInput}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <p
          className="text-center text-red-500 text-xs italic "
          style={{
            textAlign: error.contact
              ? "start"
              : error.city
              ? "center"
              : error.gender
              ? "end"
              : "",
          }}
        >
          {error.contact || error.city || error.gender}
        </p>
        <button className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded text-white font-bold mt-3">
          Sign up
        </button>
        <p className="text-center mt-4">
          Already registered?{" "}
          <Link className="text-sky-500" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpStudent;
