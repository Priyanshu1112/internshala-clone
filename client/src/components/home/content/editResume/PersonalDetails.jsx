import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncUpdateStudent,
  asyncUploadProfileStudent,
} from "../../../../store/actions/studentActions";
import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.student);
  const [avatar, setAvatar] = useState(student?.avatar.url);
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [formData, setFormData] = useState({
    firstName: student?.firstName,
    lastName: student?.lastName,
    email: student?.email,
    contact: student?.contact,
    city: student?.city,
    gender: student?.gender,
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(file); // Update avatar with the file object
      setSelectedImage(URL.createObjectURL(file)); // Update selectedImage with the URL
    }
    console.log(selectedImage);
  };

  const resetErrors = () => {
    setError({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      city: "",
      gender: "",
    });
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
    console.log(formData);

    SubmitForm();
  };

  const SubmitForm = async () => {
    if (avatar != student?.avatar.url) {
      const data = new FormData();
      data.set("avatar", avatar);
      dispatch(asyncUploadProfileStudent(data));
    }

    const success = await dispatch(asyncUpdateStudent(formData));

    if (success) {
      toast.success("Student updated successfully!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full px-2 mb-5 sm:w-[60vw] mx-auto">
      <p className="text-xl text-slate-800 my-4 font-bold text-center">
        Personal Details
      </p>
      <form onSubmit={validateForm} method="post" encType="multipart/form-data">
        <div className="w-full flex justify-between mb-2">
          <div className="w-2/4 px-1 ">
            <label
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
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
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
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
        <div className="mt-2">
          <p className="capitalize my-1 tracking-wide text-gray-700 text-xs font-bold">
            Profile Picture
          </p>
          {avatar ? (
            <span className="flex gap-2 bg-slate-200 max-w-max m-auto p-2 rounded">
              <img
                className="w-[50vw] sm:w-[30vw] rounded"
                src={selectedImage}
                alt=""
              />
              <i className="ri-close-line text-lg"></i>
            </span>
          ) : (
            ""
          )}
        </div>
        <button
          type="button"
          className="w-[95%] bg-sky-100 py-2 rounded my-2 text-sky-500 font-bold border-2 border-sky-300 border-dashed"
          onClick={() => {
            document.getElementById("profilePicture").click();
          }}
        >
          <i className="ri-upload-2-fill"></i> Upload picture
        </button>
        <input
          name="avatar"
          type="file"
          id="profilePicture"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="w-full px-2 flex flex-col">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            disabled
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
          <p
            className="text-sm text-sky-500 text-end w-[95%] mt-1"
            onClick={() => {
              console.log("change email");
            }}
          >
            Change email
          </p>
        </div>
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="contact"
          >
            Contact
          </label>
          <input
            style={{ borderColor: error.contact ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="number"
            name="contact"
            id="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.contact}</small>
        </div>
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="city"
          >
            Current City
          </label>
          <input
            style={{ borderColor: error.city ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="city"
            id="city"
            placeholder="city"
            value={formData.city}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.city}</small>
        </div>
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
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
          <small className="text-red-500 text-xs italic">{error.gender}</small>
        </div>
        <button className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded text-white font-bold mt-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
