import React, { useEffect, useRef, useState } from "react";

import Content from "./content/Content";
import Navbar from "./navbars/Navbar";
import NavSide from "./navbars/NavSide";
import NavBottom from "./navbars/NavBottom";

const Home = () => {
  const [showNavSide, setshowNavSide] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);
  const homeElementRef = useRef(null);

  useEffect(() => {
    console.log("HOME");
    const home = homeElementRef.current;
    const handleScroll = () => {
      // console.log("handleScroll called");
      const currentScroll = home.scrollTop;

      if (currentScroll > prevScroll) {
        setScrollUp(true);
      } else {
        setScrollUp(false);
      }
      setPrevScroll(currentScroll);
    };
    home.addEventListener("scroll", handleScroll);

    return () => {
      home.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={homeElementRef}
      className="overflow-y-scroll home overflow-x-hidden h-screen"
    >
      <Navbar setshowNavSide={setshowNavSide} />

      <NavSide showNavSide={showNavSide} setshowNavSide={setshowNavSide} />
      <Content />

      <NavBottom scrollUp={scrollUp} /> 
    </div>
  );
};

export default Home;
