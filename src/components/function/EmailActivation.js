import React from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

//GoRegistration(event): This function is called when the "Bind" button is clicked. It handles the form submission for email activation. It performs the following tasks:
//Validates the entered email format using a regular expression.
//Displays a toast message with an error if the email format is invalid.
//Sends a POST request to the server's /api/bind-email endpoint with the userid, password, and email in the request body.
//Logs the response from the server.
function EmailActivation({
  userProfile,
  email,
  setEmail,
  password,
  setPassword,
  userid,
}) {
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(String(e).toLowerCase())
  }
  const GoRegistration = async (event) => {
    event.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({ html: "invalid email", classes: "red darken-3" });
    }

    try {
      M.toast({ html: "Sending Email to your Inbox, don't close this page", classes: "green darken-1" })
      const response = await fetch("/api/bind-email", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userid: userid,
          password,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Fetch error from bind-email: ${response.statusText}`);
      }
      const result = await response.json();
      /* console.log("before navigate ", result); */
      navigate("/checkyouremail");
      /* console.log("after navigate"); */

    } catch (error) {
      // Handle other errors (e.g., network errors)
      //const errormessage = await error.json()
      M.toast({ html: `password is not correct or user already registered`, classes: "red darken-3" });
      console.error("Error in GoRegistration:", error);
    }

  };
  return (
    <>
      <div className="mycard auth-card font-rubikdirt text-[70px] mt-3 py-1">iTap </div>
      <div className="mycard  ">
        <div className="card auth-card input-field  ">
          <h2 className="text-xl">Email Activation</h2>
          {Date.parse(userProfile.user.cooldownToken) > Date.now() ?
            <>
              <div className="row">
                <div className="row"></div>
                <p>An Email has been sent to your Inbox, depends on the network condition, it may be delayed. Please check you Inbox or the spam folder to look for the Activation Email</p>
                <br></br>
                <div></div>
                <br></br>
                <div>Or you may request for another Activation Email after 2 mins</div>
              </div>
            </>
            :
            <>
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        className="validate"
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                      />
                      <label className="active" htmlFor="email" >
                        Email
                      </label>
                      <span className="helper-text" data-error="wrong format, example: xxx@gmail.com" data-success="correct email format"></span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="active" htmlFor="password">
                        Password from Card Cover
                      </label>
                    </div>
                  </div>
                </form>
                <div className="notes">
                  <p>Notes:</p>
                  <p>
                    An email containing a link for activation will be sent to the
                    email address provided above for the purpose of binding the
                    account. Please click on the link in the email to complete the
                    activation process.
                  </p>
                </div>
              </div>
              <button
                className="btn waves-effect waves-light blue darken-2"
                onClick={GoRegistration}
              >
                Bind
              </button>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default EmailActivation;
