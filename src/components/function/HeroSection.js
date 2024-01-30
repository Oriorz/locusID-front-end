import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
/* import "./coverphoto.css"; */
import M from "materialize-css";
import { InputProfile } from "./InputProfile";

const HeroSection = ({ token, userProfile }) => {
  const { state, dispatch } = useContext(UserContext); // user state context
  const inputFile = useRef();
  const [image, setImage] = useState(""); //finalImage of profile
  const [finalImage, setFinalImage] = useState(""); //finalImage of profile
  const cropImage = useRef("");
  const cropperInstance = useRef();
  const [coverPic, setCoverPic] = useState(userProfile.user.coverPic);
  const [profile, setProfile] = useState(userProfile.user);
  const [notes, setNotes] = useState();
  const [title, setTitle] = useState();
  const [hasChanged, setHasChanged] = useState(false);
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState();

  const previousSlide = () => {
    if (current === 0) {
      /* setCurrent(profile.heroes ? profile.heroes.length - 1 : 0); */
      setCurrent(2);
    } else {
      setCurrent(current - 1);
    }
  };

  const nextSlide = () => {
    /* if (profile.heroes) {
      if (current === profile.heroes - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    } else {
      setCurrent(0);
    } */
    if (current === 2) setCurrent(0);
    else setCurrent(current + 1);
  };

  useEffect(() => {
    if (finalImage) {
      // total 2 parts, this part is the uploading photo handling part

      // i think i need a check here to check if the user is logged in, meaning to check if state is something?
      // i just realised i did the check at updatePhoto function.
      // do i need a second barrier to prevent calling the server if the user not signed in?
      /* if(!localStorage.getItem("jwt")) {
        alert("not logged in")
        return
      } */
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
          console.log("finalImage", finalImage);
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-3" });
          }
          // this is 2nd part starting from here, it is deleting old pic
          fetch("/api/updateheropic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.pic,
              oldpic: state.coverPic ? getFileName(state.coverPic) : "null",
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, coverPic: result.coverPic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.coverPic });
              window.location.reload();
            });
        })
        .catch((err) => {
          console.log("useEffect to fetch profile finalImage error is ", err);
        });
    }
  }, [finalImage]);

  const getFileName = (text) => {
    console.log("entered getFileName");
    const theString = text;
    const theStringLength = theString.split("/").length;
    const theSuffix = theString.split("/")[theStringLength - 1].split(".")[0];
    return theSuffix;
  };

  const onInputClick = () => {
    // i should add a check if the jwt is exist
    // if not exsit the prompt user to logged in? or just not allowed them to upload
    if (!localStorage.getItem("jwt")) {
      //M.toast({html:"not signed in", classes:"green darken-3"});
      return;
    }
    inputFile.current.click();
  };

  const handleCoverPhotoClick = () => {
    if (!localStorage.getItem("jwt")) {
      //M.toast({html:"not signed in", classes:"green darken-3"});
      return;
    }
    /* console.log("clicked on coverphoto") */
    inputFile.current.click();
  };

  const updatePhoto = (e) => {
    if (!localStorage.getItem("jwt")) {
      M.toast({ html: "not signed in", classes: "red darken-3" });
      return;
    }
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

  const getCropData = () => {
    if (cropperInstance.current) {
      var croppedCanvas = cropperInstance.current.getCroppedCanvas();
      //var roundedCanvas = getRoundedCanvas(croppedCanvas);
      var reduction = 1;
      createBlobFromCanvas(croppedCanvas)
        .then((blob) => {
          /* alert(blob.size); */
          /* alert("Uploading Image") */
          if (blob.size > 8000000) {
            reduction = 0.4;
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL(
              "image/jpeg",
              reduction
            );
            setFinalImage(cropImage.current);
          } else if (blob.size > 5000000) {
            reduction = 0.5;
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL(
              "image/jpeg",
              reduction
            );
            setFinalImage(cropImage.current);
          } else if (blob.size > 1000000) {
            reduction = 0.6;
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL(
              "image/jpeg",
              reduction
            );
            setFinalImage(cropImage.current);
          } else {
            reduction = 0.7;
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL(
              "image/jpeg",
              reduction
            );
            setFinalImage(cropImage.current);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
      alert("Uploading Image");
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

  const clearImage = () => {
    setImage("");
  };

  const handleAdd = (e) => {
    console.log(e);

    e.preventDefault();
    if (!title) {
      console.log("handleAdd Clicked");
    } else {
      console.log("handledAdd Clicked but with title", title);
    }
  };

  /*  const handleEdit = (_id) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    console.log("_id", _id);
    console.log("link", link);
    console.log("title", title);
    //sanitize link : remove "https://" and lowercase it
    const httpsLink = link.toLowerCase();
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
  }; */

  return (
    <>
      {token && (
        // Logic below is for the Logged in user, it will display
        // a carousell if there is existing heroes section array, and have 1) edit 2) delete button on each item of the array
        // whether or not there is existing heroes section array, it will followed by 1) add new button
        <div className="relative overflow-hidden">
          {/* <div className="absolute top-0 w-full h-full justify-between items-center flex px-24">
            <i
              className="material-icons text-purple-500 z-10"
              onClick={previousSlide}
            >
              ac_unit{" "}
            </i>
            <i className="material-icons text-red-500 z-10" onClick={nextSlide}>
              access_alarm{" "}
            </i>
          </div> */}
          {image ? (
            <div className="w-full h-60 bg-skin-fill  z-20 flex flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center absolute">
                <button
                  onClick={getCropData}
                  className="bg-green-400 rounded p-[8px] z-50"
                >
                  Crop Image
                </button>
                <button
                  onClick={clearImage}
                  className="bg-red-400 rounded p-[8px] z-50"
                >
                  Clear Image
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {image ? ( // cropper module here
            <div className="flex flex-col items-center justify-center coverphoto">
              <Cropper
                className="h-[500px] absolute top-36 z-40 border rounded-none coverphoto"
                width="400px"
                height="400px"
                initialAspectRatio="1"
                src={image}
                background={false}
                responsive={true}
                onInitialized={(instance) => {
                  cropperInstance.current = instance;
                }}
                onLoad={() => {
                  setTimeout(() => {
                    const viewbox =
                      document.getElementsByClassName("cropper-view-box");
                    viewbox[0].style.borderRadius = "0";
                  }, 400);
                }}
                zoomable={true}
              />
            </div>
          ) : (
            ""
          )}
          <div className=" w-full h-full overflow-x-scroll flex flex-row items-center justify-start mx-auto py-3  gap-8 border-b-2 border-solid border-skin-base ">
            {profile.heroes && (
              <React.Fragment>
                {profile.heroes.map((item) => {
                  return (
                    <React.Fragment key={item._id}>
                      <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
                        <div className="w-96 h-[580px] overflow-y-hidden  bg-white">
                          {item.link}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            )}
            {/* below is the "PLUS" icon that displayed at the end of photo gallery to let user input */}
            <div
              className="w-full h-[580px]  border-2 rounded-lg flex flex-col flex-none items-center "
              /* style={{ transform: `translateX(-${current * 100}%)` }} */
            >
              <div className="w-full h-[100px] bg-blue-300 overflow-y-hidden flex flex-initial items-center border-2 rounded-lg text-center justify-center text-3xl modal-trigger">
                Add Title
              </div>
              <div
                className=" w-full h-[380px] overflow-y-hidden border-2 rounded-lg bg-pink-300 
           flex flex-none items-center modal-trigger transition  ease-out duration-40"
                style={{ transform: `translateX(-${current * 100}%)` }}
                href={"#modalheroadd"}
              >
                <i className="large material-icons text-center text-button-base mx-auto ">
                  add
                </i>
              </div>

              <div className="w-full h-[100px] bg-slate-300 overflow-y-hidden flex flex-initial items-center border-2 rounded-lg text-center justify-center text-3xl modal-trigger">
                <input title="Add Notes" placeholder="Add Notes" />
              </div>
              <div className="flex flex-row  text-right  justify-normal  mx-auto h-[50px] gap-4">
                <div className="my-1 px-6 py-auto mx-auto  border-2  border-blue-500 text-center justify-center items-center text-blue-500">
                  <i className="material-icons text-5xl">check</i>
                </div>
                <div className="my-1 px-6 py-auto  border-2 border-blue-500 text-right justify-center items-right text-red-500">
                  <i className="material-icons text-5xl">clear</i>
                </div>
              </div>
            </div>
            <div
              className=" w-full h-[380px] overflow-y-hidden border-2 rounded-lg bg-pink-300 
           flex flex-none items-center modal-trigger transition  ease-out duration-40"
              style={{ transform: `translateX(-${current * 100}%)` }}
              href={"#modalheroadd"}
            >
              <i className="large material-icons text-center text-button-base mx-auto ">
                remove
              </i>
            </div>
            <div
              className=" w-full h-[380px] overflow-y-hidden border-2 rounded-lg bg-pink-300 
           flex flex-none items-center modal-trigger transition  ease-out duration-40"
              style={{ transform: `translateX(-${current * 100}%)` }}
              href={"#modalheroadd"}
            >
              <i className="large material-icons text-center text-button-base mx-auto ">
                refresh
              </i>
            </div>
          </div>
          {/* Below is the modal part, consider removing it */}
          <div className="modal bottom-sheet text-center" id={"modalheroadd"}>
            <p className="text-xl m-2 p-1">Add new gallery : </p>
            <div className="row items-center justify-around  max-w-lg mx-auto pt-2 mt-2">
              <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                New Title :{" "}
              </p>
              <input
                className="col s8 border-2 bg-slate-300"
                defaultValue=""
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              {}
            </div>
            <div className="row items-center justify-around  max-w-lg mx-auto pt-2 mt-2">
              <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                New Photo :{" "}
              </p>
              {/* <input
                className="col s9 border-2 bg-slate-300"
                defaultValue=""
                onChange={(e) => setCoverPic(e.target.value)}
              ></input> */}
              <input
                className="col s9 border-2 bg-slate-300"
                type="file"
                id="file"
                ref={inputFile}
                onChange={updatePhoto}
                /* style={{ display: "none" }} */
              />
            </div>
            {image && (
              <>
                <img
                  className="row items-center justify-around  max-w-lg mx-auto pt-2 mt-2"
                  src={image}
                  alt="photo Gallery"
                ></img>
              </>
            )}
            <div className="row items-center justify-around  max-w-lg mx-auto pt-2 mt-2 border-solid border-b-[1px] border-gray-300 text-center mb-3  pb-4">
              <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                New Notes :{" "}
              </p>
              <input
                className="col s9 border-2 bg-slate-300"
                defaultValue=""
                onChange={(e) => setNotes(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <button
                className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                onClick={(e) => handleAdd(e)}
              >
                Create
              </button>
              <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {!token && (
        // Logic below is for the Logged in user, it will display
        // a carousell if there is existing heroes section array
        // this section will be empty if no existing heroes section
        <React.Fragment>
          asdfasdafd
          {profile.heroes && (
            <React.Fragment>
              {profile.heroes.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <div className="flex flex-none flex-col items-center space-y-1 overflow-y-hidden">
                      1
                    </div>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default HeroSection;
