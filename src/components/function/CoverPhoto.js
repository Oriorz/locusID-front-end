import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
/* import "./coverphoto.css"; */
import M from "materialize-css";
import { InputProfile } from './InputProfile'

const CoverPhoto = ({ token, userProfile }) => {
  const { state, dispatch } = useContext(UserContext); // user state context
  const inputFile = useRef();
  const [image, setImage] = useState(""); //finalImage of profile
  const [finalImage, setFinalImage] = useState(""); //finalImage of profile
  const cropImage = useRef("");
  const cropperInstance = useRef();
  const [coverPic, setCoverPic] = useState(userProfile.user.coverPic);

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
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: finalImage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log("finalImage", finalImage)
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-3" })
          }
          // this is 2nd part starting from here, it is deleting old pic
          fetch("/api/updatecoverpic", {
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
    console.log("entered getFileName")
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
  }

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
      var reduction = 1
      createBlobFromCanvas(croppedCanvas)
        .then((blob) => {
          /* alert(blob.size); */
          /* alert("Uploading Image") */
          if (blob.size > 8000000) {
            reduction = 0.4
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);
          } else if (blob.size > 5000000) {
            reduction = 0.5
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);
          } else if (blob.size > 1000000) {
            reduction = 0.6
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);
          } else {
            reduction = 0.7
            /* alert(reduction); */
            cropImage.current = croppedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);

          }
        })
        .catch((error) => {
          console.error(error.message);
        });
      alert("Uploading Image")

    }
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
    setImage("")
  }

  return (
    <>
      <div className="w-full h-60 bg-skin-fill  z-20 flex flex-col items-center justify-center">
        <InputProfile userProfile={userProfile} token={token} />
        {coverPic ?

          <img src={coverPic} className="w-[1080px] object-cover overflow-hidden" onClick={handleCoverPhotoClick} />
          :
          <div  className="w-[1080px] z-30 bg-blue-500" onClick={handleCoverPhotoClick} ></div>

        }
        {image ? (
          <div className="flex flex-row items-center justify-center absolute">
            <button onClick={getCropData} className="bg-green-400 rounded p-[8px] z-50">
              Crop Image
            </button>
            <button onClick={clearImage} className="bg-red-400 rounded p-[8px] z-50">
              Clear Image
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="absolute top-1 left-1 bg-gray-500/50 w-32  ">
        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={updatePhoto}
          style={{ display: "none" }}
        />
        {userProfile ?
          token &&
          <p
            className="text-black font-semibold text-xl text-center select-none"
            onClick={onInputClick}
          >Edit Cover</p>

          :
          ("")
        }

      </div>
      {image ? (
        <div className="flex flex-col items-center justify-center coverphoto">
          <Cropper
            className="h-[500px] absolute top-36 z-40 border rounded-none coverphoto"
            width="400px"
            height="400px"
            initialAspectRatio={window.innerWidth / 240}
            aspectRatio={window.innerWidth / 240}
            src={image}
            background={false}
            responsive={true}
            onInitialized={(instance) => {
              cropperInstance.current = instance;
            }}
            onLoad={() => {
              setTimeout(() => {

                const viewbox = document.getElementsByClassName("cropper-view-box")
                viewbox[0].style.borderRadius = "0"
              }, 400);
            }}
            zoomable={true}
          />
        </div>
      ) : (
        ""
      )}
      {/* {image ? (
        <div className="flex flex-row items-center justify-center">
          <button onClick={getCropData} className="bg-green-400 rounded p-[8px] z-50">
            Crop Image
          </button>
          <button onClick={clearImage} className="bg-red-400 rounded p-[8px] z-50">
            Clear Image
          </button>
        </div>
      ) : (
        ""
      )} */}
    </>
  )
}

export default CoverPhoto