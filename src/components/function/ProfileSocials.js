import React, { useEffect, useState, useRef } from "react";
import M from "materialize-css";
import { socials } from "../namelist";
import CopyLink from "./copyLink";

export const ProfileSocials = ({ userProfile, token }) => {
  const [selectedApp, setSelectedApp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [app, setApp] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [example, setExample] = useState("");
  const [isUrl, setIsUrl] = useState(true);
  const [profile, setProfile] = useState(userProfile.user);
  const editRef = useRef();

  useEffect(() => {
    if (app) {
      const selectedSocialObj = socials.find((social) => social.value === app);
      setLink(selectedSocialObj ? selectedSocialObj.link : "");
      setExample(selectedSocialObj ? selectedSocialObj.example : "");
      setIsUrl(selectedSocialObj ? selectedSocialObj.isUrl : "");
    }
  }, [app]);

  const handleChange = (event) => {
    setApp(event.target.value);
    /* console.log(event.target.value) */
    /* const selectedSocialObj = socials.find((social) => social.value === event.target.value);
    setLink(selectedSocialObj ? selectedSocialObj.link : ''); */
    setName("");
  };

  const handleNameChange = (event) => {
    console.log("app is ", app);

    const inputValue = event.target.value;
    if (inputValue.replace(/^https:\/\/www\.foodpanda\.(my|sg)\//, "")) {
      const withoutPrefix = inputValue.replace(
        /^https:\/\/www\.foodpanda\.(my|sg)\//,
        ""
      );
      setName(withoutPrefix);
      return;
    }

    const regex = /.*\/([^/?]+)\/?.*$/;
    const match = inputValue.match(regex);

    if (match) {
      const extractedValue = match[1];
      setName(extractedValue);
    } else {
      setName("");
    }
  };

  const handleCreate = () => {
    const fullLink =
      link.toLowerCase() + name.toLowerCase().replaceAll(" ", "");
    fetch(`/createsocials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        socials: {
          app,
          name: name,
          link: fullLink,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("createlink result is ", result);
        window.location.reload();
      });
  };

  const handleDelete = (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/deletesocials`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        socials: {
          _id,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("deletesocials result is ", result);
      });
  };

  const handleEdit = (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    //sanitize link : remove "https://" and lowercase it
    const httpsLink =
      link.toLowerCase() + name.toLowerCase().replaceAll(" ", "");
    console.log("httpsLink : ", httpsLink);
    /* const cleanLink = httpsLink.replace(/^https?:\/\//, '') */
    fetch(`/editsocials`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        socials: {
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
        console.log("editlink result is ", result);
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
        {profile.socials
          ? profile.socials.map((item) => {
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
                          <>
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
                        <>
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
                          Edit or Delete Socials :{" "}
                        </p>
                        <Dropdown1
                          label="Select Socials"
                          options={socials}
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
                            href={`${link}${name.toLowerCase().trim()}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {" "}
                            {link}
                            {name.toLowerCase().trim()}
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
                href={"#modalplus"}
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
                {/* <div className="h-8 w-8 circle">+</div> */}
              </div>
              <div id={"modalplus"} className="modal bottom-sheet">
                <div className=" mx-auto p-0">
                  <p className="text-xl m-2 p-1"> Add Socials </p>
                  <div className="mb-4">
                    <Dropdown1
                      label="Select Socials"
                      options={socials}
                      value={app}
                      onChange={handleChange}
                    />
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
                    {link ? (
                      <div className="select-none my-2  border-b-2 pb-2 max-w-lg overflow-auto mx-auto text-sm">
                        Your {app} profile URL :{" "}
                        <a
                          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-lg"
                          href={`${link}${name.toLowerCase().trim()}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {" "}
                          {link}
                          {name.toLowerCase().trim()}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="text-sm"> Example : {example}</div>
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
      <div ref={editRef}>
        {" "}
        {/* This is dummy useRef for scrollIntoView() when the "ADD" sign clicked */}{" "}
      </div>
      {/* {isModalOpen ?
        <div className=' p-2 flex flex-col ' >
          <div className="flex flex-col items-center justify-around border-2 border-solid border-skin-base p-2 mx-auto w-11/12 bg-white ">
            <div className=' flex flex-col items-center justify-center'>
              <p className='text-lg underline text-black'> Socials : </p>
              <Dropdown1 label="Select Socials" options={socials} value={app} onChange={handleChange} />
              <div className='row items-center justify-around  w-10/12 mx-auto'>
                <p className='col s4 text-black'>Name: </p>
                <input className='col s8' value={name} onChange={handleNameChange}></input>
              </div>
              <div className='select-none my-2 '>
                Your {app} profile URL : <a
                  className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-lg'
                  href={`${link}${name.toLowerCase().trim()}`}
                  rel="noopener noreferrer"
                  target='_blank'> {link}{name.toLowerCase().trim()}</a>
              </div>
              <div>
                <button className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                  onClick={() => {
                    if (!app || !name) {
                      M.toast({ html: "Please key in complete app and name" })
                      return
                    }
                    setIsModalOpen(false)
                    handleCreate()
                    console.log("create click app : ", app, " name : ", name, " link : ", link)
                  }}                >
                  Create</button>
                <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 " onClick={() => setIsModalOpen(false)}>
                  Cancel</button>
              </div>
            </div>
          </div>
        </div>

        :
        ""
      } */}
    </div>
  );
};