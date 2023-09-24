import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FirstTimeSetup = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const SetAccountPassword = () => {
    fetch(`/api/new-account`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
        /* name, */
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/signin");
        console.log(result);
      });
  };

  return (
    <>
    <div className="mycard auth-card font-rubikdirt text-[70px] mt-3 py-1">iTap </div>
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="text-2xl">Setup New Password</h2>
        {/* <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div></div>
        <div></div>
        <button
          className="btn waves-effect waves-light blue darken-2"
          onClick={() => SetAccountPassword()}
        >
          Set Password
        </button>
      </div>
    </div>
    </>
  );
};

export default FirstTimeSetup;
