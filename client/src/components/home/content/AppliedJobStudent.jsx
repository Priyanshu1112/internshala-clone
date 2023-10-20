import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncStudentJobs } from "../../../store/actions/studentActions";

const AppliedJobStudent = () => {
  const dispatch = useDispatch();
  const { appliedJob } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(asyncStudentJobs());
  }, []);

  return (
    <div className="bg-slate-200 sm:w-[60vw] mx-auto p-2 rounded">
      <p className="text-center text-lg font-bold">Jobs</p>
      {appliedJob?.map((job) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default AppliedJobStudent;
