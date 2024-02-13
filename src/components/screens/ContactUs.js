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
      <div className="flex flex-col justify-center items-center align-middle mx-auto">
        <ContactForm className=" p-1" />
        <div className="  sm:w-5/6 md:w-4/6 p-3">
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <h3 className="text-4xl font-semibold mb-4 w-5/6">
              Hyper Charge Your Digital Presence with iTap Today
            </h3>
            <p>Address :</p>
            <p className="mb-4">
              22-1, Jln Radin Bagus 3, Bandar Baru Sri Petaling, 57000 Kuala
              Lumpur, Wilayah Persekutuan Kuala Lumpur{" "}
            </p>
            <p>Phone :</p>
            <p className="mb-4">+6011-5995 9078</p>
            <p>Email :</p>
            <p className="mb-4">contact.itapworld@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
