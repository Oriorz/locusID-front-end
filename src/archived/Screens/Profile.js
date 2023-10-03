import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import {
  socials,
  state_false,
  state_true,
  bios,
} from "../../components/namelist";
import M from "materialize-css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FloatSignin } from "../../components/function/FloatSignin";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext); // user state context
  const [image, setImage] = useState(""); //finalImage of profile
  const [finalImage, setFinalImage] = useState(""); //finalImage of profile
  const navigate = useNavigate(); // navigation of page
  const [inputRow, setInputRow] = useState({ title: null, content: null }); //TESTING for update value
  const [isInputHidden, setisInputHidden] = useState({ ...state_true }); // useState for input line hidden attribute, it should be true when hidden, input should be hidden initially, so initial state is true
  const [isEditDisabled, setisEditDisabled] = useState({ ...state_false }); //useState for EditDisabled it should not be disabled initially, so initial state is false
  const [isConfirmHidden, setisConfirmHidden] = useState({ ...state_true }); // useState for input line hidden attribute, it should be true when hidden, input should be hidden initially, so initial state is true
  const [isCancelHidden, setisCancelHidden] = useState({ ...state_true }); //useState for EditDisabled it should not be disabled initially, so initial state is false
  const cropImage = useRef("");
  const cropperInstance = useRef();

  useEffect(() => {
    if (finalImage) {
      // total 2 parts, this part is the uploading photo handling part
      fetch("/api/uploadpic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: finalImage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // this is 2nd part starting from here, it is deleting old pic
          fetch("/api/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.pic,
              oldpic: getFileName(state.pic),
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              window.location.reload();
            });
        })
        .catch((err) => {
          console.log("useEffect to fetch profile finalImage error is ", err);
        });
    }
  }, [finalImage]);

  const updatePhoto = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  }

  const getCropData = () => {
    if (cropperInstance.current) {
      var croppedCanvas = cropperInstance.current.getCroppedCanvas();
      var roundedCanvas = getRoundedCanvas(croppedCanvas);
      createBlobFromCanvas(roundedCanvas)
        .then((blob) => {
          alert(blob.size);
        })
        .catch((error) => {
          console.error(error.message);
        });
      cropImage.current = roundedCanvas.toDataURL("image/jpeg", 0.7);
      setFinalImage(cropImage.current);
    }
  };

  function createBlobFromCanvas(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob."));
        }
      });
    });
  }

  const getFileName = (text) => {
    const theString = text;
    const theStringLength = theString.split("/").length;
    const theSuffix = theString.split("/")[theStringLength - 1].split(".")[0];
    return theSuffix;
  };

  const goToSignin = () => {
    navigate("/signin");
  };

  //renderSocials is the component of RenderList where it renders the input line, edit button, confirm button and cancel button
  const renderSocials = () => {
    return (
      <>
        <div clasName="social-list">renderSocials</div>
      </>
    );
  };

  //handleEdit is to handle the sequence of the buttons on/off upon user click on "Edit"
  const handleEdit = (text) => {
    //backend:
    //do nothing
    //frontend:
    //"current input", "current confirm" and "current cancel" should appear after pressed,
    //all "edit" button should disabled after pressed,
    //it will be re-enabled later after "confirm" or "cancel"
    toggleInput(text);
    toggleConfirm(text);
    toggleCancel(text);
    hideEdit(text);
  };
  //handleConfirm is to handle the sequence of the buttons on/off upon user click on "confirm"
  const handleConfirm = (text, theLink, update_input) => {
    //backend:
    setInputRow({ ...inputRow, content: null });
    if (!update_input) {
      M.toast({ html: "nothing is inputted", classes: "red darken-2" });
      return;
    }
    //TODO: clear the input field or inputrow.content, get the value in iput field, send the value in input field to backend /updatedetails API
    //(cont'), then chain on the success response to set the following on front end, else display err
    //frontend:
    const theValue = update_input.split(theLink);
    fetch(`/api/updatedetails/${text}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        value: theValue[theValue.length - 1],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, [text]: data[text] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: text, theValue: data[text] },
        });
        console.log(state);
        toggleInput(text);
        toggleConfirm(text);
        toggleCancel(text);
        showEdit(text);
      });
  };
  //handleCancel is to handle the sequence of the buttons on/off upon user click on "cancel"
  const handleCancel = (text) => {
    toggleInput(text);
    toggleConfirm(text);
    toggleCancel(text);
    showEdit(text);
  };

  //toggleINput is to turn specific "input" field on and off by the "arg" passing
  const toggleInput = (text) => {
    if (isInputHidden[text] === true) {
      setisInputHidden({ ...isInputHidden, [text]: false });
    }
    if (isInputHidden[text] === false) {
      setisInputHidden({ ...isInputHidden, [text]: true });
    }
  };
  //toggleConfirm is to turn specific "confirm" field on and off by the "arg" passing
  const toggleConfirm = (text) => {
    if (isConfirmHidden[text] === true) {
      setisConfirmHidden({ ...isConfirmHidden, [text]: false });
    }
    if (isConfirmHidden[text] === false) {
      setisConfirmHidden({ ...isConfirmHidden, [text]: true });
    }
  };
  //toggleCancel is to turn specific "cancel" field on and off by the "arg" passing
  const toggleCancel = (text) => {
    if (isCancelHidden[text] === true) {
      setisCancelHidden({ ...isCancelHidden, [text]: false });
    }
    if (isCancelHidden[text] === false) {
      setisCancelHidden({ ...isCancelHidden, [text]: true });
    }
  };
  //toggleEdit is to turn specific "edit" field on and off by the "arg" passing
  const hideEdit = (text) => {
    Object.keys(isEditDisabled).map((e) => {
      isEditDisabled[e] = true;
    });
  };

  const showEdit = (text) => {
    Object.keys(isEditDisabled).map((e) => {
      isEditDisabled[e] = false;
    });
  };

  const renderList = () => {
    return state ? (
      <div>
        <FloatSignin />
        <h4>Notes</h4>
        <ul className="collection">
          {state.notes ? (
            <li className="collection-item avatar" key={state.notes}>
              <img
                className="circle responsive-img"
                src="../images/biography.jpg"
                alt="notes"
              />
              <div className="row">
                <div className="col s10">
                  <span className="title">Notes</span>
                  {state.notes ? (
                    <p
                      style={{
                        textAlign: "center",
                        border: "none",
                        "white-space": "pre-wrap",
                      }}
                    >
                      Now : {state.notes}
                    </p>
                  ) : (
                    <p>
                      Now : <strong style={{ color: "red" }}> NOT SET </strong>
                    </p>
                  )}
                  {/* this part  below is the input line*/}
                  <div>
                    {isInputHidden["notes"] ? (
                      ""
                    ) : (
                      <>
                        {/* {state[item.id] ?<p>{item.link}________</p>:""} */}
                        <textarea
                          style={{ rows: "5" }}
                          placeholder="update"
                          onClick={(e) => {
                            setInputRow({
                              ...inputRow,
                              content: e.target.value,
                            });
                          }}
                          onChange={(e) => {
                            setInputRow({
                              ...inputRow,
                              content: e.target.value,
                            });
                          }}
                        />
                        <div style={{ fontSize: 10 }}>
                          This is Vcard related info{" "}
                        </div>
                        <div style={{ fontSize: 10 }}>
                          example : <strong> 'YOUR ID' </strong>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* this part is the "Edit" button*/}
                {isEditDisabled["notes"] ? (
                  ""
                ) : (
                  <div className="col s1">
                    <button
                      className="btn-floating btn-small waves-effect waves-light blue"
                      onClick={() => {
                        handleEdit("notes");
                      }}
                      disabled={false}
                    >
                      <i className="material-icons">edit</i>
                    </button>
                  </div>
                )}
                {/* this part is the Confirm button*/}
                {isConfirmHidden["notes"] ? (
                  ""
                ) : (
                  <div className="col s1">
                    <button
                      className="btn-floating btn-small waves-effect waves-light dark-green"
                      onClick={() => {
                        showHandle("notes");
                        handleConfirm("notes", null, inputRow.content);
                      }}
                      disabled={false}
                    >
                      <i className="material-icons">check</i>
                    </button>
                  </div>
                )}
                {/* this part is the Cancel button*/}
                {isCancelHidden["notes"] ? (
                  ""
                ) : (
                  <div className="col s1">
                    <button
                      className="btn-floating btn-small waves-effect waves-light red"
                      onClick={() => {
                        showHandle("notes");
                        handleCancel("notes");
                      }}
                    >
                      <i className="material-icons">do_not_disturb</i>
                    </button>
                  </div>
                )}
              </div>
            </li>
          ) : (
            "Input something interesting about yourself!"
          )}
        </ul>
        <h4>Contact Card Info</h4>
        <ul className="collection">
          {bios.map((item, index) => {
            return (
              <>
                <li className="collection-item avatar" key={item.id}>
                  <img
                    className="circle responsive-img"
                    src={item.src}
                    alt={item.id}
                  />
                  <div className="row">
                    <div className="col s10">
                      <span className="title">{item.title}</span>
                      {state[item.id] ? (
                        <p>Now : {state[item.id]}</p>
                      ) : (
                        <p>
                          Now :{" "}
                          <strong style={{ color: "red" }}> NOT SET </strong>
                        </p>
                      )}
                      {/* this part  below is the input line*/}
                      <div>
                        {isInputHidden[item.id] ? (
                          ""
                        ) : (
                          <>
                            {/* {state[item.id] ?<p>{item.link}________</p>:""} */}
                            <input
                              placeholder="update"
                              onClick={(e) => {
                                setInputRow({
                                  ...inputRow,
                                  content: e.target.value,
                                });
                              }}
                              onChange={(e) => {
                                setInputRow({
                                  ...inputRow,
                                  content: e.target.value,
                                });
                              }}
                            />
                            <div style={{ fontSize: 10 }}>
                              This is Vcard related info{" "}
                            </div>
                            <div style={{ fontSize: 10 }}>
                              example : {item.link}
                              <strong> 'YOUR ID' </strong>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {/* this part is the "Edit" button*/}
                    {isEditDisabled[item.id] ? (
                      ""
                    ) : (
                      <div className="col s1">
                        <button
                          className="btn-floating btn-small waves-effect waves-light blue"
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          disabled={false}
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </div>
                    )}
                    {/* this part is the Confirm button*/}
                    {isConfirmHidden[item.id] ? (
                      ""
                    ) : (
                      <div className="col s1">
                        <button
                          className="btn-floating btn-small waves-effect waves-light dark-green"
                          onClick={() => {
                            showHandle(item.id);
                            handleConfirm(item.id, item.link, inputRow.content);
                          }}
                          disabled={false}
                        >
                          <i className="material-icons">check</i>
                        </button>
                      </div>
                    )}
                    {/* this part is the Cancel button*/}
                    {isCancelHidden[item.id] ? (
                      ""
                    ) : (
                      <div className="col s1">
                        <button
                          className="btn-floating btn-small waves-effect waves-light red"
                          onClick={() => {
                            showHandle(item.id);
                            handleCancel(item.id);
                          }}
                        >
                          <i className="material-icons">do_not_disturb</i>
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </>
            );
          })}
        </ul>
        <h4>Socials</h4>
        <ul className="collection">
          {socials.map((item, index) => {
            return (
              <>
                <li className="collection-item avatar" key={item.id}>
                  <img
                    className="circle responsive-img"
                    src={item.src}
                    alt={item.id}
                  />
                  <div className="row">
                    <div className="col s10">
                      <span className="title">
                        {index + 1} {item.title}
                      </span>
                      {state[item.id] ? (
                        <p>
                          Now :{" "}
                          <a target="_blank" href={item.link + state[item.id]}>
                            {item.link}
                            {state[item.id]}
                          </a>
                        </p>
                      ) : (
                        <p>
                          Now :{" "}
                          <strong style={{ color: "red" }}> NOT SET </strong>
                        </p>
                      )}
                      {/* this part  below is the input line*/}
                      <div>
                        {isInputHidden[item.id] ? (
                          ""
                        ) : (
                          <>
                            {/* {state[item.id] ?<p>{item.link}________</p>:""} */}
                            <input
                              placeholder="update"
                              onClick={(e) => {
                                setInputRow({
                                  ...inputRow,
                                  content: e.target.value,
                                });
                              }}
                              onChange={(e) => {
                                setInputRow({
                                  ...inputRow,
                                  content: e.target.value,
                                });
                              }}
                            />
                            <div style={{ fontSize: 10 }}>
                              You can just copy paste in the whole link or just
                              the id if you know it{" "}
                            </div>
                            <div style={{ fontSize: 10 }}>
                              example : {item.link}
                              <strong> 'YOUR ID' </strong>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* this part is the "Edit" button*/}
                    {isEditDisabled[item.id] ? (
                      ""
                    ) : (
                      <div className="col s1">
                        <button
                          className="btn-floating btn-small waves-effect waves-light blue"
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          disabled={false}
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </div>
                    )}
                    {/* this part is the Confirm button*/}
                    {isConfirmHidden[item.id] ? (
                      ""
                    ) : (
                      <div className="col s1">
                        <button
                          className="btn-floating btn-small waves-effect waves-light dark-green"
                          onClick={() => {
                            showHandle(item.id);
                            handleConfirm(item.id, item.link, inputRow.content);
                          }}
                          disabled={false}
                        >
                          <i className="material-icons">check</i>
                        </button>
                      </div>
                    )}
                    {/* this part is the Cancel button*/}
                    {isCancelHidden[item.id] ? (
                      ""
                    ) : (
                      <div className="col s1">
                        <button
                          className="btn-floating btn-small waves-effect waves-light red"
                          onClick={() => {
                            showHandle(item.id);
                            handleCancel(item.id);
                          }}
                        >
                          <i className="material-icons">do_not_disturb</i>
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </>
            );
          })}
        </ul>
        <h4>Links</h4>
        <ul className="collection"></ul>
      </div>
    ) : (
      <div> Loading </div>
    );
  };

  const showHandle = (theTitle, theContent) => {
    if (!theContent) {
      setInputRow({ ...inputRow, title: theTitle });
    } else {
      setInputRow({ title: theTitle, content: theContent });
    }
    console.log(
      "inputRow title is ",
      inputRow.title,
      "inputRow content is ",
      inputRow.content
    );
  };

  return state ? (
    <div>
      <div className="p-1 text-center max-w-xl mx-auto bg-orange-200">
        Profile Edit Mode
      </div>
      <div className="max-w-xl mx-auto">
        <div className="mx-auto my-4 border-b-2 border-gray-400">
          <div className="flex justify-around">
            <img
              className="w-44 h-44 rounded-full "
              src={state ? state.pic : "loading"}
              alt="profile-pic"
            />
            <div>
              <h4>{state ? state.name : "loading"}</h4>
              <h5>{state ? state.email : "loading"}</h5>
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn blue darken-1">
              <span>Upload pic</span>
              <input type="file" onChange={updatePhoto} />
            </div>
            <div className="file-path-wrapper ">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        {image ? (
          <Cropper
            className="h-[500px]"
            width="400px"
            height="400px"
            initialAspectRatio={1}
            aspectRatio={1}
            src={image}
            background={false}
            responsive={true}
            onInitialized={(instance) => {
              cropperInstance.current = instance;
            }}
            zoomable={true}
          />
        ) : (
          ""
        )}
        {image ? (
          <div>
            <button
              onClick={getCropData}
              className="bg-red-200 rounded p-[8px]"
            >
              Crop Image
            </button>
            <button>Clear Image</button>
          </div>
        ) : (
          ""
        )}
        <div className="social">{renderList()}</div>
      </div>
    </div>
  ) : (
    goToSignin()
  );
};

export default Profile;
