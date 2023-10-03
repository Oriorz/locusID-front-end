import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
/* import { PostLoginData } from '../function/PostLoginData'; */

export const LogIn = ({
  showModal,
  setShowModal,
  setToken,
  userProfile,
  setProfile,
}) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  /* const handleSubmit = ({password, email}) => {
    PostLoginData({password, email})
  } */

  const handleEmailChange = (e) => {
    setEmail(String(e).toLowerCase());
  };

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({ html: "invalid email", classes: "red darken-3" });
    }
    fetch("/api/signin", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          navigate(`/profile/${data.user._id}`);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "signed in success", classes: "green darken-1" });
          /* navigate("/profile"); */
          setShowModal(false);
          setToken(true);
          setProfile({ user: data.user });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /* const { state, dispatch } = useContext(UserContext); */
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-5/6 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-center">
                    iTap Login
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto z-50">
                  <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-center justify-around p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn waves-effect waves-light blue darken-2"
                    onClick={() => PostData()}
                  >
                    Login
                  </button>
                  <h6 className="m-3 mt-5 underline">
                    <Link to="/reset">Forgot password?</Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
