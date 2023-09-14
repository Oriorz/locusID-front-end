import React, { useContext, useEffect, useState } from "react";
import M from "materialize-css";
import Footer from "./Footer";

const Faq = () => {
  useEffect(() => {
    // Initialize the accordion when the component mounts
    const elems = document.querySelectorAll(".collapsible");
    const instances = M.Collapsible.init(elems);
    // Clean up the accordion when the component unmounts
    return () => instances.destroy();
  }, []);

  return (
    <div>
      <div className="home">
        <h2 class="center-align black-text ">Frequently Asked Question</h2>
        <div className="accordion-container ">
          <ul className="collapsible  ">
            <li className="collapsible-item ">
              <div className="collapsible-header teal lighten-3">
                How does iTap works
              </div>
              <div className="collapsible-body teal lighten-4">
                <p>
                  Every iTap (card/key-chain) is equipped with a physical Smart
                  Card that contains a wireless chip, which sends your digital
                  profile to the receiver's phone through Near-Field
                  Communication (NFC).
                </p>
                <p>
                  To access your digital profile, simply hold or touch the card
                  near the receiver's phone. For older phones without NFC
                  capability, they can scan the QR code on the card using their
                  camera to view your profile.
                </p>
                <p>
                  Additionally, you can share your digital profile virtually
                  through a URL, digital QR code, or by including it in your
                  email signature or virtual background during e-meetings.
                </p>
              </div>
            </li>
            <li className="collapsible-item ">
              <div className="collapsible-header teal lighten-3">
                What can we display with iTap
              </div>
              <div className="collapsible-body teal lighten-4">
                <ul>
                  <li>
                    <strong>1. Contact Details : </strong> Phone Number,
                    biography, etc.
                  </li>
                  <li>
                    <strong>2. Personalized Link : </strong> Website, Blog, etc.
                  </li>
                  <li>
                    <strong>3. Socials : </strong> Facebook, Instagram, Wechat,
                    Linkedin, etc.
                  </li>
                  <li>
                    <strong>4. Maps : </strong> Google Map.
                  </li>
                  <li>
                    <strong>5. Payment Links : </strong> TNG QR, Grabpay QR,
                    Boost QR, etc.
                  </li>
                  <li>
                    <strong>6. Highlights : </strong> Image Gallery,
                    achievements, etc.
                  </li>
                </ul>
              </div>
            </li>
            <li className="collapsible-item ">
              <div className="collapsible-header teal lighten-3">
                How to setup my iTap profile
              </div>
              <div className="collapsible-body teal lighten-4">
                <p>
                  <strong>Auto Setup : </strong> iTap user can input the info in
                  google form and our system will automatically setup your
                  profile for you
                </p>
                <p>
                  <strong>Manual Setup : </strong>A Setup instruction will come
                  with every iTap (card/keychain) purchased, same instruction
                  will be sent to registered email.
                </p>
              </div>
            </li>
            <li className="collapsible-item ">
              <div className="collapsible-header teal lighten-3">
                Does iTap works on every phone
              </div>
              <div className="collapsible-body teal lighten-4">
                <p>
                  Yes, iTap is supported by all modern smartphones. There are 2
                  ways to access iTap
                </p>
                <p>
                  <strong>1. By Tapping : </strong> iTap can be accessed by
                  tapping on the NFC sensor which in most cases placed at the
                  top area. This feature functions specifically with devices
                  that are enabled with NFC, You can check the list for
                  NFC-enable devices.
                </p>
                <p>
                  <strong>2. By Scanning QR : </strong> Should your smartphone
                  not NFC-enabled or you prefer sharing with QR code, you can
                  share your iTap profile QR code display via your iTap profile
                  page.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <br></br>
      <h6 className="end-quote black-text center-align">
        Didn't find the answer that you are looking for? Get in touch with us.
      </h6>
      <br></br>
      <Footer />
    </div>
  );
};

export default Faq;
