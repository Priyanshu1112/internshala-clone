import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncApplyJob } from "../store/actions/studentActions";
import { toast } from "react-toastify";
import { asyncGetJob } from "../store/actions/jobActions";

const DetailJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { job } = useSelector((state) => state.job);
  // const [assessment, setAssessment] = useState("");
  // const [error, setError] = useState("");

  useEffect(() => {
    dispatch(asyncGetJob(id));
  }, []);

  const Apply = () => {
    // setError("");
    // if (assessment.length == 0) {
    //   setError("Field cannot be empty");
    //   return;
    // }
    // console.log(student._id);
    dispatch(asyncApplyJob(id)).then((status) => {
      if (status === 200) {
        // <toast
        navigate("/jobs");
      }
    });
  };

  return (
    <div className="h-screen sm:w-[60vw] mx-auto">
      <p className="text-center font-bold text-lg">Apply Internship</p>
      {!job ? (
        <p>null</p>
      ) : (
        <div
          key={job._id}
          className="p-4 flex flex-col justify-evenly bg-white rounded border my-3 min-w-[70vw] sm:min-w-[30vw] sm:py-2"
          // style={{ minWidth: "70vw" }}
        >
          <div className="flex justify-between items-center border-b-2 pb-2">
            <div className=" font-bold">
              <h1 className=" text-lg sm:text-md">{job.profile}</h1>
              <p className="text-[3vmin] text-slate-500  sm:text-sm">
                {job.employee.organizationName}
              </p>
            </div>
            <div>
              <img
                width="40vw"
                src={job.employee.organizationLogo.url}
                alt=""
              />
            </div>
          </div>
          <span className="text-slate-600 text-fs-1 border-b-2 pb-2 sm:text-sm">
            <p>
              <i className="ri-map-pin-2-line me-2"></i>{" "}
              {job.jobType ? job.jobType : job.jobType}
            </p>
            <p>
              <i className="ri-wallet-2-line me-3"></i>
              {job.salary}
            </p>
          </span>

          <span className="text-slate-600 text-fs-1 border-b-2 py-2 sm:text-sm">
            <p className="mb-1">Perks:- </p>
            <p>{job.perks}</p>
            <p className="mt-3 mb-1">Preference:- </p>
            <p>{job.preference}</p>
          </span>
          {/* <span className="text-slate-600 text-fs-1 border-b-2 py-2 sm:text-sm">
            <p>{internship.assessments}:-</p>
            <textarea
              style={{ border: error ? "1px solid red" : "" }}
              className="w-full border-2 rounded border-slate-300 p-2"
              value={assessment}
              onChange={(e) => {
                setAssessment(e.target.value);
              }}
              cols="30"
              rows="5"
            ></textarea>
            <small className="text-sm text-red-500">{error}</small>
          </span> */}
          <div className="text-center">
            <button
              onClick={Apply}
              className="text-white font-bold border bg-sky-500 border-sky-500 px-4 py-1 mt-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailJob;
