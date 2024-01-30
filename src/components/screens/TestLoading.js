import React from "react";
import Footer from "../function/Footer";
import { useNavigate } from "react-router-dom";

function Loading(props) {
  return (
    <div>
      <div className="w-full h-60 bg-blue-100  opacity-50 z-20 flex flex-col items-center justify-center">
        <div className="w-52 h-52 rounded-full bg-white absolute top-36 z-40 border-2 border-solid border-skin-base opacity-100"></div>
      </div>
    </div>
  );
}

export default Loading;
