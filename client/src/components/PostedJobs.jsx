import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetJobs } from "../store/actions/jobActions";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.app);
  const { employee } = useSelector((state) => state.employee);
  useEffect(() => {
    dispatch(asyncGetJobs());
  }, []);
  return (
    <div className="bg-slate-200 sm:w-[60vw] mx-auto p-2 rounded">
      <p className="text-center text-lg font-bold">Posted Jobs</p>
      <p
        onClick={() => {
          navigate("add-jobs");
        }}
        className="text-sky-500 text-sm text-center my-2 cursor-pointer"
      >
        + Add Jobs
      </p>
      {employee?.jobs?.map((job) => {
        // console.log(job);
        return (
          <div
            key={job._id}
            className="h-30vh p-4 flex flex-col justify-evenly bg-white rounded border my-3 min-w-[70vw] sm:min-w-[30vw] sm:py-2"
            // style={{ minWidth: "70vw" }}
          >
            <div className="flex justify-between items-center border-b-2 pb-2">
              <div className=" font-bold">
                <h1 className=" text-lg sm:text-md">{job.profile}</h1>
                <p className="text-[3vmin] text-slate-500  sm:text-sm">
                  {employee.organizationName}
                </p>
              </div>
              <div>
                <img width="40vw" src={employee.organizationLogo.url} alt="" />
              </div>
            </div>
            <span className="text-slate-600 text-fs-1 border-b-2 pb-2 sm:text-sm">
              <p>
                <i className="ri-map-pin-2-line me-2"></i>{" "}
                {job.jobType ? job.jobType : job.jobType}
              </p>
              <p>
                <i className="ri-wallet-2-line me-3"></i>
                {job.stipend?.amount ? job.stipend.amount : job.salary}
              </p>
              <p>
                {job.duration ? (
                  <>
                    <i className="ri-calendar-line me-2"></i> {job.duration}
                  </>
                ) : (
                  ""
                )}
              </p>
            </span>
            <div className="text-end">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                    return;
                  }
                  navigate(`/job/${job._id}`);
                }}
                className="text-sky-500 font-bold border border-sky-500 px-2 py-1 mt-2 rounded"
              >
                View details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostedJobs;
