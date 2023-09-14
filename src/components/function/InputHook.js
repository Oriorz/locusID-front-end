import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import M from "materialize-css";

export const InputHook = ({ userProfile }) => {
  const { state, dispatch } = useContext(UserContext); // user state context
  const inputFile = useRef();
  const [image, setImage] = useState(""); //finalImage of profile
  const [finalImage, setFinalImage] = useState(""); //finalImage of profile
  const cropImage = useRef("");
  const cropperInstance = useRef();

  useEffect(() => {
    if (finalImage) {
      // i think i need a check here to check if the user is logged in, meaning to check if state is something
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

  const getFileName = (text) => {
    const theString = text;
    const theStringLength = theString.split("/").length;
    const theSuffix = theString.split("/")[theStringLength - 1].split(".")[0];
    return theSuffix;
  };

  const onInputClick = () => {
    inputFile.current.click();
  };

  const updatePhoto = (e) => {
    // i should add a check if the jwt is exist
    //
    if (!localStorage.getItem("jwt")) {
      M.toast("not signed in");
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
        <img
          className="w-52 h-52 rounded-full "
          src={userProfile.user.pic}
          alt="user_pic"
          onClick={onInputClick}
        />
      ) : (
        ""
      )}
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
          <button onClick={getCropData} className="bg-red-200 rounded p-[8px]">
            Crop Image
          </button>
          <button>Clear Image</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
