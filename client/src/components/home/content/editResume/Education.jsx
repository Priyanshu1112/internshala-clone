import React, { useEffect, useState } from "react";
import Graduation from "./education/Graduation";
import SeniorSecondary from "./education/SeniorSecondary";
import Secondary from "./education/Secondary";
import { useSelector } from "react-redux";

const Education = () => {
  const { student } = useSelector((state) => state.student);
  const [graduation, setGraduation] = useState(false);
  const [seniorSecondary, setSeniorSecondary] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [isPresent, setIsPresent] = useState({
    secondary: false,
    seniorSecondary: false,
  });

  useEffect(() => {
    student.resume?.education?.map((edu) => {
      console.log(edu.educationLevel);
      console.log(edu.educationLevel == "secondary");
      console.log(edu.educationLevel == "seniorSecondary");
      if (edu.educationLevel == "secondary") {
        setIsPresent((prevState) => ({
          ...prevState,
          secondary: true,
        }));
        console.log(isPresent);
      } else if (edu.educationLevel == "seniorSecondary") {
        setIsPresent((prevState) => ({
          ...prevState,
          seniorSecondary: true,
        }));
        console.log(isPresent);
      }
    });
  }, []);

  useEffect(() => {
    console.log(isPresent);
  }, [isPresent]);

  const CloseHandler = () => {
    setGraduation(false);
    setSeniorSecondary(false);
    setSecondary(false);
  };

  return (
    <div className="sm:w-[30vw] mx-auto">
      <div className="text-end pe-3 text-lg">
        {graduation || seniorSecondary || secondary ? (
          <i
            onClick={CloseHandler}
            className="ri-close-line cursor-pointer"
          ></i>
        ) : (
          ""
        )}
      </div>
      <p className="text-xl text-slate-800 mb-4 font-bold text-center">
        Education
      </p>
      <div>
        {graduation ? (
          <Graduation />
        ) : seniorSecondary ? (
          <SeniorSecondary />
        ) : secondary ? (
          <Secondary />
        ) : (
          ""
        )}
      </div>
      <div
        className="ps-4"
        style={{
          display:
            graduation || seniorSecondary || secondary ? "none" : "block",
        }}
      >
        <p
          className="text-sky-600 mt-2 cursor-pointer"
          onClick={() => {
            setGraduation(true);
          }}
        >
          + Add graduation/ post graduation
        </p>
        {!isPresent.seniorSecondary ? (
          <p
            className="text-sky-600 mt-2 cursor-pointer"
            onClick={() => {
              setSeniorSecondary(true);
            }}
          >
            + Add senior secondary (XII)
          </p>
        ) : (
          ""
        )}
        {!isPresent.secondary ? (
          <p
            className="text-sky-600 mt-2 cursor-pointer"
            onClick={() => {
              setSecondary(true);
            }}
          >
            + Add secondary (X)
          </p>
        ) : (
          ""
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Education;
