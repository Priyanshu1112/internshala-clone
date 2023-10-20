import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavBottom = ({ scrollUp }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.app);
  const location = useLocation();

  // console.log(scrollUp);

  const homeRoute = !isAuthenticated
    ? "/"
    : userRole === "student"
    ? "/student/dashboard"
    : "/employee/dashboard";
  const internshipsRoute = "/internships";
  const jobsRoute = "/jobs";

  return (
    <div
      className="w-full bg-white fixed left-0 bottom-0 flex text-gray-700  justify-evenly shadow-inner text-fs-1 pb-1 font-bold sm:hidden"
      style={{
        transform: `translateY(${scrollUp ? "100%" : "0%"})`, // Hide when scrolling down, show when scrolling up
        transition: "transform 0.1s ease-in-out",
        // display: `${
        //   location.pathname === homeRoute ||
        //   location.pathname === internshipsRoute ||
        //   location.pathname === jobsRoute
        //     ? ""
        //     : "none"
        // }`,
      }}
    >
      <Link
        to={homeRoute}
        className={`flex flex-col  justify-center items-center pt-1 border-t-4   ${
          location.pathname == homeRoute
            ? "active: text-sky-500 border-sky-500"
            : "border-transparent"
        }`}
      >
        <i className="text-fs-2 ri-home-4-line"></i>
        <p>Home</p>
      </Link>
      <Link
        to={internshipsRoute}
        className={`flex flex-col  justify-center items-center pt-1 border-t-4   ${
          location.pathname == internshipsRoute
            ? "active: text-sky-500  border-sky-500"
            : "border-transparent"
        }`}
      >
        <i className="text-fs-2 ri-send-plane-line"></i>
        <p>Internships</p>
      </Link>
      <Link
        to={jobsRoute}
        className={`flex flex-col  justify-center items-center pt-1 border-t-4   ${
          location.pathname == jobsRoute
            ? "active: text-sky-500 border-sky-500"
            : "border-transparent"
        }`}
      >
        <i className="text-fs-2 ri-briefcase-2-line"></i>
        <p>Jobs</p>
      </Link>
    </div>
  );
};

export default NavBottom;
