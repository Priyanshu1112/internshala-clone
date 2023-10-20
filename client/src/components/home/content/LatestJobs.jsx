import React, { useEffect } from "react";
import { getLatestJobs } from "../../../store/actions/jobActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";

const LatestJobs = () => {
  const { latestJob } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestJobs());
  }, []);

  return (
    <div className="bg-slate-100 px-3 pt-5 mt-5">
      <h2 className="font-semibold text-lg">Latest jobs on Internshala</h2>
      <p className="text-sm tracking-wider text-slate-700">
        POPULAR CATEGORIES:
      </p>
      <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-3 no-scrollbar">
        {latestJob?.map((ljob, ind) => {
          // console.log(ljob);
          return <Card key={ind} data={ljob} />;
        })}
      </div>
    </div>
  );
};

export default LatestJobs;
