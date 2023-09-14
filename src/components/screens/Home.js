import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import M from "materialize-css";
import Footer from "./Footer";

const Home = () => {
  useEffect(() => {
    // Initialize the accordion when the component mounts
    const elems = document.querySelectorAll(".collapsible");
    const instances = M.Collapsible.init(elems);
    // Clean up the accordion when the component unmounts
    return () => instances.destroy();
  }, []);

  return (
    <div>
      <div className="home">
        <div className="max-w-xl mx-auto my-0 p-2" >
          <div
            className="flex justify-around my-5 mx-auto border-b-2"
          ></div>
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">First</div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">Second</div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
            <li>
              <div className="collapsible-header">Third</div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="social"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
