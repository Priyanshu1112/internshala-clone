import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.app);
  //   console.log(data);
  return (
    <div
      className="h-30vh p-4 flex flex-col justify-evenly bg-white rounded border my-3 min-w-[70vw] sm:min-w-[30vw] sm:py-2"
      // style={{ minWidth: "70vw" }}
    >
      <div className="flex justify-between items-center border-b-2 pb-2">
        <div className=" font-bold">
          <h1 className=" text-lg sm:text-md">{data.profile}</h1>
          <p className="text-[3vmin] text-slate-500  sm:text-sm">
            {data.employee.organizationName}
          </p>
        </div>
        <div>
          <img width="40vw" src={data.employee.organizationLogo.url} alt="" />
        </div>
      </div>
      <span className="text-slate-600 text-fs-1 sm:text-sm">
        <p>
          <i className="ri-map-pin-2-line me-2"></i>{" "}
          {data.internshipType ? data.internshipType : data.jobType}
        </p>
        <p>
          <i className="ri-wallet-2-line me-3"></i>
          {data.stipend?.amount ? data.stipend.amount : data.salary}
        </p>
        <p>
          {data.duration ? (
            <>
              <i className="ri-calendar-line me-2"></i> {data.duration}
            </>
          ) : (
            ""
          )}
        </p>
      </span>
      <p
        className="text-sky-400"
        onClick={() => {
          if (!isAuthenticated) {
            navigate("/login");
            return;
          }
          data.internshipType
            ? navigate(`/internship/${data._id}`)
            : navigate(`/job/${data._id}`);
        }}
      >
        View details &gt;
      </p>
    </div>
  );
};

export default Card;
