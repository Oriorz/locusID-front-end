import React from "react";
import ContactForm from "../function/ContactForm";
import Footer from "../function/Footer";
import M from "materialize-css";

function ContactUs(props) {
  return (
    <div className="row">
      <br></br>
      <h2 className="container text-center text-5xl font-poppins my-6">
        Contact Us
      </h2>
      <ContactForm />
    </div>
  );
}

export default ContactUs;
