import React from "react";
import ContactForm from "../ContactForm";
import Footer from "./Footer";
import M from "materialize-css";

function ContactUs(props) {
  return (
    <div className="row">
      <br></br>
      <h2 className="container text-center text-7xl">Contact Us</h2>
      <ContactForm />
      <Footer />
    </div>
  );
}

export default ContactUs;
