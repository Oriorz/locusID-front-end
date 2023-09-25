import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import M from "materialize-css";

export const InputProfile = ({ userProfile, token }) => {
  const { state, dispatch } = useContext(UserContext); // user state context
  const inputFile = useRef();
  const [image, setImage] = useState(""); //finalImage of profile
  const [finalImage, setFinalImage] = useState(""); //finalImage of profile
  const cropImage = useRef("");
  const cropperInstance = useRef();

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
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-3" })
          }
          // this is 2nd part starting from here, it is deleting old pic
          fetch("/api/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.pic,
              oldpic: state.pic ? getFileName(state.pic) : "null",
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

  const getFileName = (text) => {
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
      var roundedCanvas = getRoundedCanvas(croppedCanvas);
      var reduction = 1
      createBlobFromCanvas(roundedCanvas)
        .then((blob) => {
          if (blob.size > 8000000) {
            reduction = 0.4
            /* alert(reduction); */
            cropImage.current = roundedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);
          } else if (blob.size > 5000000) {
            reduction = 0.5
            /* alert(reduction); */
            cropImage.current = roundedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);
          } else if (blob.size > 1000000) {
            reduction = 0.6
            /* alert(reduction); */
            cropImage.current = roundedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);
          } else {
            reduction = 0.7
            /* alert(reduction); */
            cropImage.current = roundedCanvas.toDataURL("image/jpeg", reduction);
            setFinalImage(cropImage.current);

          }
        })
        .catch((error) => {
          console.error(error.message);
        });
      /* cropImage.current = roundedCanvas.toDataURL("image/jpeg", 0.7);
      setFinalImage(cropImage.current); */
      alert("Uploading Image");
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
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={updatePhoto}
        style={{ display: "none" }}
      />
      {userProfile ? (
        token ?
          <>
            <img
              /* className="w-52 h-52 rounded-full relative z-50" */
              className="w-52 h-52 rounded-full absolute top-36  z-40 border-2 border-solid border-skin-base "
              src={userProfile.user.pic? userProfile.user.pic : '/images/name.jpg'}
              /* alt="user_pic" */
              onClick={onInputClick}
            />
            <div
              /*  className="absolute top-20  bg-gray-500/50 w-32 select-none" */
              className=" bg-gray-500/50 w-32 select-none absolute top-56 z-40"
              onClick={onInputClick}>
              <h1 className="text-black font-semibold text-xl text-center select-none"> edit </h1>
              <h1 className="text-black font-semibold text-xl text-center select-none"> Avatar </h1>
            </div>
          </>

          :
          <img
            className="w-52 h-52 rounded-full  absolute top-36 z-40 border-2 border-solid border-skin-base "
            src={userProfile.user.pic? userProfile.user.pic : '/images/name.jpg'}
            /* alt="user_pic" */
            onClick={onInputClick}
          />

      ) : (
        ""
      )}
      {image ? (
        <Cropper
          className="h-[500px] absolute top-36 z-50 border"
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
        <div className="flex flex-row items-center justify-center absolute">
          <button onClick={getCropData} className="bg-green-400 rounded p-[8px] z-50">
            Crop Image
          </button>
          <button onClick={clearImage} className="bg-red-400 rounded p-[8px] z-50">Clear Image</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
