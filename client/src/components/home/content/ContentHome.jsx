import React from "react";
import LatestInternships from "./LatestInternships";
import LatestJobs from "./LatestJobs";

const ContentHome = () => {
  return (
    <div className="contentHome sm:px-[10vw]">
      <LatestInternships />
      <LatestJobs />
      <div className="footer  bg-black-footer text-white px-3 py-5 mt-5">
        © Copyright 2023 Internshala
      </div>
    </div>
  );
};

export default ContentHome;
