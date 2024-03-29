/* eslint-disable no-useless-concat */
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import M from "materialize-css";
import ShowQR from "../function/ShowQR";
import EmailActivation from "../function/EmailActivation";
import { FloatSignin } from "../function/FloatSignin";
import { ProfileNotes } from "../function/ProfileNotes";
import { CreateLink } from "../function/CreateLink";
import { ProfileSocials } from "../function/ProfileSocials";
import HorizontalCard from "../function/HorizontalCard";
import CoverPhoto from "../function/CoverPhoto";
import UserContact from "../function/UserContact";
import { ProfileSales } from "../function/ProfileSales";
import { ProfileGames } from "../function/ProfileGames";
import HeroSection from "../function/HeroSection";
//const { copyLink } = require("../copyLink");
//var fs = require('fs');

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext); // user state context
  /* const listRef = useRef();
  const navigate = useNavigate(); */
  const [userProfile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userid } = useParams();
  /* const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  ); */
  /* const [token, setToken] = useState(getToken()) */
  const [token, setToken] = useState(false);
  const [theme, setTheme] = useState("root");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const themeList = [
    "theme-purple",
    "theme-green",
    "theme-black",
    "theme-brown",
    "theme-red",
    "theme-yellow",
  ];
  useEffect(() => {
    const userToken = getToken();
    setToken(userToken);
  }, []);

  useEffect(() => {
    themeList.forEach((item) => {
      document.documentElement.classList.remove(item);
    });
    if (theme === "root") {
    } else {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleOrgChange = (event) => {
    setOrganization(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEdit = (value, text) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/api/updatedetails/${text}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        value: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({ user: data });
        console.log("/api/updatedetails/name result is ", data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, [text]: data[text] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: text, theValue: data[text] },
        });
        //window.location.reload()
      });
  };

  const getToken = () => {
    const tokenString = localStorage.getItem("jwt");
    /* const userToken = JSON.parse(tokenString) */
    /* return userToken?.token */
    return tokenString;
  };

  //this use effect is to get user info
  useEffect(() => {
    console.log("get user info for user profile");
    fetch(`/api/user/${userid}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        //pending setTheme
        /* if (result.user.firsttime) {
          localStorage.clear();

        } */
        if (result.user.theme) {
          setTheme(result.user.theme);
        }
        console.log("profile is ", result);
      });
  }, [userid]);

  useEffect(() => {
    setTimeout(() => {
      var elems = document.querySelectorAll(".modal");
      M.Modal.init(elems);
      var elems1 = document.querySelectorAll("select");
      M.FormSelect.init(elems1);
      var elems2 = document.querySelectorAll(".collapsible");
      M.Collapsible.init(elems2, {
        container: document.body,
        constrainWidth: false,
      });
    }, 2000);
    var elemsa = document.querySelectorAll(".modal");
    M.Modal.init(elemsa);
    var elemsb = document.querySelectorAll("select");
    M.FormSelect.init(elemsb);
    var elemsc = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elemsc, {
      container: document.body,
      constrainWidth: false,
    });
  }, []);

  return (
    <div>
      {userProfile ? (
        userProfile.user.isInitialized === true ? (
          <>
            <FloatSignin
              token={token}
              setToken={setToken}
              setTheme={setTheme}
              theme={theme}
              setProfile={setProfile}
              userProfile={userProfile}
            />
            <div /* className="flex flex-col justify-center items-center" */>
              <CoverPhoto token={token} userProfile={userProfile} />
              <div className="sm:max-w-4xl md:max-w-4xl lg:max-w-6xl mx-auto bg-skin-fill">
                <div className="h-28"> </div>
                <div className="flex flex-col items-center justify-center -z-10 my-5 mx-auto w-11/12 border-b-2 border-skin-base pb-4">
                  {userProfile && (
                    <>
                      <h1 className="font-poppins text-3xl text-skin-base ">
                        {userProfile.user.name
                          ? userProfile.user.name
                          : "Your Name"}{" "}
                        {token && (
                          <i
                            className="material-icons modal-trigger ml-2 mr-1 mb-0 bg-skin-fill border-skin-base border-solid border-2 select-none"
                            href={"#modal" + "editName"}
                          >
                            edit
                          </i>
                        )}
                      </h1>
                      <p className="font-poppins text-lg text-skin-base text-center">
                        {userProfile.user.title
                          ? userProfile.user.title
                          : "Your Title"}{" "}
                        {token && (
                          <i
                            className="material-icons modal-trigger ml-2 mr-1 mb-0 bg-skin-fill border-skin-base border-solid border-2 select-none"
                            href={"#modal" + "editTitle"}
                          >
                            edit
                          </i>
                        )}
                      </p>
                      <p className="font-poppins sm:text-md italic md:text-lg text-skin-base mb-3 text-center">
                        {userProfile.user.organization
                          ? userProfile.user.organization
                          : "Your Organization"}
                        {token && (
                          <i
                            className="material-icons modal-trigger ml-2 mr-1 mb-0 bg-skin-fill border-skin-base border-solid border-2 select-none"
                            href={"#modal" + "editOrg"}
                          >
                            edit
                          </i>
                        )}
                      </p>
                      <div
                        id={"modal" + "editName"}
                        className="modal bottom-sheet"
                      >
                        <div className=" mx-auto p-0 flex flex-col items-center">
                          <p className="text-md mt-3 mb-1 p-1 underline">
                            {" "}
                            Old Name : {userProfile.user.name}
                          </p>
                        </div>
                        <p className="text-md m-1 p-1 text-center">
                          {" "}
                          Change to{" "}
                        </p>
                        <div className="row items-center justify-around  max-w-lg mx-auto mt-2">
                          <p className="col s2 text-black items-center justify-around text-md">
                            {" "}
                            New:{" "}
                          </p>
                          <input
                            className="browser-default text-sm col s10 "
                            defaultValue={userProfile.user.name}
                            onChange={handleNameChange}
                          />
                        </div>
                        <div className="mx-auto items-center justify-center flex mb-2 pb-2">
                          <button
                            className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                            onClick={() => {
                              if (!name) {
                                M.toast({ html: "Please key in name" });
                                return;
                              }
                              handleEdit(name, "name");
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div
                        id={"modal" + "editOrg"}
                        className="modal bottom-sheet"
                      >
                        <div className=" mx-auto p-0 flex flex-col items-center">
                          <p className="text-md mt-3 mb-1 p-1 underline">
                            {" "}
                            Old Organization : {userProfile.user.organization}
                          </p>
                        </div>
                        <p className="text-md m-1 p-1 text-center">
                          {" "}
                          Change to{" "}
                        </p>
                        <div className="row items-center justify-around  max-w-lg mx-auto mt-2">
                          <p className="col s2 text-black items-center justify-around text-md">
                            {" "}
                            New:{" "}
                          </p>
                          <input
                            className="text-sm col s10"
                            defaultValue={userProfile.user.organization}
                            onChange={handleOrgChange}
                          />
                        </div>
                        <div className="mx-auto items-center justify-center flex mb-2 pb-2">
                          <button
                            className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                            onClick={() => {
                              if (!organization) {
                                M.toast({ html: "Please key in organization" });
                                return;
                              }
                              handleEdit(organization, "organization");
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                            Cancel
                          </button>
                        </div>
                      </div>
                      <div
                        id={"modal" + "editTitle"}
                        className="modal bottom-sheet"
                      >
                        <div className=" mx-auto p-0 flex flex-col items-center">
                          <p className="text-md mt-3 mb-1 p-1 underline">
                            {" "}
                            Old Title : {userProfile.user.title}
                          </p>
                        </div>
                        <p className="text-md m-1 p-1 text-center">
                          {" "}
                          Change to{" "}
                        </p>
                        <div className="row items-center justify-around  max-w-lg mx-auto mt-2">
                          <p className="col s2 text-black items-center justify-around text-md">
                            {" "}
                            New:{" "}
                          </p>
                          <input
                            className="text-sm col s10"
                            defaultValue={userProfile.user.title}
                            onChange={handleTitleChange}
                          />
                        </div>
                        <div className="mx-auto items-center justify-center flex mb-2 pb-2">
                          <button
                            className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                            onClick={() => {
                              if (!title) {
                                M.toast({ html: "Please key in Title" });
                                return;
                              }
                              handleEdit(title, "title");
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  <UserContact
                    userProfile={userProfile}
                    token={token}
                    setProfile={setProfile}
                  />
                </div>
                <ProfileNotes
                  userProfile={userProfile}
                  token={token}
                  setProfile={setProfile}
                />
                <div>
                  <ShowQR />
                </div>

                <CreateLink userProfile={userProfile} token={token} />
                <div className="border-b-2  border-skin-base w-11/12 mx-auto"></div>

                {/* <HeroSection userProfile={userProfile} token={token} /> */}
                <ProfileSocials userProfile={userProfile} token={token} />

                {/* <div className="border-b-2 border-skin-base w-11/12 mx-auto"></div> */}

                <ProfileSales userProfile={userProfile} token={token} />

                <ProfileGames userProfile={userProfile} token={token} />
                <>
                  <HorizontalCard userProfile={userProfile} token={token} />

                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </>
              </div>
            </div>
          </>
        ) : (
          <EmailActivation
            userProfile={userProfile}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            userid={userid}
          />
        )
      ) : (
        <div>
          <div className="w-full h-60 bg-blue-100  opacity-50 z-20 flex flex-col items-center justify-center">
            <div className="w-52 h-52 rounded-full bg-white absolute top-36 z-40 border-2 border-solid border-skin-base opacity-100"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
