import React, { useEffect, useRef, useState } from "react";

export const CreateLink = ({ userProfile, token }) => {
  const [title, setTitle] = useState("");
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
    fetch(`/api/createlink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        link: {
          title,
          link: cleanLink,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("createlink result is ", result);
      });
    window.location.reload();
  };

  const handleDelete = async (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    //testing switching to use async-await
    /* fetch(`/api/deletelink`, {
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
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log("deletelink result is ", result);
      }); */

    try {
      const response = await fetch(`/api/deletelink`, {
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

      if (!response.ok) throw new Error("Failed to delete link");

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
    console.log("_id", _id);
    console.log("link", link);
    console.log("title", title);
    //sanitize link : remove "https://" and lowercase it
    const httpsLink = link;
    const cleanLink = httpsLink.replace(/^https?:\/\//, "");
    fetch(`/api/editlink`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        link: {
          title,
          link: cleanLink,
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

  return (
    <div>
      {/* <div className='flex flex-col items-center justify-center text-skin-base'>User Link</div> */}
      {token && profile.links && (
        //if got links and signed in, then display input to change state, append "add new link" item to the last item
        <div className="flex flex-col items-center justify-center mb-3">
          {profile.links.map((item) => {
            return (
              <React.Fragment key={item._id}>
                <div className="mx-2 my-2 py-2 rounded-md border-skin-base bg-button-fill text-skin-base  drop-shadow-md select-none w-10/12">
                  <div className=" ">
                    <div className="row mb-0 pr-5">
                      {/* <i className="col s2 material-icons pr-2 items-center text-center justify-around top-2">link</i>
                       */}
                      <span className="col s10 text-lg font-bold  text-left text-button-base">
                        {item.title}
                      </span>
                      <div className="col s2 text-right items-end">
                        {/* <i className=" material-icons modal-trigger "
                          href={"#modal" + item._id}
                          onClick={() => {
                            setLink(item.link)
                            setTitle(item.title)
                          }}
                        >edit</i>
                        <i className="material-icons modal-trigger "
                          href={"#modaldel" + item._id}
                        >delete</i> */}
                      </div>
                      <i
                        className="col s1  material-icons modal-trigger  text-right text-button-base"
                        href={"#modal" + item._id}
                        onClick={() => {
                          setLink(item.link);
                          setTitle(item.title);
                        }}
                      >
                        edit
                      </i>
                      <i
                        className="col s1  material-icons modal-trigger  pr-2 text-right text-button-base"
                        href={"#modaldel" + item._id}
                      >
                        delete
                      </i>
                    </div>
                  </div>
                </div>
                <div
                  className="modal bottom-sheet text-center"
                  id={"modal" + item._id}
                >
                  <div className="">
                    <div className="   ">
                      <p className="text-xl m-2 p-1">Input Title and Link : </p>
                      <div className="row items-center justify-around  max-w-lg mx-auto  ">
                        <p className="col s3 text-gray-500 items-center justify-around text-right text-sm">
                          Old Title:{" "}
                        </p>
                        <p className="col s9 text-gray-500 items-center justify-around  text-left text-sm">
                          {item.title}{" "}
                        </p>
                      </div>
                      <div className="row items-center justify-around  max-w-lg mx-auto  border-solid border-b-[1px] border-gray-300 text-center mb-3  pb-4">
                        <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                          New Title:{" "}
                        </p>
                        <input
                          className="col s9 border-2 bg-slate-300"
                          defaultValue={item.title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></input>
                      </div>
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
                      <div>
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
                  </div>
                </div>
                <div
                  className="modal bottom-sheet text-center"
                  id={"modaldel" + item._id}
                >
                  <div className="modal-content">
                    <p className="text-lg underline">
                      Are you sure you want to{" "}
                      <strong className="text-red-500">delete</strong> this
                      link?{" "}
                    </p>
                    <div className="">
                      <p>Title : {item.title}</p>
                      <p>Link : {item.link}</p>
                      {/* <p>ID : {item._id}</p> */}
                    </div>
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
          {localStorage.getItem("jwt") ? (
            <React.Fragment>
              <div
                className=" modal-trigger mx-2 my-2 py-2 rounded-md border-skin-base bg-button-fill text-skin-base  drop-shadow-md select-none w-10/12"
                href={"#modalnew"}
              >
                <p className="text-2xl text-button-base select-none text-center ">
                  -- ADD NEW LINK 1 --{" "}
                </p>
              </div>
              <div
                className="modal bottom-sheet  items-center justify-center"
                id="modalnew"
              >
                <div className="modal-content flex flex-col items-center justify-center  ">
                  <p className="text-lg underline">Input Title and Link : </p>
                  <div>
                    Title:
                    <div className="input-field inline col s8 max-w-3xl items-center justify-around">
                      <input
                        id="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {/* <label htmlFor="title">Title</label> */}
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        My Shop List
                      </span>
                    </div>
                  </div>
                  <div>
                    https://
                    <div className="input-field col s6 max-w-3xl  items-center justify-around inline">
                      <input
                        id="link"
                        type="text"
                        onChange={(e) => setLink(e.target.value)}
                      />
                      {/* <label htmlFor="link">Link</label> */}
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        www.google.com
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                      onClick={handleAdd}
                    >
                      Create
                    </button>
                    <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      )}
      {!token && profile.links && (
        //if got links but not signed in then display link to jump
        <div className="flex flex-col items-center justify-center mb-3">
          {profile.links.map((item) => {
            return (
              <div
                key={item._id}
                className=" mx-2 my-2 py-2 rounded-md border-skin-base bg-button-fill text-skin-base  drop-shadow-md select-none w-10/12"
                /* className='mx-auto my-2 p-3 rounded-md border-skin-base bg-button-fill text-skin-base text-center drop-shadow-md' */
                /* style={{borderWidth:1}} */
              >
                <a
                  className="text-lg text-button-base select-none"
                  href={`https://${item.link}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="row mb-0 pr-5">
                    <i className="col s2 material-icons pr-2 items-center text-center justify-around top-2">
                      link
                    </i>
                    <span className="col s9 text-lg font-bold  text-left">
                      {item.title}
                    </span>
                    <i className="col s1 material-icons   text-right items-end top-2 pr-2">
                      navigate_next
                    </i>
                  </div>
                  {/* <div>
                    <p className='text-base'>{item.link}</p>
                  </div> */}
                </a>
              </div>
            );
          })}
        </div>
      )}
      {token && !profile.links && (
        //if no links but signed in, append "add new link" item to the last item (whole list one item)
        <div className="flex flex-col items-center justify-center ">
          {profile.links.map((item) => {
            return (
              <div
                key={item._id}
                className="mx-auto my-2 p-3 rounded-md border-skin-base bg-button-fill text-skin-base text-center drop-shadow-md"
                /* style={{borderWidth:1}} */
              >
                <a
                  className="text-lg text-skin-base select-none"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div>
                    <span className="text-xl font-bold">
                      {item.title}
                      <i className="material-icons border-solid border-2 border-black ml-2 mr-1">
                        edit
                      </i>
                      <i className="material-icons border-solid border-2 border-black mx-1">
                        delete
                      </i>
                    </span>
                  </div>
                  {/* <div>
                    <p className='text-base'>{item.link}</p>
                  </div> */}
                </a>
              </div>
            );
          })}
          {localStorage.getItem("jwt") ? (
            <>
              <div
                className="modal-trigger mx-auto my-2 p-3 rounded-md  border-skin-base bg-button-fill text-skin-base shadow-md"
                href={"#modalnew"}
              >
                <p className="text-lg text-skin-base select-none">
                  -- ADD NEW LINK 1 --{" "}
                </p>
              </div>
              <div
                className="modal bottom-sheet  items-center justify-center"
                id="modalnew"
              >
                <div className="modal-content flex flex-col items-center justify-center  ">
                  <p className="text-lg underline">Input Title and Link : </p>
                  <div>
                    Title:
                    <div className="input-field inline col s8 max-w-3xl items-center justify-around">
                      <input
                        id="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <label htmlFor="title">Title</label>
                      <span
                        class="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        My Shop List
                      </span>
                    </div>
                  </div>
                  <div>
                    https://
                    <div className="input-field col s6 max-w-3xl  items-center justify-around inline">
                      <input
                        id="link"
                        type="text"
                        onChange={(e) => setLink(e.target.value)}
                      />
                      <label htmlFor="link">Link</label>
                      <span
                        class="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        www.google.com
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                      onClick={handleAdd}
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
          ) : (
            ""
          )}
        </div>
      )}
      {!token &&
        !profile.link &&
        //if no links and not signed in, then whole section omitted
        ""}
    </div>
  );
};
