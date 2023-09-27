import React, { useEffect, useState, useRef } from "react";
import M from "materialize-css";
import { socials, sales } from "../namelist";
import CopyLink from "./copyLink";

export const ProfileSales = ({ userProfile, token }) => {
  const [selectedApp, setSelectedApp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [app, setApp] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [pattern, setPattern] = useState("");
  const [example, setExample] = useState("");
  const [isUrl, setIsUrl] = useState(true);
  const [profile, setProfile] = useState(userProfile.user);
  const editRef = useRef();
  const [clip, setClip] = useState("");

  useEffect(() => {
    if (app) {
      const selectedSocialObj = sales.find((social) => social.value === app);
      setLink(selectedSocialObj ? selectedSocialObj.link : "");
      setExample(selectedSocialObj ? selectedSocialObj.example : "");
      setIsUrl(selectedSocialObj ? selectedSocialObj.isUrl : "");
      setPattern(selectedSocialObj ? selectedSocialObj.pattern : "")
    }
    /* navigator.clipboard.readText().then((text) => {
      setClip(text)
    }); */
  }, [app]);

  const handleChange = (event) => {
    setApp(event.target.value);
    /* console.log(event.target.value) */
    /* const selectedSocialObj = sales.find((social) => social.value === event.target.value);
    setLink(selectedSocialObj ? selectedSocialObj.link : ''); */
    setName("");
  };

  const handleNameChange = (event) => {
    console.log("app is ", app);

    const inputValue = event.target.value;
    // const pattern = {"regex" : /.*\/([^/?]+)\/?.*$/}
    const regex = new RegExp(pattern, 'i')
    // const regex = new RegExp(pattern.regex, 'i')
    // const regex = /.*\/([^/?]+)\/?.*$/;
    const match = inputValue.match(regex);
    console.log("match ", match)
    if (match) {
      const extractedValue = match[1];
      setName(extractedValue);
    } else {
      setName(inputValue);
    }
  };

  const handleCreate = () => {
    const fullLink =
      link + name.replaceAll(" ", "");
    fetch(`/createsales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        sales: {
          app,
          name: name,
          link: fullLink,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("create sales result is ", result);
        window.location.reload();
      });
  };

  const handleDelete = (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/deletesales`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        sales: {
          _id,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("delete sales result is ", result);
      });
  };

  const handleEdit = (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    //sanitize link : remove "https://" and lowercase it
    const httpsLink =
      link + name.replaceAll(" ", "");
    console.log("httpsLink : ", httpsLink);
    /* const cleanLink = httpsLink.replace(/^https?:\/\//, '') */
    fetch(`/editsales`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        sales: {
          app,
          name,
          link: httpsLink,
          _id,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("edit sales result is ", result);
        window.location.reload();
      });
  };

  const Dropdown1 = ({ label, value, options, onChange }) => {
    useEffect(() => {
      var elems1 = document.querySelectorAll("select");
      var instances1 = M.FormSelect.init(elems1);
    }, []);

    return (
      <div className="max-w-lg items-center justify-around mx-auto">
        <label>{label}</label>
        <select
          className="select browser-default"
          defaultValue={value}
          onChange={onChange}
        >
          <option key="empty" value="">
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="social ">
      <div className=" grid w-11/12 my-0 mx-auto grid-cols-4 sm:grid-cols-4 md:grid-cols-5 gap-5">
        {profile.sales
          ? profile.sales.map((item) => {
            return (
              <div className="collection-item" key={item._id + "_key"}>
                <div
                  className="modal-trigger flex justify-center"
                  href={"#modal" + item._id}
                >
                  <img
                    id="social-logo"
                    key={item._id + "_img"}
                    className="circle   border-skin-base shadow-md shadow-skin"
                    style={{ borderWidth: 1 }}
                    src={`../images/${item.app}.png`}
                    alt="gg"
                    onClick={() => setApp(item.app)}
                  />
                </div>
                <div id={"modal" + item._id} className="modal bottom-sheet">
                  <div className=" mx-auto p-0">
                    {isUrl ? (
                      token ? (
                        <>1</>
                      ) : (
                        <>2
                          <div className="m-3 p-3">
                            <p>Go to :</p>

                            <a
                              className="text-xl m-3 p-3 btn items-center justify-center my-auto text-center flex"
                              href={item.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {" "}
                              {item.name}{" "}
                            </a>
                          </div>
                        </>
                      )
                    ) : token ? (
                      <>3</>
                    ) : (
                      <>4
                        <div>Copy Link : </div>
                        <CopyLink link={link} />
                      </>
                    )}
                    {/* {token ? (
                        <p className="text-xl m-2 p-1"> Edit or Delete </p>
                      ) : (
                        <div className="m-3 p-3">
                          <p>Go to :</p>

                          <a
                            className="text-xl m-3 p-3 btn items-center justify-center my-auto text-center flex"
                            href={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {" "}
                            {item.name}{" "}
                          </a>
                          <p>
                            This is {item.app}, {isUrl ? "TRUE" : "FALSE"}
                          </p>
                        </div>
                      )} */}
                  </div>

                  {token && (
                    <div className="mb-4">
                      <div>
                        Current{" "}
                        <strong className="text-lg">
                          {item.app.toUpperCase()}{" "}
                        </strong>{" "}
                        {isUrl ? (
                          <>
                            URL :
                            <a
                              href={item.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {item.link}{" "}
                            </a>{" "}
                          </>
                        ) : (
                          <>
                            ID : <p className="inline">{item.name}</p>
                          </>
                        )}
                        {/* <a
                            href={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {item.link}{" "}
                          </a>{" "} */}
                      </div>
                      <p className="text-lg underline text-black">
                        {" "}
                        Edit or Delete sales :{" "}
                      </p>
                      <Dropdown1
                        label="Select sales"
                        options={sales}
                        value={app}
                        onChange={handleChange}
                      />
                      <div className="row items-center justify-around  max-w-lg mx-auto mt-2">
                        <p className="col s2 text-black items-center justify-around">
                          Name:{" "}
                        </p>
                        {app ? (
                          <input
                            className="col s10"
                            value={name}
                            onChange={handleNameChange}
                          ></input>
                        ) : (
                          <input
                            className="col s10"
                            disabled
                            value={name}
                            onChange={handleNameChange}
                          ></input>
                        )}
                      </div>
                      {/* isUrl ? <>URL is TRUE </> : <>URL is FALSE</> */}
                      <div className="select-none my-2 border-b-2 pb-2  max-w-lg overflow-auto mx-auto text-sm">
                        Your new <strong>{app.toUpperCase()}</strong> profile
                        URL :{" "}
                        <a
                          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-lg"
                          href={`${link}${name.trim()}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {" "}
                          {link}
                          {name.trim()}
                        </a>
                      </div>
                      {isUrl ? (
                        <>
                          <div className="text-sm">
                            {" "}
                            Example{" "}
                            <strong className="text-md">
                              {app.toUpperCase()}
                            </strong>{" "}
                            URL: {example}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm">
                            {" "}
                            <strong className="text-md">
                              {item.app}
                            </strong>{" "}
                            profile is not an URL, please go to{" "}
                            <strong className="text-md">
                              {item.app.toUpperCase()}
                            </strong>{" "}
                            App to copy the profile ID
                          </div>
                        </>
                      )}
                      {/* <div className="text-sm"> Example : {example}</div> */}
                      <button
                        className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                        onClick={() => {
                          if (!app || !name) {
                            M.toast({
                              html: "Please key in complete app and name",
                            });
                            return;
                          }
                          handleEdit(item._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn modal-close waves-effect waves-light red darken-3 mt-3 mx-3"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 "
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
          : ""}
        {/* this part is to append a "ADD" sign, it triggers section below, not a modal */}
        {token ? (
          <>
            <div className="collection-item" key={"gg" + "_key"}>
              <div
                className="modal-trigger plus flex justify-center rotating-border rotating-border--rainbow"
                href={"#modalplussales"}
                onClick={() => {
                  setIsModalOpen(true);
                  /* editRef.current.scrollIntoView({ behavior: "smooth" }); */
                }}
              >
                <img
                  id="social-logo"
                  key={"plus" + "_img"}
                  className="circle   border-skin-base shadow-md shadow-skin "
                  style={{ borderWidth: 1 }}
                  src="../images/plus.png"
                  alt="plus"
                  onClick={() => {
                    setApp("");
                    setLink("");
                    setName("");
                    setExample("");
                  }}
                />
              </div>
              {/* this part is the modal for "ADD" sign */}
              <div id={"modalplussales"} className="modal bottom-sheet">
                <div className=" mx-auto p-0">
                  <p className="text-xl m-2 p-1"> Add sales </p>
                  <div className="mb-4">
                    <Dropdown1
                      label="Select sales"
                      options={sales}
                      value={app}
                      onChange={handleChange}
                    />
                    <div>isUrl is {isUrl.toString()}</div>
                    <div className="row items-center justify-around  max-w-lg mx-auto  mt-2">
                      <p className="col s2 text-black">Name: </p>
                      {app ? (
                        <input
                          className="col s10"
                          value={name}
                          onChange={handleNameChange}
                        ></input>
                      ) : (
                        <input
                          className="col s10"
                          disabled
                          value={name}
                          onChange={handleNameChange}
                        ></input>
                      )}
                    </div>
                    {isUrl ? (
                      <>
                        <div className="select-none my-2  border-b-2 pb-2 max-w-lg overflow-auto mx-auto text-sm">
                          Your <strong>{app.toUpperCase()}</strong> profile URL :{" "}
                          <a
                            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-lg"
                            href={`${link}${name.trim()}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {" "}
                            {link}
                            {name.trim()}
                          </a>
                        </div>
                        <div className="text-xs"> Example Profile URL: {example}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs"> Example {app.toUpperCase()} ID: {example}</div>
                      </>
                    )}
                    <div>
                      <button
                        className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                        onClick={() => {
                          if (!app || !name) {
                            M.toast({
                              html: "Please key in complete app and name",
                            });
                            return;
                          }
                          setIsModalOpen(false);
                          handleCreate();
                          console.log(
                            "create click app : ",
                            app,
                            " name : ",
                            name,
                            " link : ",
                            link
                          );
                        }}
                      >
                        Create
                      </button>
                      <button
                        className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 "
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {profile.sales.length > 0 && <div className="border-b-2 border-skin-base w-11/12 mx-auto mt-5"></div>}
      <div ref={editRef}>
        {" "}
        {/* This is dummy useRef for scrollIntoView() when the "ADD" sign clicked */}{" "}
      </div>
      
    </div>
  );
};
