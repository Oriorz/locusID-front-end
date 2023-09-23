import React, { useContext, useEffect, useState } from "react";
import M from "materialize-css";
const InformedEmailSent = () => {
  return (
    <>
      <div className="mycard auth-card font-rubikdirt text-[70px] mt-3 py-1">iTap </div>

      <div className="mycard card auth-card ">

        <div>
          <p>
            An Email has been sent to your Inbox, Please check your Inbox to continue your Account Activation Process.
          </p>
          <br></br>
          <p className="text-xs text-gray-500">Please check your spam folder if the "iTap Email activation" email not found under Inbox</p>
        </div>
      </div>
    </>
  )
}

export default InformedEmailSent