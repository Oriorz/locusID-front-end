import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { socials, state_false, state_true } from "../../components/namelist";
import M from "materialize-css";
//var fs = require('fs');

const UserProfile = () => {
  const listRef = useRef();
  const navigate = useNavigate();

  /* document.addEventListener('DOMContentLoaded', initM());
  const initM = () => {
    console.log('DOMContentLoaded initM loaded top of UserProfile');
  }
  document.addEventListener('onload', (event) => {
    console.log('loadCollapsible loaded top of UserProfile');
  });
  document.addEventListener('mouseup', (event) => {
    console.log('mouseup loaded top of UserProfile');

  }); */
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  const [qr, setQr] = useState(null);

  useEffect(() => {
    //this use effect is to get user info
    fetch(`/user/${userid}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.user);
        setProfile(result);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      /* var elems = document.querySelectorAll('.collapsible');
      var instance = M.Collapsible.init(elems, {
        accordion: true
      }); */

      //loadModal()
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems);
      console.log("after timeout");
    }, 2000);
    //console.log("useEffect loadCollapsible loaded 2")
    console.log("modal loaded");
  }, []);

  const generateQR = async (text) => {
    var QRCode = require("qrcode");
    try {
      //console.log(await QRCode.toString(text, {type:'terminal'}))
      var qrstring = await QRCode.toDataURL(text);
      //console.log(qrstring)
      return qrstring;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // try to use IIFE for generateQR async function
    (async () => {
      const genQR = await generateQR(window.location.href);
      setQr(genQR);
      //console.log("this is from useEffect", genQR)
    })();

    return () => {};
  }, []);

  const toAscii = (text) => {
    const value = text.charCodeAt(0).toString();
    const numValue = parseInt(value);
    if (
      (numValue <= 122 && numValue >= 97) ||
      (numValue >= 65 && numValue <= 90) ||
      (numValue >= 48 && numValue <= 57) ||
      numValue == 46
    ) {
      return text;
    }
    if (numValue < 16) {
      return "%0" + text.charCodeAt(0).toString(16);
    }
    return "%" + text.charCodeAt(0).toString(16);
  };
  const stringToAscii = (text) => {
    var resultString = "";
    for (var i = 0; i < text.length; i++) {
      resultString += toAscii(text[i]);
    }
    return resultString;
  };

  const getVCard = () => {
    //var resultString = stringToAscii("BEGIN:VCARD")

    const vCard = new VCard();
    userProfile.user.name
      ? vCard.addName(userProfile.user.name)
      : vCard.addName("My Name");
    //vCard.addName(userProfile.user.name)
    //vCard.addGender()
    //vCard.addBday("20100101")
    vCard.addEmail(userProfile.user.email);
    console.log("getvcard called");
    if (userProfile.user.workemail) {
      console.log("workemail called", userProfile.user.workemail);
      vCard.addEmail(userProfile.user.workemail, "work-email");
    }
    //https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png
    //vCard.addPhoto("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png")
    //vCard.addLogo("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png")

    if (userProfile.user.phone) {
      vCard.addPhone(userProfile.user.phone);
    }
    if (userProfile.user.homephone) {
      vCard.addPhone(userProfile.user.homephone, "home");
    }
    if (userProfile.user.workphone) {
      vCard.addPhone(userProfile.user.workphone, "work");
    }
    if (userProfile.user.homefax) {
      vCard.addPhone(userProfile.user.homefax, "home,fax");
    }
    if (userProfile.user.workfax) {
      vCard.addPhone(userProfile.user.workfax, "work,fax");
    }

    if (userProfile.user.nickname) {
      vCard.addNick(userProfile.user.nickname);
    }
    if (userProfile.user.title) {
      vCard.addTitle(userProfile.user.title);
    }
    if (userProfile.user.role) {
      vCard.addRole(userProfile.user.role);
    }
    if (userProfile.user.organization) {
      vCard.addOrg(userProfile.user.organization);
    }

    //vCard.addNick("Nick Fury")
    //vCard.addTitle("Crash Test Dummy")
    //vCard.addRole("CEO cum CFO")
    //vCard.addOrg("Furry Corporation")
    vCard.addUrl("https://url.com");
    vCard.addUrl("https://url.work.com", "WORK");

    vCard.addAddress(
      "49, jalan jaya 11, Rini Height, Taman Mutiara Rini, 81300 Skudai, Johor, Malaysia",
      "s"
    );

    //vCard.addNote(notes)
    if (userProfile.user.notes) {
      vCard.addNote(userProfile.user.notes);
    }
    socials.map((item) => {
      if (state[item.id]) {
        if (item.id === "wechat") {
          vCard.addSocial(item.shortlink + state[item.id], item.vcard, ":");
        } else {
          vCard.addSocial(item.shortlink + state[item.id], item.vcard);
        }
      }
    });

    var greeting = vCard.export();
    greeting = stringToAscii(greeting);
    M.toast({ html: greeting });
    window.open("data:text/x-vcard;urlencoded," + greeting);

    //var data = "BEGIN%3AVCARD%aVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
    //window.open("data:text/x-vcard;urlencoded," + data);
  };

  function VCard() {
    // assigning  parameter values to the calling object
    this.vcard = "BEGIN:VCARD\nVERSION:3.0";
    this.last = "END:VCARD";

    this.addName = function (name) {
      this.vcard += "\n" + "N;CHARSET=UTF-8:" + name;
    };

    this.addGender = function (gender = "F") {
      this.vcard += "\n" + "GENDER:" + gender;
    };

    this.addBday = function (bday) {
      this.vcard += "\n" + "BDAY:" + bday;
    };

    this.addEmail = function (text, type = "Home-email") {
      this.vcard +=
        "\n" + "EMAIL;CHARSET=UTF-8;type=" + type + ",INTERNET:" + text;
    };

    this.addPhoto = function (url) {
      this.vcard += "\n" + "PHOTO;TYPE=png:" + url;
    };

    this.addLogo = function (url) {
      this.vcard += "\n" + "LOGO;TYPE=png:" + url;
    };

    this.addPhone = function (number, type = "Cell") {
      this.vcard += "\n" + "TEL;TYPE=" + type + ":" + number;
    };

    this.addUrl = function (text, type) {
      if (type) {
        this.vcard += "\n" + "URL;type=" + type + ";CHARSET=UTF-8:" + text;
        return;
      }
      this.vcard += "\n" + "URL;CHARSET=UTF-8:" + text;
    };

    this.addNick = function (text) {
      this.vcard += "\n" + "NICKNAME;CHARSET=UTF-8:" + text;
    };

    this.addTitle = function (text) {
      this.vcard += "\n" + "TITLE;CHARSET=UTF-8:" + text;
    };
    this.addRole = function (text) {
      this.vcard += "\n" + "ROLE;CHARSET=UTF-8:" + text;
    };
    this.addOrg = function (text) {
      this.vcard += "\n" + "ORG;CHARSET=UTF-8:" + text;
    };

    this.addNote = function (text) {
      this.vcard += "\n" + "NOTE;CHARSET=UTF-8:" + text;
    };

    this.addAddress = function (text, type = "work" || "home") {
      if (type == "home") {
        //LABEL;CHARSET=UTF-8;TYPE=HOME:Home Address
        this.vcard += "\n" + "LABEL;CHARSET=UTF-8;TYPE=HOME:Home Address";
        this.vcard += "\n" + "ADR;CHARSET=UTF-8;TYPE=HOME:" + text;
        return;
      }
      this.vcard += "\n" + "LABEL;CHARSET=UTF-8;TYPE=WORK:Work Address";
      this.vcard += "\n" + "ADR;CHARSET=UTF-8;TYPE=WORK:" + text;
    };

    this.addSocial = function (text, type = "custom", header = ":https://") {
      this.vcard += "\n" + "X-SOCIALPROFILE;TYPE=" + type + header + text;
    };

    this.export = function () {
      return this.vcard + "\n" + this.last;
    };
  }

  const getVCard2 = () => {
    var BEGINVCARD = "BEGIN%3AVCARD%0AVERSION%3A3.0";
    //var data = "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
    //window.open("data:text/x-vcard;urlencoded," + data);

    /* var vCardsJS = require('vcards-js');
    var vCard = vCardsJS(); */
    /* vCard.firstName = 'Eric';
    vCard.middleName = 'J';
    vCard.lastName = 'Nesser';
    vCard.organization = 'ACME Corporation';
    vCard.workPhone = '312-555-1212';
    vCard.birthday = new Date(1985, 0, 1);
    vCard.title = 'Software Developer';
    vCard.url = 'https://github.com/enesser';
    vCard.note = 'Notes on Eric'; */
    //vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');

    const VCard = require("vcard-creator").default;

    // Define a new vCard
    const myVCard = new VCard();

    const lastname = userProfile.user.name;
    //const lastname = "miao"
    //console.log(userProfile.user.name)
    const firstname = "Jeroen";
    const additional = "";
    const prefix = "";
    const suffix = "";

    myVCard
      // Add personal data
      .addName(lastname, firstname, additional, prefix, suffix);

    // Add work data
    /* .addCompany('Siesqo')
    .addJobtitle('Web Developer')
    .addRole('Data Protection Officer')
    .addEmail('info@jeroendesloovere.be')
    .addPhoneNumber(1234121212, 'PREF;WORK')
    .addPhoneNumber(123456789, 'WORK')
    .addAddress(null, null, 'street', 'worktown', null, 'workpostcode', 'Belgium')
    .addURL('http://www.jeroendesloovere.be') */

    console.log("theVcard is ", myVCard.toString());
    //window.open("data:text/x-vcard;urlencoded," + myVCard.toString());
    M.toast({ html: myVCard.toString() });
  };

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            //user:data
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            //user:data
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  const loadCollapsible = () => {
    document.addEventListener("DOMContentLoaded", (event) => {
      console.log("loadCollapsible loaded");
    });
    /* document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.collapsible');
      var instance = M.Collapsible.init(elems, {
        accordion: true
      });
      instance.open();
      console.log("loadCollapsible loaded")
    }) */
  };

  const loadModal = () => {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".modal");
      var instances = M.Modal.init(elems);
    });
  };

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
    fetch("/bind-email", {
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
      {userProfile ? (
        userProfile.user.isInitialized == true ? (
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            {loadCollapsible()}
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
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src={userProfile.user.pic}
                />
              </div>
              <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
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
                <div>Note:</div>
                <div>{userProfile.user.notes}</div>
              </>
            ) : (
              <div>b</div>
            )}
            <div key="getVCard">
              <button
                className="btn waves-effect waves-light green darken-3"
                onClick={() => getVCard()}
              >
                Get Contact
              </button>
            </div>
            <div>
              <div>
                {qr ? (
                  <div>
                    <div>
                      {" "}
                      <img src={qr} />{" "}
                    </div>
                  </div>
                ) : (
                  <div> Loading QR </div>
                )}
              </div>
            </div>
            <div className="social">
              <div className="collection-wrapper">
                {socials.map((item, index) => {
                  return (
                    <>
                      {
                        //userProfile?
                        userProfile.user[item.id] ? (
                          //console.log("asdf", userProfile.user[item.id])
                          <div
                            className="collection-item"
                            key={item.id + "_key"}
                          >
                            <img
                              key={item.id + "_img"}
                              className="circle modal-trigger"
                              href={"#modal" + item.id}
                              src={item.src}
                              alt={item.id}
                            />

                            {/* <a className="waves-effect waves-light btn modal-trigger" href={"#modal" + item.id} style={{ textAlign: "center" }}>
                                {item.id}
                              </a> */}
                            <div
                              id={"modal" + item.id}
                              className="modal bottom-sheet"
                            >
                              {/* <div id={"modal" + item.id} className="modal"> */}
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

                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <p>click anywhere to close this tab</p>
                                </p>
                              </div>
                              {/* <div className="modal-footer">
                                  <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                                </div> */}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      }
                    </>
                  );
                })}
              </div>
              <ul className="collection">
                {socials.map((item, index) => {
                  return (
                    <>
                      {userProfile.user[item.id] ? (
                        <li
                          className="collection-item avatar"
                          key={item.id + "_key"}
                        >
                          <img
                            key={item.id + "_img"}
                            className="circle"
                            src={item.src}
                            alt={item.id}
                          />
                          <span className="title">{item.title}</span>
                          <p>
                            <a
                              target="_blank"
                              href={item.link + userProfile.user[item.id]}
                            >
                              {item.link}
                              {userProfile.user[item.id]}
                            </a>
                          </p>
                          <a
                            className="waves-effect waves-light btn modal-trigger"
                            href={"#modal" + item.id}
                          >
                            {item.id}
                          </a>
                          <div
                            id={"modal" + item.id}
                            className="modal bottom-sheet"
                          >
                            <div className="modal-content">
                              <h4>{item.id}</h4>
                              <p>
                                <a
                                  target="_blank"
                                  href={item.link + userProfile.user[item.id]}
                                >
                                  {item.link}
                                  {userProfile.user[item.id]}
                                </a>
                              </p>
                            </div>
                            <div className="modal-footer">
                              <a
                                href="#!"
                                className="modal-close waves-effect waves-green btn-flat"
                              >
                                Agree
                              </a>
                            </div>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </ul>
            </div>

            {loadCollapsible()}
          </div>
        ) : (
          <>
            <div className="mycard">
              <div className="card auth-card input-field">
                <h2>Email Binding</h2>

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
