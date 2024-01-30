import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import M from "materialize-css";

export const ProfileNotes = ({ userProfile, token, setProfile }) => {
  const [notes, setNotes] = useState(userProfile.user.notes);
  const { state, dispatch } = useContext(UserContext);
  const handleNotesChanges = (event) => {
    setNotes(event.target.value);
  };

  const handleNotesSubmit = (value, text) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/api/updatedetails/${text}`, {
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
        console.log("/api/updatedetails/notes result is ", data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, notes: data[text] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: text, theValue: data[text] },
        });
        //window.location.reload()
      });
  };
  return (
    <>
      <div className="font-poppins text-center  text-lg mb-3 text-skin-base underline">
        About Me:
      </div>
      {userProfile.user.notes ? (
        <>
          <div className="font-poppins whitespace-pre-wrap border-none text-center text-skin-base grid grid-rows-1">
            <div className=" text-base">
              {userProfile.user.notes}
              {token && (
                <i
                  className="material-icons modal-trigger ml-2 mr-1 mb-0 bg-skin-fill border-skin-base border-solid border-2 select-none"
                  href={"#modal" + "editNotes"}
                >
                  edit
                </i>
              )}
            </div>
          </div>
          <div id={"modal" + "editNotes"} className="modal bottom-sheet">
            <div className=" mx-auto p-0 flex flex-col items-center">
              <p className="text-md mt-3 mb-1 p-1 underline">
                {" "}
                Old Notes : {userProfile.user.notes}
              </p>
            </div>
            <p className="text-md m-1 p-1 text-center"> Change to </p>
            <div className="row items-center justify-around  max-w-lg mx-auto mt-2">
              <p className="col s2 text-black items-center justify-around text-md">
                {" "}
                New:{" "}
              </p>
              <textarea
                className="text-sm col s10 browsers-default h-32 border-black border-solid border-2"
                rows="10"
                defaultValue={userProfile.user.notes}
                onChange={handleNotesChanges}
              />
            </div>
            <div className="mx-auto items-center justify-center flex mb-2 pb-2">
              <button
                className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                onClick={() => {
                  if (!userProfile.user.notes) {
                    M.toast({ html: "Please key in Notes" });
                    return;
                  }
                  handleNotesSubmit(notes, "notes");
                }}
              >
                Edit
              </button>
              <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="font-poppins whitespace-pre-wrap border-none text-center">
            Brewing for something interest!
          </div>
        </>
      )}
    </>
  );
};
