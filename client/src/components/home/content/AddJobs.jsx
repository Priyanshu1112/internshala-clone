import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { asyncAddInternship } from "../../../store/actions/studentActions";
import { asyncCreateJob } from "../../../store/actions/employeeActions";
import { toast } from "react-toastify";

const AddJobs = () => {
  const [btnClicked, setbtnClicked] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    profile: "",
    skill: "",
    jobType: "",
    openings: "",

    description: "",
    preference: "",
    salary: "",
    perks: "",
    assessments: "",
  });
  const [error, setError] = useState({
    profile: "",
    skill: "",
    jobType: "",
    openings: "",
    description: "",
    preference: "",
    salary: "",
    perks: "",
    assessments: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetErrors = () => {
    setError({
      profile: "",
      skill: "",
      jobType: "",
      openings: "",
      description: "",
      preference: "",
      salary: "",
      perks: "",
      assessments: "",
    });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    resetErrors();

    if (formData.profile === "") {
      setError({ profile: "Profile is required" });
      return;
    }

    if (formData.skill === "") {
      setError({ skill: "Skill is required" });
      return;
    }

    if (formData.jobType === "") {
      setError({ jobType: "Internship type is required" });
      return;
    }

    if (formData.openings === "") {
      setError({ openings: "Openings is required" });
      return;
    }

    if (formData.description === "") {
      setError({ description: "description is required" });
      return;
    }

    if (formData.preference === "") {
      setError({ preference: "preference is required" });
      return;
    }

    if (formData.salary === "") {
      setError({ salary: "Salary is required" });
      return;
    }

    if (formData.perks === "") {
      setError({ perks: "Perks is required" });
      return;
    }

    if (formData.assessments === "") {
      setError({ assessments: "Assessments is required" });
      return;
    }

    // If no errors are found, you can proceed with form submission
    SubmitForm();
  };

  const SubmitForm = () => {
    console.log(formData);
    setbtnClicked(true);
    dispatch(asyncCreateJob(formData)).then((status) => {
      if (status == 200) {
        toast.success("Job created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    setbtnClicked(false);
  };

  return (
    <div className="sm:w-[60vw] mx-auto mb-5">
      <p className="text-center text-lg font-bold">Add Internship</p>
      <form method="post" onSubmit={ValidateForm}>
        {/* PROFILE */}
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="profile"
          >
            profile
          </label>
          <input
            style={{ borderColor: error.profile ? "red" : "" }}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="profile"
            id="profile"
            placeholder="eg. Software Developer"
            value={formData.profile}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.profile}</small>
        </div>
        {/* SKILL */}
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="skill"
          >
            skill
          </label>
          <input
            style={{ borderColor: error.skill ? "red" : "" }}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="skill"
            id="skill"
            placeholder="eg. MERN"
            value={formData.skill}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.skill}</small>
        </div>
        {/* JOB-TYPE */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="jobType"
            >
              job Type
            </label>
            <select
              className=" mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              name="jobType"
              id="jobType"
              value={formData.jobType}
              onChange={handleInput}
            >
              <option value="" disabled>
                Job Type
              </option>
              <option value="In office">In Office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          {/* OPENINGS */}
          <div className="w-1/2 px-2 mb-2  flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="openings"
            >
              openings
            </label>
            <input
              style={{ borderColor: error.openings ? "red" : "" }}
              className=" mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="openings"
              name="openings"
              id="openings"
              placeholder="eg. 5"
              value={formData.openings}
              onChange={handleInput}
            />
          </div>
        </div>
        <p className="text-red-500 text-xs text-center mb-2 italic">
          {error.jobType || error.openings}
        </p>

        {/* descriptionS-AND-preference */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="description"
            >
              description
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="description"
              value={formData.description}
              id="description"
              placeholder="Description"
              onChange={handleInput}
            ></input>
          </div>
          {/* preference */}
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="preference"
            >
              preference
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="preference"
              id="preference"
              value={formData.preference}
              placeholder="Preferences"
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <p className="text-red-500 text-xs italic text-center mb-2">
          {error.description || error.preference}
        </p>
        {/* salary */}
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="salary"
          >
            salary
          </label>
          <input
            style={{ borderColor: error.skill ? "red" : "" }}
            className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="salary"
            value={formData.salary}
            id="salary"
            placeholder="eg. 5000"
            onChange={handleInput}
          ></input>
        </div>
        <p className="text-center mb-2 text-red-500 text-xs italic">
          {error.salary}
        </p>
        {/* PERKS-AND-ASSESSMENTS */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="perks"
            >
              Perks
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="perks"
              value={formData.perks}
              id="perks"
              placeholder="Perks"
              onChange={handleInput}
            ></input>
          </div>
          {/* Amount */}
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="assessments"
            >
              assessments
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="assessments"
              value={formData.assessments}
              id="assessments"
              placeholder="Assessments"
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <p className="text-center mb-2 text-red-500 text-xs italic">
          {error.perks || error.assessments}
        </p>
        <button
          disabled={btnClicked}
          className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded disabled:bg-slate-400 text-white font-bold mt-3"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
