import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestInternships } from "../../../store/actions/internshipActions";
import Card from "./Card";

const LatestInternships = () => {
  const { latestInternship } = useSelector((state) => state.internship);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestInternships());
  }, []);

  return (
    <div className="bg-slate-100 px-3 pt-5 ">
      <h2 className="font-semibold text-lg">
        Latest internships on Internshala
      </h2>
      <p className="text-sm tracking-wider text-slate-700">
        POPULAR CATEGORIES:
      </p>
      <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-3 no-scrollbar">
        {latestInternship[0]?.map((lin, ind) => {
          return <Card key={ind} data={lin} />;
        })}
      </div>
    </div>
  );
};

export default LatestInternships;
