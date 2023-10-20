import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { asyncAddJob } from "../../../../store/actions/studentActions";

const AddJob = () => {
  // console.log(edit);
  const dispatch = useDispatch();

  const [descChar, setDescChar] = useState(0);
  const [formData, setFormData] = useState({
    designation: "",
    profile: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [error, setError] = useState({
    designation: "",
    profile: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setDescChar(formData.description.length);
  }, [formData.description]);

  const handleCheckBox = (e) => {
    // console.log(e.target.checked);
    if (e.target.checked) {
      setFormData({ ...formData, location: "Work From Home" });
    } else {
      setFormData({ ...formData, location: "" });
    }
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({});

    if (formData.designation === "") {
      setError({ designation: "Designation is needed" });
      return;
    }
    if (formData.profile === "") {
      setError({ profile: "Profile is needed" });
      return;
    }
    if (formData.organization === "") {
      setError({ organization: "Organization cannot be empty" });
      return;
    }
    if (formData.location === "") {
      setError({ location: "Location cannot be empty" });
      return;
    }
    if (formData.startDate === "") {
      setError({ startDate: "Start Date cannot be empty" });
      return;
    }

    if (formData.endDate === "") {
      setError({ endDate: "End Date cannot be empty" });
      return;
    }
    if (descChar > 250) {
      setError({ description: "Description cannot be more than 250 chars" });
      return;
    }
    SubmitForm();
  };

  const SubmitForm = () => {
    console.log(formData);
    dispatch(asyncAddJob(formData));
  };

  return (
    <div className="px-2 mb-[5vh] sm:w-[60vw] mx-auto">
      <div>
        <p className="text-lg text-slate-800 my-4 font-bold text-center">
          Add Job
        </p>
      </div>
      <form method="post" onSubmit={ValidateForm}>
        {/* DSEGNATION*/}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="designation"
          >
            designation
          </label>
          <input
            style={{ borderColor: error.designation ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="designation"
            id="designation"
            placeholder="eg. Software Engineer"
            value={formData.designation}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">
            {error.designation}
          </small>
        </div>
        {/* PROFILE */}
        <div className="w-full px-2 mb-2 flex flex-col">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="profile"
          >
            profile
          </label>
          <input
            style={{ borderColor: error.profile ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="profile"
            id="profile"
            placeholder="eg. Operations"
            value={formData.profile}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.profile}</small>
        </div>
        {/* ORGANIZATION */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="organization"
          >
            organization
          </label>
          <input
            style={{ borderColor: error.organization ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="organization"
            id="organization"
            placeholder="eg. Internshala"
            value={formData.organization}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">
            {error.organization}
          </small>
        </div>
        {/* LOCATION */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="location"
          >
            location
          </label>
          <input
            style={{ borderColor: error.location ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="location"
            id="location"
            placeholder="eg. Mumbai"
            value={formData.location}
            onChange={handleInput}
          />
          <div className="flex gap-2 items-center mt-1">
            <input type="checkbox" onClick={handleCheckBox} id="workFromHome" />{" "}
            <label
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="workFromHome"
            >
              Is Work From Home
            </label>
          </div>
          <small className="text-red-500 text-xs italic">
            {error.location}
          </small>
        </div>
        {/* DATE */}
        <div className="w-full flex justify-between mb-2">
          <div className="w-2/4 px-1 ">
            <label
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="startDate"
            >
              Start Date
            </label>

            <DatePicker
              className="w-[90%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              id="startDate"
              name="startDate"
              selected={formData.startDate}
              onChange={(date) => {
                setFormData({ ...formData, startDate: date });
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Choose date"
            />
          </div>
          <div className="w-2/4 px-1 ">
            <label
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="endDate"
            >
              end Date
            </label>

            {formData.endDate !== "Present" ? (
              <DatePicker
                className="w-[90%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
                id="endDate"
                name="endDate"
                selected={formData.endDate}
                onChange={(date) => {
                  setFormData({ ...formData, endDate: date });
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="Choose date"
              />
            ) : (
              <input
                className="w-[90%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                disabled
              />
            )}

            <div className="flex gap-2 items-center mt-1">
              <input
                type="checkbox"
                onClick={(e) => {
                  if (e.target.checked) {
                    setFormData({ ...formData, endDate: "Present" });
                  } else {
                    setFormData({ ...formData, endDate: "" });
                  }
                }}
                id="currentlyWorking"
              />{" "}
              <label
                className="capitalize tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="currentlyWorking"
              >
                currently working here
              </label>
            </div>
          </div>
        </div>
        <p className="text-red-500 text-xs italic text-center">
          {error.startDate || error.endDate}
        </p>
        {/* DESCRIPTION */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="description"
          >
            description (Optional)
          </label>
          <textarea
            rows={5}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type=""
            name="description"
            id="description"
            placeholder="Short description of the work done (max 250 chars)"
            value={formData.description}
            onChange={handleInput}
          />
          <p className="text-slate-500 text-xs text-end w-[95%]">
            {descChar}/250
          </p>
          <small className="text-red-500 text-xs italic">
            {error.description}
          </small>
        </div>

        <button className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded text-white font-bold mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddJob;
