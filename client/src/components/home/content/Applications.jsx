import React, { useState } from "react";
import AppliedInternship from "./AppliedInternship";
import AppliedJob from "./AppliedJob";

const Applications = () => {
  const [isActive, setIsActive] = useState(true);

  const handleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-slate-200 rounded p-2 ">
      <div className="flex justify-center gap-4 mb-2 bg-white rounded p-2">
        <button
          className={isActive ? "text-sky-500 font-bold" : " font-bold"}
          onClick={handleActive}
        >
          Internships
        </button>
        <button
          className={!isActive ? "text-sky-500 font-bold" : "font-bold"}
          onClick={handleActive}
        >
          Jobs
        </button>
      </div>
      {isActive ? <AppliedInternship /> : <AppliedJob />}
      {/* <p className="text-center text-lg font-bold">Internships</p>
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
      })} */}
    </div>
  );
};

export default Applications;
