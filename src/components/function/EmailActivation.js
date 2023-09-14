import React from "react";
import M from "materialize-css";

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
  const GoRegistration = (event) => {
    event.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return M.toast({ html: "invalid email", classes: "red darken-3" });
    }
    M.toast({ html: `user profile id is ${userProfile.user._id} ${userid}` });
    fetch("/api/bind-email", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    //navigate(`/setup/${userid}/${password}`)
  };
  return (
    <>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Email Activation</h2>

          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="active" for="email">
                    Email
                  </label>
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
                  <label className="active" for="password">
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
          {console.log(userProfile.user)}
        </div>
      </div>
    </>
  );
}

export default EmailActivation;
