import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncForgetPassword } from "../../../store/actions/studentActions";
import { useNavigate, useParams } from "react-router-dom";

const ChangeForgotPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: id,
    password: "",
  });
  const [error, setError] = useState({
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    setError({
      password: "",
    });

    if (formData.password.length == 0) {
      setError({
        password: "Field cannot be empty",
      });
      return;
    }
    if (formData.password.length < 6) {
      setError({
        password: "Password must be at least 6 characters",
      });
      return;
    }
    dispatch(asyncForgetPassword(formData)).then((status) => {
      if (status == 200) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="sm:w-[50vw] md:w-[30vw] mx-auto">
      <form className="w-full px-2" method="post" onSubmit={ValidateForm}>
        <p className="text-center text-lg font-bold mb-2">
          Change Forgot Password
        </p>

        {/* NEW PASSWORD */}
        <div className="w-full px-2 mb-2">
          <label
            className="uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            style={{ borderColor: error.password ? "red" : "" }}
            className="w-full mt-1  bg-slate-200 p-1 border  rounded text-gray-700 focus:bg-white outline-none focus:border-gray-500"
            type="text"
            name="password"
            id="password"
            placeholder="Must be atleast 6 characters"
            value={formData.password}
            onChange={handleInput}
          />
          <small className="text-red-500 text-xs italic">
            {error.password}
          </small>
        </div>
        <button className="text-white bg-sky-500 w-[90%] rounded ms-[5%] py-1 mt-1">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangeForgotPassword;
