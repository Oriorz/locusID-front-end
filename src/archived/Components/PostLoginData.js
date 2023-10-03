import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
// this is an attempt to extract the Post Login Data portion from the login page
// but i think i failed, i will just use Login.js for now
export const PostLoginData = ({ password, email }) => {
  const { state, dispatch } = useContext(UserContext);
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return M.toast({ html: "invalid email", classes: "red darken-3" });
  }
  fetch("/api/signin", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        M.toast({ html: data.error, classes: "red darken-3" });
      } else {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        M.toast({ html: "signed in success", classes: "green darken-1" });
        /* navigate("/profile"); */
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
