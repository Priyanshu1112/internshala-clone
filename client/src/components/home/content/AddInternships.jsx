import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { asyncAddInternship } from "../../../store/actions/studentActions";
import { asyncCreateInternship } from "../../../store/actions/employeeActions";
import { toast } from "react-toastify";

const AddInternships = () => {
  const [btnClicked, setbtnClicked] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    profile: "",
    skill: "",
    internshipType: "",
    openings: "",
    from: "",
    to: "",
    duration: "",
    responsibility: "",
    stipend: { status: "", amount: "" },
    perks: "",
    assessments: "",
  });
  const [error, setError] = useState({
    profile: "",
    skill: "",
    internshipType: "",
    openings: "",
    from: "",
    to: "",
    duration: "",
    responsibility: "",
    stipend: { status: "", amount: "" },
    perks: "",
    assessments: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name == "stipend") {
      setFormData({
        ...formData,
        stipend: { ...formData.stipend, [name]: value },
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStipend = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      stipend: { ...formData.stipend, [name]: value },
    });
  };

  const resetErrors = () => {
    setError({
      profile: "",
      skill: "",
      internshipType: "",
      openings: "",
      from: "",
      to: "",
      duration: "",
      responsibility: "",
      stipend: { status: "", amount: "" },
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

    if (formData.internshipType === "") {
      setError({ internshipType: "Internship type is required" });
      return;
    }

    if (formData.openings === "") {
      setError({ openings: "Openings is required" });
      return;
    }

    if (formData.from === "") {
      setError({ from: "Start date is required" });
      return;
    }

    if (formData.to === "") {
      setError({ to: "End date is required" });
      return;
    }

    if (formData.from > formData.to) {
      setError({ from: "Start date must be before the end date" });
      setError({ to: "End date must be after the start date" });
      return;
    }

    if (formData.duration === "") {
      setError({ duration: "Duration is required" });
      return;
    }

    if (formData.responsibility === "") {
      setError({ responsibility: "Responsibility is required" });
      return;
    }

    if (formData.stipend.status === "") {
      setError({ stipend: { status: "Stipend status is required" } });
      return;
    }

    if (
      formData.stipend.status !== "Unpaid" &&
      formData.stipend.amount === ""
    ) {
      setError({ stipend: { amount: "Stipend amount is required" } });
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
    dispatch(asyncCreateInternship(formData)).then((status) => {
      if (status == 200) {
        toast.success("Internship created successfully!", {
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
        {/* INTERNSHIP-TYPE */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="internshipType"
            >
              internship Type
            </label>
            <select
              className=" mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              name="internshipType"
              id="internshipType"
              value={formData.internshipType}
              onChange={handleInput}
            >
              <option value="" disabled>
                Internship Type
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
          {error.internshipType || error.openings}
        </p>
        {/* FROM-AND-TO */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="from"
            >
              from
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="date"
              name="from"
              value={formData.from}
              id="from"
              onChange={handleInput}
            ></input>
          </div>
          {/* To */}
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="to"
            >
              to
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="date"
              name="to"
              id="to"
              value={formData.to}
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <p className="text-red-500 text-xs italic mb-2 text-center">
          {error.from || error.to}
        </p>
        {/* DURATIONS-AND-RESPONSIBILITY */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="duration"
            >
              duration
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="duration"
              value={formData.duration}
              id="duration"
              placeholder="eg. 5 months"
              onChange={handleInput}
            ></input>
          </div>
          {/* Responsibility */}
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="responsibility"
            >
              responsibility
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="responsibility"
              id="responsibility"
              value={formData.responsibility}
              placeholder="eg. Manage full stack"
              onChange={handleInput}
            ></input>
          </div>
        </div>
        <p className="text-red-500 text-xs italic text-center mb-2">
          {error.duration || error.responsibility}
        </p>
        {/* STIPEND */}
        <div className="w-full flex justify-between ">
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="status"
            >
              stipend status
            </label>
            <select
              className=" mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              name="status"
              id="status"
              value={formData.stipend.status}
              onChange={handleStipend}
            >
              <option value="" disabled>
                Stipend Status
              </option>
              <option value="Fixed">Fixed</option>
              <option value="Negotiable">Negotiable</option>
              <option value="Performance Based">Performance Based</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          {/* Amount */}
          <div className="w-1/2 px-2 mb-2 flex flex-col">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="amount"
            >
              amount
            </label>
            <input
              style={{ borderColor: error.skill ? "red" : "" }}
              className="w-full mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              type="text"
              name="amount"
              value={formData.stipend.amount}
              id="amount"
              placeholder="eg. 5000"
              onChange={handleStipend}
            ></input>
          </div>
        </div>
        <p className="text-center mb-2 text-red-500 text-xs italic">
          {error.stipend?.status || error.stipend?.amount}
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
          Post Internship
        </button>
      </form>
    </div>
  );
};

export default AddInternships;
