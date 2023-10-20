import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncDeleteEducation,
  asyncDeleteInternship,
  asyncDeleteJob,
} from "../../../store/actions/studentActions";

const EditResume = () => {
  const { isAuthenticated, user } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="px-2 h-[101vh] sm:w-[60vw] sm:mx-auto">
      <h1 className="text-center text-2xl font-bold border-b-4 p-2">Resume</h1>
      {/* PERSONAL DETAILS */}
      <div className="personalDetails text-md text-slate-500 p-3 border-b-2">
        <p className="text-lg font-bold text-slate-800 flex justify-between">
          {user.firstName + " " + user.lastName}{" "}
          <i
            className="ri-pencil-line text-slate-600 cursor-pointer"
            onClick={() => {
              navigate("personal-details");
            }}
          ></i>
        </p>
        <p>{user.email}</p>
        <p>{user.contact}</p>
        <p>{user.city}</p>
      </div>
      {/* EDUCATION */}
      <div className="education capitalize text-slate-500 text-sm p-3 border-b-2">
        <p className="text-md font-bold">Education</p>
        {user.resume?.education?.map((edu) => {
          if (edu.educationLevel === "graduation") {
            return (
              <div key={edu.id} className="my-3">
                <p className="text-slate-800 text-md flex justify-between">
                  {edu.degree}
                  <span className="flex gap-2 text-lg">
                    <i
                      className="ri-pencil-line text-slate-600 cursor-pointer"
                      onClick={() => {
                        navigate(`edit-education/graduation/${edu.id}`);
                      }}
                    ></i>
                    <i
                      className="ri-delete-bin-line cursor-pointer"
                      onClick={() => {
                        dispatch(asyncDeleteEducation(edu.id));
                      }}
                    ></i>
                  </span>
                </p>
                <p className="text-sm">{edu.college}</p>
                <p>
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            );
          } else {
            return (
              <div key={edu.id} className="my-3">
                <p className="text-slate-800 text-md flex justify-between">
                  {edu.educationLevel == "secondary"
                    ? "Secondary (X)"
                    : `Senior Secondary (XII), ${
                        edu.stream ? `${edu.stream}` : ""
                      }`}
                  <span className="flex gap-2 text-lg">
                    <i
                      className="ri-pencil-line text-slate-600 cursor-pointer"
                      onClick={() => {
                        if (edu.educationLevel == "secondary") {
                          navigate(`edit-education/secondary/${edu.id}`);
                        } else {
                          navigate(`edit-education/senior-secondary/${edu.id}`);
                        }
                      }}
                    ></i>
                    <i
                      className="ri-delete-bin-line cursor-pointer"
                      onClick={() => {
                        dispatch(asyncDeleteEducation(edu.id));
                      }}
                    ></i>
                  </span>
                </p>
                {edu.school ? <p className="text-sm">{edu.school}</p> : ""}
                <p>({edu.board} Board)</p>
                <p>Year of Completion:- {edu.yearOfCompletion}</p>
                <p>{edu.percentage ? ` Percentage: ${edu.percentage}` : ""}</p>
              </div>
            );
          }
        })}

        <button
          className="text-sky-500 mt-2"
          onClick={() => {
            navigate("edit-education");
          }}
        >
          + Add education
        </button>
      </div>
      {/* WORK EXPERIENCE */}
      <div className="workExp capitalize text-slate-500 text-sm p-3 border-b-2">
        <p className="text-md font-bold">work experience</p>
        {user.resume?.jobs.map((job) => {
          let startDate = new Date(job.startDate);
          const startDateYear = startDate.getUTCFullYear();
          const startDateMonth = String(startDate.getUTCMonth() + 1).padStart(
            2,
            "0"
          );
          const startDateDay = String(startDate.getUTCDate()).padStart(2, "0");
          startDate = `${startDateYear}/${startDateMonth}/${startDateDay}`;

          let endDate = new Date(job.endDate);
          if (job.endDate != "Present") {
            const endDateYear = endDate.getUTCFullYear();
            const endDateMonth = String(endDate.getUTCMonth() + 1).padStart(
              2,
              "0"
            );
            const endDateDay = String(endDate.getUTCDate()).padStart(2, "0");
            endDate = `${endDateYear}/${endDateMonth}/${endDateDay}`;
          } else {
            endDate = job.endDate;
          }

          return (
            <div key={job.id} className="my-3">
              <p className="text-slate-800 text-md flex justify-between">
                {job.designation}
                <span className="flex gap-2 text-lg">
                  <i
                    className="ri-pencil-line text-slate-600 cursor-pointer"
                    onClick={() => {
                      navigate(`edit-job/${job.id}`);
                    }}
                  ></i>
                  <i
                    className="ri-delete-bin-line cursor-pointer"
                    onClick={() => {
                      dispatch(asyncDeleteJob(job.id));
                    }}
                  ></i>
                </span>
              </p>
              <p className="text-sm">
                {job.organization}, {job.location}
              </p>
              <p className="text-sm">
                Job - {startDate} - {endDate}
              </p>
              {job.description ? <p>{job.description}</p> : ""}
            </div>
          );
        })}
        {user.resume?.internships.map((internship) => {
          let startDate = new Date(internship.startDate);
          const startDateYear = startDate.getUTCFullYear();
          const startDateMonth = String(startDate.getUTCMonth() + 1).padStart(
            2,
            "0"
          );
          const startDateDay = String(startDate.getUTCDate()).padStart(2, "0");
          startDate = `${startDateYear}/${startDateMonth}/${startDateDay}`;

          let endDate = new Date(internship.endDate);
          if (internship.endDate != "Present") {
            const endDateYear = endDate.getUTCFullYear();
            const endDateMonth = String(endDate.getUTCMonth() + 1).padStart(
              2,
              "0"
            );
            const endDateDay = String(endDate.getUTCDate()).padStart(2, "0");
            endDate = `${endDateYear}/${endDateMonth}/${endDateDay}`;
          } else {
            endDate = internship.endDate;
          }

          return (
            <div key={internship.id} className="my-3">
              <p className="text-slate-800 text-md flex justify-between">
                {internship.profile}
                <span className="flex gap-2 text-lg">
                  <i
                    className="ri-pencil-line text-slate-600 cursor-pointer"
                    onClick={() => {
                      navigate(`edit-internship/${internship.id}`);
                    }}
                  ></i>
                  <i
                    className="ri-delete-bin-line cursor-pointer  "
                    onClick={() => {
                      dispatch(asyncDeleteInternship(internship.id));
                    }}
                  ></i>
                </span>
              </p>
              <p className="text-sm">
                {internship.organization}, {internship.location}
              </p>
              <p className="text-sm">
                internship - {startDate} - {endDate}
              </p>
              {internship.description ? <p>{internship.description}</p> : ""}
            </div>
          );
        })}

        <div>
          <button
            className="text-sky-500 mt-2 me-5"
            onClick={() => {
              navigate("add-job");
            }}
          >
            + Add job
          </button>
          <button
            onClick={() => {
              navigate("add-internship");
            }}
            className="text-sky-500 mt-2"
          >
            + Add internship
          </button>
        </div>
      </div>
      {/* <div className="responsibilities capitalize text-slate-500 text-sm p-3 border-b-2">
        <p>Position of responsibilities</p>
        {user.resume?.responsibilities.map((res, ind) => {
          console.log(res, ind);
        })}
        <button className="text-sky-500 mt-2">
          + Add position of responsibilities
        </button>
      </div>
      <div className="courses capitalize text-slate-500 text-sm p-3 border-b-2">
        <p>training/ courses</p>
        {user.resume?.responsibilities.map((res, ind) => {
          console.log(res, ind);
        })}
        <button className="text-sky-500 mt-2">+ Add training/ course</button>
      </div>
      <div className="projects capitalize text-slate-500 text-sm p-3 border-b-2">
        <p>Academics/ personal projects</p>
        {user.resume?.responsibilities.map((res, ind) => {
          console.log(res, ind);
        })}
        <button className="text-sky-500 mt-2">
          + Add academic/ personal projects
        </button>
      </div>
      <div className="accomplishments capitalize text-slate-500 text-sm p-3 border-b-2">
        <p>Accomplishments/ additional details</p>
        {user.resume?.responsibilities.map((res, ind) => {
          console.log(res, ind);
        })}
        <button className="text-sky-500 mt-2">
          + Add accomplishments/ additional details
        </button>
      </div> */}
    </div>
  );
};

export default EditResume;
