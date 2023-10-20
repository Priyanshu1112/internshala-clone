import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncInternshipApplications } from "../../../store/actions/employeeActions";

const AppliedInternship = () => {
  const dispatch = useDispatch();
  const { internships } = useSelector((state) => state.internship);

  useEffect(() => {
    dispatch(asyncInternshipApplications());
  }, []);

  return (
    <div>
      <p className="text-center text-lg font-bold">Internships</p>
      {internships?.map((internship) => {
        // console.log(internship);
        return (
          <div key={internship._id} className="bg-white my-2 p-2">
            <p className="text-center capitalize text-md mb-1 font-semibold text-slate-700">
              Profile - {internship.profile}
            </p>
            <p className="text-center text-sm my-1 text-slate-600">
              Applications:-
            </p>
            <ul className="list-inside list-disc">
              {internship.students?.map((student) => {
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

export default AppliedInternship;
