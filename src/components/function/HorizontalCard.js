import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import M from "materialize-css";

const HorizontalCard = ({ userProfile, token }) => {
  const [link, setLink] = useState("");
  const [profile, setProfile] = useState(userProfile.user);

  const handleAdd = () => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    //sanitize link : remove "https://" and lowercase it
    const httpsLink = link;
    const cleanLink = httpsLink.replace(/^https?:\/\//, "");
    fetch(`/api/createembed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        embeds: {
          link: cleanLink,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("createembed result is ", result);
        window.location.reload();
      });
  };

  const handleDelete = async (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    try {
      const response = await fetch(`/api/deleteembed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          link: {
            _id,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to delete embed");

      const result = await response.json();
      setProfile(result);
      console.log("deletelink result is ", result);
    } catch (error) {
      console.error("Error deleting link:", error);
      // Handle error as needed
    }
  };

  const handleEdit = (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    //sanitize link : remove "https://" and  it
    const cleanLink = link.replace(/^https?:\/\//, "");
    fetch(`/api/editembed`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        link: {
          link: cleanLink,
          _id,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("edit embed result is ", result);
        window.location.reload();
      });
  };

  useEffect(() => {
    var elemsa = document.querySelectorAll(".modal");
    M.Modal.init(elemsa);
    var elemsb = document.querySelectorAll("select");
    M.FormSelect.init(elemsb);
    var elemsc = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elemsc, {
      container: document.body,
      constrainWidth: false,
    });
    /* M.AutoInit(); */
  }, []);

  return (
    <>
      {token && (
        <>
          <div className="w-11/12 h-full overflow-x-scroll flex flex-row items-center justify-start mx-4 p-3 gap-6 border-b-2 border-solid border-skin-base">
            {profile.embeds &&
              profile.embeds.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
                      <div
                        className=" border-2 rounded-lg bg-blue-700 bg-opacity-70 w-96 h-[50px] modal-trigger"
                        href={"#modalembededit" + item._id}
                      >
                        <p className=" text-center my-3 align-middle text-xl mx-auto select-none">
                          Edit Embed
                        </p>
                      </div>
                      <div
                        className="modal bottom-sheet text-center"
                        id={"modalembededit" + item._id}
                      >
                        <p className="text-xl m-2 p-1">Input Embed Link : </p>
                        <div className="row items-center justify-around  max-w-lg mx-auto mt-2 ">
                          <p className="col s3 text-gray-500 items-center justify-around text-right text-sm">
                            Old https://{" "}
                          </p>
                          <p className="col s9 text-gray-500 items-center justify-around text-left text-sm">
                            {item.link}{" "}
                          </p>
                        </div>
                        <div className="row items-center justify-around  max-w-lg mx-auto  border-solid border-b-[1px] border-gray-300 text-center mb-3  pb-4">
                          <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                            New https://{" "}
                          </p>
                          <input
                            className="col s9"
                            defaultValue={item.link}
                            onChange={(e) => setLink(e.target.value)}
                          ></input>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                            onClick={() => handleEdit(item._id)}
                          >
                            Edit
                          </button>
                          <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                            Cancel
                          </button>
                        </div>
                      </div>

                      <iframe
                        className="w-96 h-[580px] overflow-y-hidden "
                        src={item.link ? "https://" + item.link : ""}
                        allowFullScreen
                        scrolling="no"
                        allow="encrypted-media;"
                      ></iframe>
                      <div
                        className=" border-2 rounded-lg bg-red-700 bg-opacity-70 w-96 h-[50px] modal-trigger"
                        href={"#modalembeddel" + item._id}
                      >
                        <p className=" text-center my-3 align-middle text-xl mx-auto select-none ">
                          Delete Embed
                        </p>
                      </div>
                    </div>
                    <div
                      className="modal bottom-sheet text-center"
                      id={"modalembeddel" + item._id}
                    >
                      <p className="text-xl m-2 p-1">Confirm Delete? </p>
                      <div className="mb-3">
                        <button
                          className="btn modal-close waves-effect waves-light red darken-3 mt-3 mx-3"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                        <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            <div
              className="w-96 h-[580px] overflow-y-hidden border-2 rounded-lg bg-pink-300 
           flex flex-none items-center modal-trigger"
              href={"#modaladd"}
            >
              <i className="large material-icons text-center text-button-base mx-auto ">
                add
              </i>
            </div>
            <div className="modal bottom-sheet text-center" id={"modaladd"}>
              <p className="text-xl m-2 p-1">Input Embed Link : </p>
              <div className="row items-center justify-around  max-w-lg mx-auto pt-2 mt-2 border-solid border-b-[1px] border-gray-300 text-center mb-3  pb-4">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                  New https://{" "}
                </p>
                <input
                  className="col s9 border-2 bg-slate-300"
                  defaultValue=""
                  onChange={(e) => setLink(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <button
                  className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                  onClick={() => handleAdd()}
                >
                  Create
                </button>
                <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {!token && (
        <>
          <div className="w-11/12 h-full overflow-x-scroll flex flex-row items-center justify-start mx-4 p-3 gap-6 border-b-2 border-solid border-skin-base">
            {profile.embeds &&
              profile.embeds.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
                      <iframe
                        className="w-96 h-[580px] overflow-y-hidden "
                        src={item.link ? "https://" + item.link : ""}
                        allowFullScreen
                        scrolling="no"
                        allow="encrypted-media;"
                      ></iframe>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default HorizontalCard;
