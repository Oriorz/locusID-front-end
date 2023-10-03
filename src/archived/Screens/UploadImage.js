import { useEffect, useState, useRef, React } from "react";
import Cropper from "cropperjs";
import ReactDOM from "react-dom";
import QuipComponent from "../../archived/Components/NewComponent";
const UploadImage = () => {
  const [image, setImage] = useState();
  const imageRef = useRef();
  const resultRef = useRef();
  let cropper = "";
  useEffect(() => {
    //const image1 = imageRef.current;
    console.log("image", image);
  }, [image]);

  const handleChange = (e) => {
    setImage(imageRef.current.src);
    console.log("1", imageRef.current);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target.result) {
        //console.log(e.target.result);
        imageRef.current.src = e.target.result;
        //resultRef.current.appendChild(imageRef.current);
        console.log("2", imageRef.current);
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
  };

  return (
    <div>
      A B
      <QuipComponent inputter={image ? image : "1002"} />
      <div className="form-group container">
        <label htmlFor="file">Upload Image File:</label>
        <input
          className="form-control"
          type="file"
          id="file-input"
          required
          accept="image/*"
          //ref={imageRef}
          onChange={handleChange}
        />
      </div>
      <div>
        <img className="imageref" alt="img" src="" ref={imageRef}></img>
      </div>
      <div>
        <div className="result" ref={resultRef}></div>
      </div>
    </div>
  );
};

export default UploadImage;
