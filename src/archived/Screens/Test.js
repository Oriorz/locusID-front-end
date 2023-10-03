import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import {
  socials,
  single,
  socials_false,
  socials_true,
} from "../../components/namelist";
import M from "materialize-css";

const Test = () => {
  return (
    <div className="test">
      TEST
      <button onClick={() => console.log("test")}>Check Status</button>
    </div>
  );
};

export default Test;
