import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser } from "./store/actions/appActions";
import Home from "./components/home/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/") {
        if (userRole === "student") {
          navigate("/student/dashboard");
        } else if (userRole === "employee") {
          navigate("/employee/dashboard");
        }
      } else {
        if (userRole === "student") {
          navigate("/student/dashboard");
        } else if (userRole === "employee") {
          navigate("/employee/dashboard");
        }
      }
    } else if (!unAuthenticatedRoutes(location.pathname)) {
      navigate("/");
      dispatch(asyncCurrentUser());
    }
  }, [isAuthenticated, userRole]);

  const unAuthenticatedRoutes = (path) => {
    // if(path.includes("/student/forget-link/"))
    //   return true
    return (
      path.includes("/student/forget-link/") ||
      path.includes("/forget-password") ||
      path.includes("/internships") ||
      path.includes("/jobs") ||
      path.includes("/login") ||
      path.includes("/registerStudent") ||
      path.includes("/registerEmployee")
    );
  };

  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/student/dashboard/*" element={<Home />} />
        <Route path="/employee/dashboard/*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
