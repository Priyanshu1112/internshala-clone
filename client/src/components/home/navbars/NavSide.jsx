import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncStudentSignOut } from "../../../store/actions/studentActions";
import { asyncEmployeeSignOut } from "../../../store/actions/employeeActions";

const NavSide = (props) => {
  const { showNavSide, setshowNavSide } = props;
  const { isAuthenticated, user, userRole } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  //   const handleClick = (e) => {
  //     e.stopPropagation();
  //   };

  return (
    <div
      className="w-full absolute h-full top-0 z-10 bg-black-0.5 "
      style={{ right: showNavSide ? "0vw" : "100vw", transition: "0.1s all" }}
      onClick={() => {
        setshowNavSide(false);
      }}
    >
      <div
        className="bg-white  flex flex-col gap-5 max-w-max h-full  py-8 ps-5 pe-10 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isAuthenticated ? (
          <div className="flex gap-2 items-center">
            <div className="rounded-full border-2 border-slate-800  overflow-hidden w-[5vmax] h-[5vmax] flex justify-center items-center">
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
            <div>
              <p>{user.firstName + " " + user.lastName}</p>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <Link
            to={userRole == "employee" ? "posted-internships" : "internships"}
            onClick={() => {
              setshowNavSide(false);
            }}
          >
            Internships
          </Link>
        </div>
        <div>
          <Link
            to={userRole == "employee" ? "posted-jobs" : "jobs"}
            onClick={() => {
              setshowNavSide(false);
            }}
          >
            Jobs
          </Link>
        </div>

        <hr />
        {!isAuthenticated ? (
          <>
            <div>
              <Link
                to="registerStudent"
                onClick={() => {
                  setshowNavSide(false);
                }}
              >
                Register - As a Student
              </Link>
            </div>
            <div>
              <Link
                to="registerEmployee"
                onClick={() => {
                  setshowNavSide(false);
                }}
              >
                Register - As a Employee
              </Link>
            </div>
            <div>
              <Link
                to="login"
                onClick={() => {
                  setshowNavSide(false);
                }}
              >
                Login
              </Link>
            </div>
          </>
        ) : (
          <>
            {userRole == "student" ? (
              <>
                <div>
                  <Link
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
                  to="applications"
                  onClick={() => {
                    setshowNavSide(false);
                  }}
                >
                  Applications
                </Link>
              </div>
            )}

            <div
              onClick={() => {
                // console.log(document.getElementById("dropDown").classList);
                document
                  .getElementById("dropDown")
                  .classList.toggle("ri-arrow-drop-down-line");
                document
                  .getElementById("dropDown")
                  .classList.toggle("ri-arrow-drop-up-line");
                document
                  .getElementById("dropDownMenu")
                  .classList.toggle("hidden");
              }}
            >
              <p>
                More <i id="dropDown" className="ri-arrow-drop-down-line"></i>
              </p>
              <div id="dropDownMenu" className=" hidden mt-3 ps-3">
                <div>
                  <Link
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
          </>
        )}
      </div>
    </div>
  );
};

export default NavSide;
