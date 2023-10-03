import React, { useState, useRef } from "react";
import Cropper from "cropperjs";

function NewUploadImage() {
  const [croppedImage, setCroppedImage] = useState("");
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (imageRef.current) {
        //if (imageRef.current && cropperRef.current) {
        console.log("handlefilechanged");
        imageRef.current.src = reader.result;
        const cropper = new Cropper(imageRef.current, {
          aspectRatio: 1,
          viewMode: 1,
          crop: () => {
            const canvas = cropper.getCroppedCanvas();
            setCroppedImage(canvas.toDataURL("image/png"));
          },
        });
        cropperRef.current = cropper;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      setCroppedImage(canvas.toDataURL("image/png"));
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Crop Image In Javascript</h1>
      <div className="form-group container">
        <label htmlFor="file">Upload Image File:</label>
        <input
          className="form-control"
          type="file"
          id="file-input"
          required
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="box-2">
        {croppedImage && <img src={croppedImage} alt="" className="cropped" />}
      </div>
      <div className="box">
        <button className="btn save" onClick={handleSave}>
          Save
        </button>
        <a
          href={croppedImage}
          download="imagename.png"
          className={`btn download `}
        >
          Download
        </a>
      </div>
      <img
        ref={imageRef}
        src=""
        alt=""
        //style={{ display: "none" }}
      />
    </div>
  );
}
export default NewUploadImage;
