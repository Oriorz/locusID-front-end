import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { LogIn } from "../modals/logIn";
import M from "materialize-css";

export const FloatSignin = ({
  token,
  setToken,
  setTheme,
  theme,
  setProfile,
}) => {
  const [open, setopen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPurchaseTop, setShowPurchaseTop] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [figure, setFigure] = useState(0);
  const [isThemeChanged, setIsThemeChanged] = useState(false);

  const handleClick = () => {
    setopen(!open);
  };

  const handleLogin = () => {
    setShowModal(!showModal);
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    setToken(false);
    setopen(false);
    M.toast({ html: "You have signed out", classes: "green darken-1" });
  };

  const handleColorChange = (color) => {
    //M.toast({html:color})
    setTheme(color);
    setIsThemeChanged(true);
  };

  const confirmColorChange = () => {};

  const handleEdit = (value, text) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/updatedetails/${text}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        value: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({ user: data });
        console.log("updatedetails/name result is ", data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, [text]: data[text] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: text, theValue: data[text] },
        });
        setIsThemeChanged(false);
        //window.location.reload()
      });
  };

  useEffect(() => {
    if (!theme || theme === "root") {
      setFigure(0);
    } else {
      switch (theme) {
        case "theme-black":
          setFigure(1);
          break;
        case "theme-purple":
          setFigure(2);
          break;
        case "theme-brown":
          setFigure(3);
          break;
        case "theme-green":
          setFigure(4);
          break;
        case "theme-red":
          setFigure(5);
          break;
        case "theme-yellow":
          setFigure(6);
          break;
        default:
          console.log("nothing from theme");
      }
    }
  }, [theme]);

  // TODO : change the logo to "-" when the user is logged in, (need to change angle)
  // (DONE) then when the user is logged out, change back to "+"

  // (cant) TODO : refactor code for the modal login part

  // (DONE) TODO : add in theme selector
  // (DONE) TODO : sub task, to add / define the variable in the theme.extend

  // (DONE) TOCHECK : if localStorage.removeItem('user') is necessary? if yes,
  // (DONE) (cont') should do dispatch as well?
  return (
    <>
      <div className="">
        {showPurchaseTop ? (
          <button
            className={`${
              open &&
              "transform -translate-x-10 duration-150 opacity-100 visible"
            } z-10 absolute border-2 p-3  border-emerald-800 bg-white w-50 h-10 right-32 top-3 opacity-100 flex items-center justify-center ${
              !open && "collapse transform opacity-0 duration-200"
            }`}
          >
            <p>Purchase</p>
          </button>
        ) : (
          ""
        )}
        <button
          className={`${
            open &&
            "transform -translate-x-10 opacity-100 visible duration-150 "
          } z-10 absolute border-2 p-3  border-emerald-800 bg-white w-50 h-10 right-12 top-3 opacity-100 flex items-center justify-center ${
            !open && "collapse transform opacity-0 duration-200"
          }`}
          type="button"
        >
          {token ? (
            //this first line is when user logged in, so no need to promp LoginModal, instead it should clean JWT
            <p onClick={handleLogOut}>Sign Out</p>
          ) : (
            //this second line is when user logged out, so need to promp LoginModal
            <p onClick={handleLogin}>Sign In</p>
          )}
        </button>
        <button
          onClick={handleClick}
          className={`${
            open &&
            "transform -rotate-45 duration-150 rounded-sm border-dotted border-gray-500 bg-white focus:bg-white "
          }z-10 absolute border-2 p-1.5 rounded-full border-solid border-gray-500 bg-white w-10 h-10 right-3 top-3 opacity-70 ${
            !open &&
            "transform duration-200 rotate-90 border-solid border-gray-500 bg-white"
          }`}
        >
          {open ? (
            <img
              width="100px"
              height={100}
              src="../images/minus.svg"
              alt="-"
            ></img>
          ) : (
            <img
              width="100px"
              height={100}
              src="../images/plus.svg"
              alt="+"
            ></img>
          )}
        </button>
      </div>
      {open && token ? (
        <>
          <div
            className="bg-white w-8 h-8 absolute border-solid border-black border-2 top-[65px] right-4 z-50 select-none text-center items-center justify-center my-auto"
            onClick={() => handleColorChange("root")}
          >
            {figure === 0 ? <i className="material-icons">done</i> : ""}{" "}
          </div>
          <div
            className="bg-[#121212] w-8 h-8 absolute border-solid border-white border-2 top-[105px] right-4 z-50 select-none text-center items-center justify-center my-auto "
            onClick={() => handleColorChange("theme-black")}
          >
            {figure === 1 ? (
              <i className="material-icons icon-white">done</i>
            ) : (
              ""
            )}{" "}
          </div>
          <div
            className="bg-purple-400 w-8 h-8 absolute border-solid border-black border-2 top-[145px] right-4 z-50 select-none text-center items-center justify-center my-auto "
            onClick={() => handleColorChange("theme-purple")}
          >
            {figure === 2 ? <i className="material-icons">done</i> : ""}{" "}
          </div>
          <div
            className="bg-[#e7c6a3] w-8 h-8 absolute border-solid border-black border-2 top-[185px] right-4 z-50 select-none text-center items-center justify-center my-auto "
            onClick={() => handleColorChange("theme-brown")}
          >
            {figure === 3 ? (
              <i className="material-icons icon-white">done</i>
            ) : (
              ""
            )}{" "}
          </div>
          <div
            className="bg-[#003d2d] w-8 h-8 absolute border-solid border-white border-2 top-[225px] right-4 z-50 select-none text-center items-center justify-center my-auto "
            onClick={() => handleColorChange("theme-green")}
          >
            {figure === 4 ? (
              <i className="material-icons icon-white">done</i>
            ) : (
              ""
            )}{" "}
          </div>
          <div
            className="bg-[#ff577e] w-8 h-8 absolute border-solid border-black border-2 top-[265px] right-4 z-50 select-none text-center items-center justify-center my-auto "
            onClick={() => handleColorChange("theme-red")}
          >
            {figure === 5 ? (
              <i className="material-icons icon-white">done</i>
            ) : (
              ""
            )}{" "}
          </div>
          <div
            className="bg-[#ffeb38] w-8 h-8 absolute border-solid border-black border-2 top-[305px] right-4 z-50 select-none text-center items-center justify-center my-auto "
            onClick={() => handleColorChange("theme-yellow")}
          >
            {figure === 6 ? (
              <i className="material-icons icon-white">done</i>
            ) : (
              ""
            )}{" "}
          </div>
          {isThemeChanged && (
            <div
              className="btn green waves-effect bg-white  absolute top-[345px] right-4 z-50 select-none text-center  items-center justify-center my-auto border-black border-solid border-2"
              onClick={() => handleEdit(theme, "theme")}
            >
              {" "}
              confirm?{" "}
            </div>
          )}
        </>
      ) : (
        ""
      )}
      <LogIn
        showModal={showModal}
        setShowModal={setShowModal}
        setToken={setToken}
      />
    </>
  );
};
