import React, { useState, useEffect, useRef } from "react";
import M from "materialize-css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("general");
  const [contactMethod, setContactMethod] = useState("email");
  const [message, setMessage] = useState("");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [effect, setEffect] = useState(false);
  var w = window.innerWidth;
  var h = window.innerHeight;

  const scrollRef = useRef();

  useEffect(() => {
    // Initialize Materialize CSS select components
    M.FormSelect.init(document.querySelectorAll("select"));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      /* setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      }); */
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend using fetch or axios
    console.log("Form submitted:", {
      name,
      email,
      phone,
      enquiryType,
      contactMethod,
      message,
    });
    // Clear form fields
    setName("");
    setEmail("");
    setPhone("");
    setEnquiryType("general");
    setContactMethod("email");
    setMessage("");
  };

  return (
    <>
      <div className="form-container row flex-col">
        <div className="mx-3 p-4">
          asdf screen width is {screenWidth} and screen height is
          {screenHeight}
        </div>
        <button
          className={`${
            "animate-wiggle"
            /* effect && "animate-wiggle" */
            /* "animate-wiggle" */
          } bg-blue-500 text-white rounded hover:bg-blue-700 hover:shadow-xl p-4 content-center my-auto`}
          onClick={() => {
            setEffect(true);
          }}
          onAnimationEnd={() => {
            setEffect(false);
          }}
        >
          {" "}
          Wiggle{" "}
        </button>
        <form
          //className="bg-blue-200 border-4 border-red-300 rounded-3xl mx-3 p-4 lg:max-w-lg"
          className="bg-blue-100 border-4 border-red-300 rounded-3xl mx-3 p-4"
          onSubmit={handleSubmit}
        >
          <div className="input-field">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone">Phone number</label>
          </div>
          <div className="input-field">
            <select
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
            <label htmlFor="enquiry-type">Enquiry type</label>
          </div>
          <div className="input-field">
            <select
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
              <option value="call">Call</option>
            </select>
            <label htmlFor="contact-method">Preferred contact method</label>
          </div>
          <div className="input-field">
            <textarea
              id="message"
              className="materialize-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <label htmlFor="message">Message</label>
          </div>

          <div className="section center-align">
            <button type="submit" className="waves-effect waves-light btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
