import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncJobApplications } from "../../../store/actions/employeeActions";

const AppliedJob = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(asyncJobApplications());
  }, []);

  return (
    <div>
      <p className="text-center text-lg font-bold">Jobs</p>
      {jobs?.map((job) => {
        // console.log(internship);
        return (
          <div key={job._id} className="bg-white my-2 p-2">
            <p className="text-center capitalize text-md mb-1 font-semibold text-slate-700">
              Profile - {job.profile}
            </p>
            <p className="text-center text-sm my-1 text-slate-600">
              Applications:-
            </p>
            <ul className="list-inside list-disc">
              {job.students?.map((student) => {
                // console.log(student);
                return (
                  <li
                    key={student._id}
                    className="text-slate-700 text-center capitalize"
                  >
                    {student.firstName} {student.lastName}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AppliedJob;
