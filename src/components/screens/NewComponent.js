import React, { useState, useRef } from "react";
import Cropper from "cropperjs";
class QuipComponent extends React.Component {
  render() {
    return (
      <>
        <p>{this.props.inputter}</p>
        <p>
          What gets us into trouble is not what we don't know. It's what we know
          for sure that just ain't so.
        </p>
      </>
    );
  }
}

/* const QuipComponent = ({ inputter = "100" }) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target.result) {
      //console.log(e.target.result);
      imageRef.current.src = e.target.result;
      //resultRef.current.appendChild(imageRef.current);
      console.log(imageRef.current);
      resultRef.current = new Cropper(imageRef.current, {
        //resultRef = new Cropper(imageRef.current, {
        viewMode: 0,
        dragMode: "move",
        aspectRatio: 1,
        modal: true,
      });
    }
  };
  reader.readAsDataURL(e.target.files[0]);
  return (
    <>
      {React.createElement("img", {
        src: "https://img-9gag-fun.9cache.com/photo/aMEB8QG_700b.jpg",
      })}
      <p>{inputter}</p>
      <p>say what?</p>
    </>
  );
}; */

export default QuipComponent;
