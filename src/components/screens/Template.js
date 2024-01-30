import React from "react";
import Footer from "../function/Footer";
import { useNavigate } from "react-router-dom";

function Template(props) {
  return (
    <div>
      <div className="row sm:max-w-xl md:max-w-xl lg:max-w-2xl text-left p-6">
        <br></br>
        <h6 className="container text-center text-5xl font-sans">
          Terms of Service
        </h6>
        <br></br>
        <br></br>
      </div>
      <Footer />
    </div>
  );
}

export default Template;
