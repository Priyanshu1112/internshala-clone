import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncAddEducation } from "../../../../../store/actions/studentActions";

const Graduation = () => {
  const dispatch = useDispatch();
  //   const graduation = student.resume.education?.map((edu) => {
  //     if (edu.educationLevel === "graduation") {
  //       return edu;
  //     }
  //   });

  const [formData, setFormData] = useState({
    educationLevel: "graduation",
    college: "",
    startYear: "",
    endYear: "",
    degree: "",
    stream: "",
    percentageScale: "",
    performance: "",
  });
  //   const [formData, setFormData] = useState({
  //     educationLevel: "graduation",
  //     college: graduation[0]?.college || "",
  //     startYear: graduation[0]?.startYear || "",
  //     endYear: graduation[0]?.endYear || "",
  //     degree: graduation[0]?.degree || "",
  //     stream: graduation[0]?.stream || "",
  //     percentageScale: graduation[0]?.percentageScale || "",
  //     performance: graduation[0]?.performance || "",
  //   });

  const [error, setError] = useState({
    college: "",
    startYear: "",
    endYear: "",
    degree: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({
      college: "",
      startYear: "",
      endYear: "",
      degree: "",
    });

    if (formData.college === "") {
      setError({ college: "College cannot be empty" });
      return;
    }
    if (formData.startYear === "") {
      setError({ startYear: "Start Year cannot be empty" });
      return;
    }
    if (formData.endYear === "") {
      setError({ endYear: "End Year cannot be empty" });
      return;
    }
    if (formData.degree === "") {
      setError({ degree: "Degree cannot be empty" });
      return;
    }
    SubmitForm();
  };

  const SubmitForm = () => {
    dispatch(asyncAddEducation(formData));
  };

  return (
    <div className="px-2 mb-[5vh]">
      <div>
        <p className="text-lg text-slate-800 my-4 font-bold text-center">
          Graduation details/ Post graduation details
        </p>
      </div>
      <form method="post" onSubmit={ValidateForm}>
        {/* COLLEGE */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="college"
          >
            College
          </label>
          <input
            style={{ borderColor: error.college ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="college"
            id="college"
            placeholder="eg. Hindu College"
            value={formData.college}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.college}</small>
        </div>
        {/* YEAR */}
        <div className="w-full flex justify-between mb-2">
          <div className="w-2/4 px-1 ">
            <label
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="startYear"
            >
              Start Year
            </label>
            <select
              className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              name="startYear"
              id="startYear"
              value={formData.startYear}
              onChange={handleInput}
            >
              <option value="" disabled>
                Choose Year
              </option>
              {Array.from({ length: 45 }, (_, index) => {
                const year = 2024 - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <small className="text-red-500 text-xs italic">
              {error.startYear}
            </small>
          </div>
          <div className="w-2/4 px-1 ">
            <label
              className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              htmlFor="endYear"
            >
              End Year
            </label>
            <select
              className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
              name="endYear"
              id="endYear"
              value={formData.endYear}
              onChange={handleInput}
            >
              <option value="" disabled>
                Choose Year
              </option>
              {Array.from({ length: 49 }, (_, index) => {
                const year = 2029 - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <small className="text-red-500 text-xs italic">
              {error.endYear}
            </small>
          </div>
        </div>
        {/* DEGREE */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="degree"
          >
            Degree
          </label>
          <input
            style={{ borderColor: error.degree ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="degree"
            id="degree"
            placeholder="eg. B.Sc (Hons)"
            value={formData.degree}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.degree}</small>
        </div>
        {/* STREAM */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="stream"
          >
            Stream (Optional)
          </label>
          <input
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="stream"
            id="stream"
            placeholder="eg. Economics"
            value={formData.stream}
            onChange={handleInput}
          />
        </div>
        {/* Percentage Scale */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="percentageScale"
          >
            Percentage Scale (Optional)
          </label>
          <select
            className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            name="percentageScale"
            id="percentageScale"
            value={formData.percentageScale}
            onChange={handleInput}
          >
            <option value="Percentage" selected>
              Percentage
            </option>
            <option value="cgpa10">CGPA (Scale of 10)</option>
            <option value="cgpa9">CGPA (Scale of 9)</option>
            <option value="cgpa8">CGPA (Scale of 8)</option>
          </select>
        </div>
        {/* Performance */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="performance"
          >
            Performance (Optional)
          </label>
          <input
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="performance"
            id="performance"
            placeholder="0.0"
            value={formData.performance}
            onChange={handleInput}
          />
        </div>
        <button className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded text-white font-bold mt-3">
          Save
        </button>
      </form>
    </div>
  );
};

export default Graduation;
