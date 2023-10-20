import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncStudentSignOut } from "../../../store/actions/studentActions";
import { asyncEmployeeSignOut } from "../../../store/actions/employeeActions";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setshowNavSide } = props;
  const { isAuthenticated, userRole, user } = useSelector((state) => state.app);

  const handleDropDown = () => {
    document.querySelector(".dropDown").classList.toggle("hidden");
    document
      .getElementById("iconRegister")
      .classList.toggle("ri-arrow-down-s-fill");
    document
      .getElementById("iconRegister")
      .classList.toggle("ri-arrow-up-s-fill");
  };

  return (
    <div className="w-screen mb-2 ">
      <nav className="w-full flex items-center justify-between px-4 shadow-md ">
        <span className="flex items-center ">
          <i
            className="ri-menu-line sm:hidden"
            onClick={() => {
              setshowNavSide(true);
            }}
          ></i>
          <Link
            to={
              !isAuthenticated
                ? "/"
                : userRole === "student"
                ? "/student/dashboard"
                : "/employee/dashboard"
            }
            className="bg-transparent flex items-center"
          >
            <img
              className="h-12vmax sm:h-[7vmax] me-7"
              src="/images/logo.png"
              alt=""
            />
          </Link>
          {isAuthenticated ? (
            ""
          ) : (
            <>
              <Link
                to="internships"
                className=" hidden sm:inline me-4 font-bold text-md text-slate-600"
              >
                Internships
              </Link>

              <Link
                to="jobs"
                className=" hidden sm:inline me-4 font-bold text-md text-slate-600"
              >
                Jobs
              </Link>
            </>
          )}
        </span>
        <span className="relative">
          {!isAuthenticated ? (
            <>
              <button
                className="hidden sm:inline px-5 py-2 text-sky-400 border-2 border-sky-400 rounded font-bold me-4"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="bg-sky-400 px-4 py-2 text-white rounded font-bold me-4"
                onClick={handleDropDown}
              >
                Register{" "}
                <i id="iconRegister" className="ri-arrow-down-s-fill"></i>
              </button>
            </>
          ) : (
            <div
              className="gap-3 sm:inline pe-5"
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              <div>
                <Link
                  to={
                    userRole == "student" ? "internships" : "posted-internships"
                  }
                  className=" hidden me-3 sm:inline  font-bold text-md text-slate-600"
                >
                  Internships
                </Link>

                <Link
                  to={userRole == "student" ? "jobs" : "posted-jobs"}
                  className=" hidden sm:inline  font-bold text-md text-slate-600"
                >
                  Jobs
                </Link>
              </div>
              <div
                className="sm:flex items-center cursor-pointer hidden "
                onClick={handleDropDown}
              >
                <div className=" rounded-full border-2 border-slate-800  overflow-hidden w-[4vmin] h-[4vmin] flex justify-center items-center">
                  {userRole == "student" ? (
                    user.avatar.url === "" ? (
                      user.firstName[0]
                    ) : (
                      <div
                        className="w-full h-full bg-red-300"
                        style={{
                          backgroundImage: `url(${user.avatar.url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                    )
                  ) : user.organizationLogo.url === "" ? (
                    user.firstName[0]
                  ) : (
                    <div
                      className="w-full h-full bg-red-300"
                      style={{
                        backgroundImage: `url(${user.organizationLogo.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  )}
                </div>
                <i id="iconRegister" className="ri-arrow-down-s-fill"></i>
              </div>
            </div>
          )}
          <div className="dropDown hidden absolute bg-white py-5 right-0 whitespace-nowrap shadow-md">
            {!isAuthenticated ? (
              <>
                <Link to="/registerStudent" onClick={handleDropDown}>
                  <p className="mb-2 px-5 hover:bg-gray-100">As a student</p>
                </Link>
                <Link to="/registerEmployee" onClick={handleDropDown}>
                  <p className="hover:bg-gray-100 px-5">As an employee</p>
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                {userRole == "student" ? (
                  <>
                    <div>
                      <Link
                        className="mb-2 px-5 hover:bg-gray-100"
                        to="my-applications"
                        onClick={() => {
                          setshowNavSide(false);
                        }}
                      >
                        My Applications
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="mb-2 px-5 hover:bg-gray-100"
                        to="editResume"
                        onClick={() => {
                          setshowNavSide(false);
                        }}
                      >
                        Edit Resume
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <Link
                      className="mb-2 px-5 hover:bg-gray-100"
                      to="applications"
                      onClick={() => {
                        setshowNavSide(false);
                      }}
                    >
                      Applications
                    </Link>
                  </div>
                )}
                <div>
                  <p
                    className="mb-2 px-5 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById("dropDown")
                        .classList.toggle("ri-arrow-drop-down-line");
                      document
                        .getElementById("dropDown")
                        .classList.toggle("ri-arrow-drop-up-line");
                      document
                        .querySelector(".dropDownMenu")
                        .classList.toggle("hidden");
                    }}
                  >
                    More{" "}
                    <i id="dropDown" className="ri-arrow-drop-down-line"></i>
                  </p>
                  <div className="dropDownMenu hidden flex flex-col gap-2 mt-3 ps-3">
                    <div>
                      <Link
                        className="mb-2 px-5 hover:bg-gray-100"
                        to="changePassword"
                        onClick={() => {
                          setshowNavSide(false);
                        }}
                      >
                        Change Password
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="mb-2 px-5 hover:bg-gray-100"
                        to="delete-account"
                        onClick={() => {
                          setshowNavSide(false);
                        }}
                      >
                        Delete My Account
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    className="mb-2 px-5 hover:bg-gray-100"
                    // className="mt-5"
                    to="logout"
                    onClick={() => {
                      userRole === "student"
                        ? dispatch(asyncStudentSignOut())
                        : dispatch(asyncEmployeeSignOut());
                      setshowNavSide(false);
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </span>
      </nav>
    </div>
  );
};

export default Navbar;
