import React, { useState, useEffect, useRef } from "react";
import M from "materialize-css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("general");
  const [contactMethod, setContactMethod] = useState("email");
  const [message, setMessage] = useState("");

  /* useEffect(() => {
    // Initialize Materialize CSS select components
    M.FormSelect.init(document.querySelectorAll("select"));
  }, []); */

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend using fetch or axios
    console.log("Form submitted:", {
      /* name,
      email,
      phone, */
      enquiryType,
      contactMethod,
      message,
    });
    if (contactMethod === "whatsapp") {
      const url = "https://wa.me/601159959078?text=" + message;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    } else if (contactMethod === "email") {
      console.log("contact method is not whatsapp");
      const url =
        "mailto:contact.itapworld@gmail.com?subject=" +
        enquiryType +
        "&body=" +
        message;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    } else if (contactMethod === "fb") {
      const url = "https://m.me/itapworld?text=" + enquiryType + ": " + message;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    } else {
      M.toast({ html: "please select contact method" });
    }

    /* dummy.current.click(); */
    // Clear form fields
    setName("");
    setEmail("");
    setPhone("");
    setEnquiryType("");
    setContactMethod("");
    setMessage("");
  };

  /* useEffect(() => {
    // Initialize Materialize CSS select component
    M.FormSelect.init(document.getElementById("enquiry-type"));
  }, [enquiryType]); // Trigger reinitialization when enquiryType changes

  useEffect(() => {
    // Initialize Materialize CSS select component
    M.FormSelect.init(document.getElementById("contact-method"));
  }, [contactMethod]); // Trigger reinitialization when contactMethod changes */

  return (
    <>
      <div className="form-container w-5/6 sm:w-5/6 md:w-4/6 lg:w-4/6 xl:w-4/6 p-1">
        <form
          //className="bg-blue-200 border-4 border-red-300 rounded-3xl mx-3 p-4 lg:max-w-lg"
          className="bg-blue-200 bg-opacity-40 border-2  drop-shadow-md rounded-3xl mx-auto p-2 relative"
          onSubmit={handleSubmit}
        >
          <label htmlFor="enquiry-type">Enquiry type</label>
          <div className="input-field ">
            <select
              className="browser-default"
              id="enquiry-type"
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select enquiry type
              </option>
              <option value="bulk order">Bulk order</option>
              <option value="general">General</option>
              <option value="partnership">Partnership</option>
              <option value="technical">Technical</option>
            </select>
          </div>
          <label htmlFor="contact-method">Preferred contact method</label>
          <div className="input-field">
            <select
              className="browser-default"
              id="contact-method"
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              required
            >
              <option value="" disabled>
                Select preferred contact method
              </option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="fb">Facebook Messenger</option>
            </select>
          </div>
          <div className="input-field">
            <input
              id="message"
              type="text" // Set the type to "text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <label htmlFor="message">Message</label>
          </div>

          <div className="section center-align">
            <button
              type="submit"
              className="waves-effect waves-light btn text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
