/* eslint-disable no-useless-concat */
import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { socials, state_false, state_true } from "../namelist";
import M from "materialize-css";
import CopyLink from "../copyLink";
import ShowQR from "../ShowQR";
import GetVCard from "../GetVCard";
//const { copyLink } = require("../copyLink");
//var fs = require('fs');

const UserProfile = () => {
  const listRef = useRef();
  const navigate = useNavigate();
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );

  useEffect(() => {
    //this use effect is to get user info
    fetch(`/api/user/${userid}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems);
    }, 2000);
  }, []);

  const GoRegistration = (event) => {
    event.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({ html: "invalid email", classes: "red darken-3" });
    }
    M.toast({ html: `user profile id is ${userProfile.user._id} ${userid}` });
    fetch("/api/bind-email", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    //navigate(`/setup/${userid}/${password}`)
  };

  return (
    <>
      {/* <button onClick={testRoute("miao")}>api</button> */}
      {userProfile ? (
        userProfile.user.isInitialized == true ? (
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            {/* {console.log("userprofile.user is ", userProfile.user)} */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "3px solid grey",
              }}
            >
              <div>
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "80px",
                  }}
                  src={userProfile.user.pic}
                />
              </div>
              <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>

                <div key="getVCard">
                  <GetVCard userProfile={userProfile} />
                </div>
              </div>

              {/* <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4>Modal Header</h4>
                  <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                  <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
              </div> */}
            </div>
            {userProfile.user.notes ? (
              <>
                <div style={{ textAlign: "center" }}>About Me:</div>
                {/* <textarea style={{ textAlign: "center", border:"none", row:"10" }}>{userProfile.user.notes}</textarea> */}
                <div
                  style={{
                    textAlign: "center",
                    border: "none",
                    "white-space": "pre-wrap",
                  }}
                >
                  {userProfile.user.notes}
                </div>
              </>
            ) : (
              <div>b</div>
            )}
            <div>
              <div>
                <ShowQR />
              </div>
            </div>
            <div style={{ borderBottom: "3px solid grey" }}></div>
            <br></br>
            {/* <div className='social'>
              <div className="collection-wrapper" >
                {
                  socials.map((item, index) => {
                    return (
                      <>
                        {userProfile.user[item.id] ?
                            <div 
                            className="collection-item" key={item.id + "_key"}>
                              <img id="social-logo" 
                                key={item.id + "_img"}
                                className="circle modal-trigger"
                                href={"#modal" + item.id}
                                src={item.src}
                                alt={item.id}
                              />
                              <div id={"modal" + item.id} className="modal bottom-sheet">
                                <div className="modal-content">
                                  <h4 style={{ textAlign: "center" }}>{item.title}</h4>
                                  <p style={{ textAlign: "center" }}>
                                    <a target="_blank" href={item.link + userProfile.user[item.id]}>
                                      {item.link}{userProfile.user[item.id]}
                                    </a>
                                    <div></div>
                                    <button onclick={() => {
                                      copyLink(item.id)
                                    }}> COPY </button>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                  </p>
                                </div>
                              </div>
                            </div>
                            :
                            ""
                        }
                      </>
                    )
                  })
                }
              </div>
            </div> */}
            <div className="social">
              <div className="collection-wrapper">
                {socials.map((item, index) => {
                  return (
                    <>
                      {userProfile.user[item.id] ? (
                        <div className="collection-item" key={item.id + "_key"}>
                          <div
                            className="modal-trigger"
                            href={"#modal" + item.id}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              id="social-logo"
                              key={item.id + "_img"}
                              className="circle"
                              src={item.src}
                              alt={item.id}
                            />
                          </div>
                          <div
                            id={"modal" + item.id}
                            className="modal bottom-sheet"
                          >
                            <div className="modal-content">
                              <h4 style={{ textAlign: "center" }}>
                                {item.title}
                              </h4>
                              <p style={{ textAlign: "center" }}>
                                <a
                                  target="_blank"
                                  href={item.link + userProfile.user[item.id]}
                                >
                                  {item.link}
                                  {userProfile.user[item.id]}
                                </a>

                                <div>
                                  <CopyLink
                                    link={item.link + userProfile.user[item.id]}
                                  />
                                </div>
                                {/* <button
                                  onClick={() => {
                                    copyLink("item.id");
                                  }}
                                >
                                  {" "}
                                  COPY{" "}
                                </button> */}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </div>
            </div>

            <br></br>
            <div style={{ borderBottom: "3px solid grey" }}></div>
            <br></br>
            <br></br>
            <>
              {/* https://youtu.be/OImBxPnTLZw?t=185 */}
              {/* <iframe style={{ textAlign: "center" }} width="420" height="315" src="https://www.youtube.com/embed/gCZ3y6mQpW0&list=PL4cUxeGkcC9gGrbtvASEZSlFEYBnPkmff" title="description"></iframe>
               */}
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </>
          </div>
        ) : (
          <>
            <div className="mycard">
              <div className="card auth-card input-field">
                <h2>Email Activation</h2>

                <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          type="text"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="active" for="email">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          type="password"
                          placeholder="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="active" for="password">
                          Password from Card Cover
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="notes">
                    <p>Notes:</p>
                    <p>
                      An email containing a link for activation will be sent to
                      the email address provided above for the purpose of
                      binding the account. Please click on the link in the email
                      to complete the activation process.
                    </p>
                  </div>
                </div>
                <button
                  className="btn waves-effect waves-light blue darken-2"
                  onClick={GoRegistration}
                >
                  Bind
                </button>
                {console.log(userProfile.user)}
              </div>
            </div>
          </>
        )
      ) : (
        <h2>loading...!</h2>
      )}
    </>
  );
};

export default UserProfile;
