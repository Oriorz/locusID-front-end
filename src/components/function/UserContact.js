import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import GetVCard from "./GetVCard";

const UserContact = ({ userProfile, setProfile, token }) => {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vcardName, setVcardName] = useState(
    userProfile.user.vcard?.name ? userProfile.user.vcard.name : ""
  );
  const [nickname, setNickname] = useState(
    userProfile.user.vcard?.nickname ? userProfile.user.vcard.nickname : ""
  );
  const [vcardPhone, setVcardPhone] = useState(
    userProfile.user.vcard?.phone ? userProfile.user.vcard.phone : ""
  );
  const [title, setTitle] = useState(
    userProfile.user.vcard?.title ? userProfile.user.vcard.title : ""
  );
  const [organization, setOrganization] = useState(
    userProfile.user.vcard?.organization
      ? userProfile.user.vcard.organization
      : ""
  );
  const [vcardAddress, setVcardAddress] = useState(
    userProfile.user.vcard?.address ? userProfile.user.vcard.address : ""
  );
  const [url, setUrl] = useState(
    userProfile.user.vcard?.url ? userProfile.user.vcard.url : ""
  );
  const [contactemail, setContactemail] = useState(
    userProfile.user.vcard?.email ? userProfile.user.vcard.email : ""
  );
  const [notes, setNotes] = useState(
    userProfile.user.vcard?.notes ? userProfile.user.vcard.notes : ""
  );
  const [mapLink, setMapLink] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAddressSubmit = (value) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/api/geocode?address=${value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      /* .then((res) => res.json())
      .then((result) => {
        console.log("geocode is ", result);
      }) */
      .then((res) => res.json())
      .then((result) => {
        //setMapLink(result.mapsLink)
        fetch(`/api/updatemapaddress`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            address: value,
            maplink: result.mapsLink,
            /* maplink: result.place_id, */
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setProfile({ user: data });
            console.log("mapaddress returned is ", data);
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...state,
                address: data.address,
                maplink: data.maplink,
              })
            );
            dispatch({
              type: "UPDATEADDRESS",
              payload: { address: data.address, maplink: data.maplink },
            });
          });
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePhoneSubmit = (value, text) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    /* console.log("state is ", state) */
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
        console.log("/api/updatedetails/", text, " result is ", data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, [text]: data[text] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: text, theValue: data[text] },
        });
        //window.location.reload()
      });
  };

  const handleEmailSubmit = (value, text) => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    /* console.log("state is ", state) */
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
        console.log("/api/updatedetails/email result is ", data);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, contactemail: data[text] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: text, theValue: data[text] },
        });
        //window.location.reload()
      });
  };

  const handleVcardSubmit = () => {
    if (!localStorage.getItem("jwt")) {
      alert("not signed in");
      return;
    }
    fetch(`/api/updatevcard`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        vcard: "vcard",
        value: {
          name: vcardName,
          nickname: nickname,
          phone: vcardPhone,
          email: contactemail,
          organization: organization,
          title: title,
          url: url,
          address: vcardAddress,
          notes: notes,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({ user: data });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, vcard: data["vcard"] })
        );
        dispatch({
          type: "UPDATESOCIALS",
          payload: { theKey: "vcard", theValue: data["vcard"] },
        });
        //window.location.reload()
      });
  };

  return (
    /*  <div className="grid grid-cols-3 items-center justify-around my-auto px-3 gap-7"> */
    <div>
      <div className="flex flex-row items-center justify-around mb-2 px-3 gap-10 mx-auto">
        <div className="flex flex-col items-center justify-center ">
          <GetVCard userProfile={userProfile} />
          {token && (
            <div
              className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base "
              href={"#modal" + "vcard"}
            >
              edit{" "}
            </div>
          )}
        </div>
        <div className="modal bottom-sheet text-center" id={"modal" + "vcard"}>
          <div className=" mr-2 mb-3">
            <div className="   ">
              <p className="text-xl m-2 p-1">Share Contact Details : </p>
              <div className="row text-gray-400 items-center justify-around  max-w-lg mx-auto  text-center m-auto ">
                Shared Name Card currently not supporting Chinese Character
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1">
                <p className="col s3 text-black items-center justify-around pt-1 mt-1 text-right text-sm">
                  1. Name :{" "}
                </p>
                <input
                  className="col s8 border-2 bg-slate-300 mr-2"
                  defaultValue={
                    userProfile.user.vcard?.name
                      ? userProfile.user.vcard.name
                      : ""
                  }
                  onChange={(e) => setVcardName(e.target.value)}
                ></input>

                {/* <input type="checkbox" className="text-gray-300">copy from profile</input> */}
              </div>

              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1">
                <p className="col s3 text-black items-center justify-around pt-1 mt-1 text-right text-sm">
                  2. Nickname :{" "}
                </p>
                <input
                  className="col s8 border-2 bg-slate-300 mr-2"
                  defaultValue={
                    userProfile.user.vcard?.nickname
                      ? userProfile.user.vcard.nickname
                      : ""
                  }
                  onChange={(e) => setNickname(e.target.value)}
                ></input>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  3. Title :{" "}
                </p>
                <input
                  className="col s8  mr-2"
                  defaultValue={
                    userProfile.user.vcard?.title
                      ? userProfile.user.vcard.title
                      : ""
                  }
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-xs">
                  4. Organization :{" "}
                </p>
                <input
                  className="col s8  mr-2"
                  defaultValue={
                    userProfile.user.vcard?.organization
                      ? userProfile.user.vcard.organization
                      : ""
                  }
                  onChange={(e) => setOrganization(e.target.value)}
                ></input>
              </div>

              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  5. Phone :{" "}
                </p>
                <input
                  className="col s8  mr-2"
                  defaultValue={
                    userProfile.user.vcard?.phone
                      ? userProfile.user.vcard.phone
                      : ""
                  }
                  onChange={(e) => setVcardPhone(e.target.value)}
                ></input>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  6. Email :{" "}
                </p>
                <input
                  className="col s8  mr-2"
                  defaultValue={
                    userProfile.user.vcard?.email
                      ? userProfile.user.vcard.email
                      : ""
                  }
                  onChange={(e) => setContactemail(e.target.value)}
                ></input>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  7. Url :{" "}
                </p>
                <input
                  className="col s8  mr-2"
                  defaultValue={
                    userProfile.user.vcard?.url
                      ? userProfile.user.vcard.url
                      : ""
                  }
                  onChange={(e) => setUrl(e.target.value)}
                ></input>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  8. Address :{" "}
                </p>
                <textarea
                  className="col s8 text-sm mr-1 h-24 border-2 border-solid browsers-default"
                  defaultValue={
                    userProfile.user.vcard?.address
                      ? userProfile.user.vcard.address
                      : ""
                  }
                  onChange={(e) => setVcardAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  9. Notes :{" "}
                </p>
                <textarea
                  className="col s8 text-sm mr-1 h-24 border-2 border-solid browsers-default"
                  defaultValue={
                    userProfile.user.vcard?.notes
                      ? userProfile.user.vcard.notes
                      : ""
                  }
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <div>
                <button
                  className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                  onClick={() => handleVcardSubmit()}
                >
                  Edit
                </button>
                <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {userProfile.user.phone ? (
          <div className="flex flex-col items-center justify-center">
            <a href={`tel:${userProfile.user.phone}`}>
              <button className=" rounded-full select-none bg-button-fill w-16 h-16 text-button-base text-center justify-center items-center drop-shadow-lg">
                <i className="material-icons small inline-icon text-button-base">
                  phone
                </i>
              </button>
            </a>
            <div className="text-button-base select-none tracking-wider">
              call
            </div>
            {token && (
              <div
                className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base"
                href={"#modal" + "phone"}
              >
                edit{" "}
              </div>
            )}
          </div>
        ) : (
          <>
            {token && (
              <div className="flex flex-col items-center justify-center">
                <button className=" rounded-full select-none bg-button-fill w-16 h-16 text-skin-base text-center justify-center items-center drop-shadow-lg">
                  <i className="material-icons small inline-icon text-button-base">
                    phone
                  </i>
                </button>
                <div className="text-button-base select-none tracking-wider">
                  call
                </div>
                <div
                  className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base"
                  href={"#modal" + "phone"}
                >
                  edit{" "}
                </div>
              </div>
            )}
          </>
        )}
        <div className="modal bottom-sheet text-center" id={"modal" + "phone"}>
          <div className=" mr-2 mb-3">
            <div className="   ">
              <p className="text-xl m-2 p-1">PHONE : </p>

              <div className="row items-center justify-around  max-w-lg mx-auto mt-2 ">
                <p className="col s3 text-gray-500 items-center justify-around text-right text-sm">
                  Old Phone:{" "}
                </p>
                <p className="col s9 text-gray-500 items-center justify-around text-left text-sm">
                  {userProfile.user.phone
                    ? userProfile.user.phone
                    : "No phone yet"}
                </p>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                  New Phone:{" "}
                </p>
                <input
                  className="col s9  mr-2"
                  defaultValue={userProfile.user.phone}
                  onChange={handlePhoneChange}
                ></input>
              </div>
              <div>
                <button
                  className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                  onClick={() => handlePhoneSubmit(phone, "phone")}
                >
                  Edit
                </button>
                <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {userProfile.user.contactemail ? (
          <div className="flex flex-col items-center justify-center">
            <a href={`mailto:${userProfile.user.contactemail}`}>
              <button className=" rounded-full select-none bg-button-fill w-16 h-16 text-button-base text-center justify-center items-center  drop-shadow-lg">
                <i className="material-icons small inline-icon text-button-base">
                  email
                </i>
              </button>
            </a>
            <div className="text-button-base select-none tracking-wider">
              email
            </div>
            {token && (
              <div
                className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base"
                href={"#modal" + "email"}
              >
                edit{" "}
              </div>
            )}
          </div>
        ) : (
          <>
            {token && (
              <div className="flex flex-col items-center justify-center">
                <button className=" rounded-full select-none bg-button-fill w-16 h-16 text-button-base text-center justify-center items-center drop-shadow-lg">
                  <i className="material-icons small inline-icon text-button-base">
                    email
                  </i>
                </button>
                <div className="text-button-base select-none tracking-wider">
                  email
                </div>
                <div
                  className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base"
                  href={"#modal" + "email"}
                >
                  edit
                </div>
              </div>
            )}
          </>
        )}

        <div className="modal bottom-sheet text-center" id={"modal" + "email"}>
          <div className=" mr-2 mb-3">
            <div className="   ">
              <p className="text-xl m-2 p-1">Email : </p>

              <div className="row items-center justify-around  max-w-lg mx-auto mt-2 ">
                <p className="col s3 text-gray-500 items-center justify-around text-right text-sm">
                  Old Email:{" "}
                </p>
                <p className="col s9 text-gray-500 items-center justify-around text-left text-sm">
                  {userProfile.user.contactemail
                    ? userProfile.user.contactemail
                    : "No Email yet"}
                </p>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right">
                  New Email:{" "}
                </p>
                <input
                  className="col s9  mr-2"
                  defaultValue={userProfile.user.contactemail}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <div>
                <button
                  className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                  onClick={() => handleEmailSubmit(email, "contactemail")}
                >
                  Edit
                </button>
                <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='flex flex-col items-center justify-center'> */}
        {userProfile.user.maplink ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <a
                href={userProfile.user.maplink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className=" rounded-full select-none bg-button-fill w-16 h-16 text-skin-base text-center justify-center items-center drop-shadow-lg">
                  <i className="material-icons small inline-icon text-button-base">
                    location_on
                  </i>
                </button>
              </a>

              <div className="text-button-base select-none tracking-wider">
                address
              </div>
              {token && (
                <div
                  className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base"
                  href={"#modal" + "address"}
                >
                  edit{" "}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {token && (
              <div className="flex flex-col items-center justify-center">
                <button className=" rounded-full select-none bg-button-fill w-16 h-16 text-skin-base text-center justify-center items-center drop-shadow-lg">
                  <i className="material-icons small inline-icon text-button-base ">
                    location_on
                  </i>
                </button>
                <div className="text-button-base select-none tracking-wider">
                  address
                </div>
                <div
                  className="modal-trigger border-solid border-2 border-skin-base p-1 mx-auto my-3 select-none text-skin-base"
                  href={"#modal" + "address"}
                >
                  edit
                </div>
              </div>
            )}
          </>
        )}

        {/* </div> */}

        <div
          className="modal bottom-sheet text-center "
          id={"modal" + "address"}
        >
          <div className=" mr-2 mb-3">
            <div className="   ">
              <p className="text-xl m-2 p-1">Address : </p>

              <div className="row items-center justify-around  max-w-lg mx-auto mt-2 ">
                <p className="col s3 text-gray-500 items-center justify-around text-right text-sm">
                  Old Address:{" "}
                </p>
                <p className="col s9 text-gray-500 items-center justify-around text-left text-sm overflow-y-scroll">
                  {userProfile.user.address
                    ? userProfile.user.address
                    : "Not yet set Address"}{" "}
                </p>
              </div>
              <div className="row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 ">
                <p className="col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm">
                  New Address:{" "}
                </p>
                <textarea
                  className="col s9 border-dotted border-black border-2 h-28 "
                  defaultValue={address}
                  /* placeholder="123-45-678" */
                  onChange={handleAddressChange}
                ></textarea>
              </div>
              {/* <div className='row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 '>
              <p className='col s3 text-black items-center justify-around pt-2 mt-2 text-right text-sm'>  </p>
              <p className='col s9 '
              ><a href="https://www.google.com/maps" target='_blank' rel="noopener noreferrer" >Copy from Google Map </a></p>
            </div> */}

              {/* <button className="btn waves-effect waves-light blue darken-3 mt-3 mx-3"
              
              onClick={() => handleGetMapLink(address, "address")}
            >
              1 . Get Google Map Link</button> */}

              {/* <div className='row items-center justify-around  max-w-lg mx-auto mt-2  text-center m-auto py-1 '>
              <p className='col s3 text-gray-500 items-center justify-around text-right text-sm'>Check Link: </p>
              <a href={mapLink} target='_blank' rel="noopener noreferrer"><p className='col s9 text-black items-center justify-around text-left text-sm '>{mapLink ? mapLink : "Not yet set Link"} </p></a>
            </div> */}

              <div className="">
                <button
                  className="btn modal-close waves-effect waves-light blue darken-3 mt-3 mx-3"
                  onClick={() => handleAddressSubmit(address)}
                >
                  Confirm
                </button>
                <button className="btn modal-close waves-effect waves-light green darken-2 mt-3 mx-3 ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userProfile.user.maplink ||
      userProfile.user.phone ||
      userProfile.user.contactemail ? (
        <div className=" items-center text-skin-base text-center row">
          {userProfile.user.phone ? (
            <div className=" flex flex-row items-center py-2 shadow-md ">
              <div className="col s4 items-center justify-center my-auto text-right">
                Phone :{" "}
              </div>
              <div className=" col s8 ">{userProfile.user.phone}</div>
            </div>
          ) : (
            ""
          )}

          {userProfile.user.contactemail ? (
            <div className="  flex flex-row items-center  py-2 shadow-md ">
              <div className="col s4   text-right content-center">Email : </div>
              <div className=" col s8   ">{userProfile.user.contactemail}</div>
            </div>
          ) : (
            ""
          )}

          {userProfile.user.address ? (
            <div className="  flex flex-row items-center  py-2 shadow-md bg-gradient-lb]">
              <div className="col s4   text-right">Address : </div>
              <div className=" col s8   ">
                {userProfile.user.address.toLowerCase()}
              </div>
            </div>
          ) : (
            ""
          )}
          <div></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserContact;
