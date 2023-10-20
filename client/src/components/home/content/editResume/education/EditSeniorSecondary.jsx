import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncEditEducation } from "../../../../../store/actions/studentActions";
import { useNavigate, useParams } from "react-router-dom";

const EditSeniorSecondary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { student } = useSelector((state) => state.student);

  // const [formData, setFormData] = useState({
  //   educationLevel: "seniorSecondary",
  //   intermediateStatus: "",
  //   yearOfCompletion: "",
  //   board: "",
  //   percentageScale: "",
  //   performance: "",
  //   stream: "",
  //   school: "",
  // });
  const [formData, setFormData] = useState({
    id: id,
    educationLevel: "seniorSecondary",
    intermediateStatus: "",
    yearOfCompletion: "",
    board: "",
    percentageScale: "",
    performance: "",
    stream: "",
    school: "",
  });

  useEffect(() => {
    if (student?.resume) {
      const graduation = student?.resume?.education?.filter((edu) => {
        if (edu.educationLevel === "seniorSecondary") {
          return edu;
        }
      });
      setFormData({
        id: id,
        educationLevel: "seniorSecondary",
        intermediateStatus: graduation[0]?.intermediateStatus || "",
        yearOfCompletion: graduation[0]?.yearOfCompletion || "",
        board: graduation[0]?.board || "",
        percentageScale: graduation[0]?.percentageScale || "",
        performance: graduation[0]?.performance || "",
        stream: graduation[0]?.stream || "",
        school: graduation[0]?.school || "",
      });
    }
  }, [student, student?.resume]);

  const [error, setError] = useState({
    intermediateStatus: "",
    yearOfCompletion: "",
    board: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({
      intermediateStatus: "",
      yearOfCompletion: "",
      board: "",
    });

    if (formData.intermediateStatus === "") {
      setError({ intermediateStatus: "Intermediate Status is needed" });
      return;
    }
    if (formData.yearOfCompletion === "") {
      setError({ yearOfCompletion: "Completion Year is needed" });
      return;
    }
    if (formData.board === "") {
      setError({ board: "Board cannot be empty" });
      return;
    }

    SubmitForm();
  };

  const SubmitForm = async () => {
    console.log(formData);
    const status = await dispatch(asyncEditEducation(formData));
    // console.log(status);
    if (status == 401) {
      navigate("/login");
    }
  };

  return (
    <div className="px-2 mb-[5vh]">
      <div>
        <p className="text-lg text-slate-800 my-4 font-bold text-center">
          Edit Senior Secondary or Equivalent (XII) details
        </p>
      </div>
      <form method="post" onSubmit={ValidateForm}>
        {/* INTERMEDIATE STATUS */}
        <div className="w-full px-2 mb-2">
          <label className="capitalize tracking-wide text-gray-700 text-xs font-bold">
            intermediate Status
          </label>
          <div className="w-full flex gap-6 my-2">
            <div className="flex item-center gap-2">
              <input
                type="radio"
                value="pursuing"
                checked={formData.intermediateStatus == "pursuing"}
                onChange={handleInput}
                name="intermediateStatus"
                id="pursuing"
              />
              <label
                htmlFor="pursuing"
                className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              >
                pursuing
              </label>
            </div>
            <div className="flex item-center gap-2">
              <input
                checked={formData.intermediateStatus == "completed"}
                type="radio"
                value="completed"
                onChange={handleInput}
                name="intermediateStatus"
                id="completed"
              />
              <label
                htmlFor="completed"
                className="capitalize tracking-wide text-gray-700 text-xs font-bold"
              >
                Completed
              </label>
            </div>
          </div>

          <small className="text-red-500 text-xs italic">
            {error.intermediateStatus}
          </small>
        </div>
        {/* YEAR OF COMPLETION */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="percentageScale"
          >
            Year of completion
          </label>
          <select
            className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            name="yearOfCompletion"
            id="yearOfCompletion"
            value={formData.yearOfCompletion}
            onChange={handleInput}
          >
            <option value="" selected>
              Choose a year
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
            {error.yearOfCompletion}
          </small>
        </div>
        {/* BOARD */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="board"
          >
            Board
          </label>
          <input
            style={{ borderColor: error.board ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="board"
            id="board"
            placeholder="eg. CBSE"
            value={formData.board}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">{error.board}</small>
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
            <option value="Commerce">CGPA (Scale of 10)</option>
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
        {/*STREAM */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="stream"
          >
            Percentage Scale (Optional)
          </label>
          <select
            className="w-[95%] mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            name="stream"
            id="stream"
            value={formData.stream}
            onChange={handleInput}
          >
            <option value="" disabled>
              Choose stream
            </option>
            <option value="Science" selected>
              Science
            </option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>
        </div>
        {/* SCHOOL */}
        <div className="w-full px-2 mb-2">
          <label
            className="capitalize tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="school"
          >
            School (Optional)
          </label>
          <input
            style={{ borderColor: error.school ? "red" : "" }}
            className="w-[95%] mt-1 bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="school"
            id="school"
            placeholder="eg. Delhi Public school"
            value={formData.school}
            onChange={handleInput}
          />
        </div>
        <button className="bg-sky-400 text-center w-[95%] ms-[2.5%] py-2 rounded text-white font-bold mt-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditSeniorSecondary;
