import React from "react";
import Footer from "../function/Footer";
import { useNavigate } from "react-router-dom";

function RefundPolicy(props) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("https://wa.me/601159959078");
  };
  return (
    <div>
      <div className="row sm:max-w-xl md:max-w-xl lg:max-w-2xl text-left p-6">
        <br></br>
        <h6 className="container text-center text-5xl font-sans">
          Return Policy
        </h6>
        <br></br>
        <br></br>
        <p>
          iTap only consider return requests that meet certain conditions, and
          such requests must be made within 7 days of receiving our product.
        </p>
        <br></br>
        <p>
          Please inspect your order upon reception and contact us immediately if
          the item is defective, damaged or if you receive the wrong item so
          that we can evaluate the issue and make it right.
        </p>
        <br></br>
        <p>
          For a return to be valid, the item must remain in its original
          condition and packaging. Additionally, please ensure you have the
          e-receipt or proof of purchase.
        </p>
        <br></br>
        <p>
          Refunds won't be processed for change-of-mind situations
          post-reception of items. We will, however, consider refunds in cases
          where the item is defective, non-functional upon arrival, and has not
          been tampered with by the customer.
        </p>
        <br></br>
        <p>
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable.
        </p>
        <br></br>
        <p>
          To initiate a return process, you can contact us at&nbsp;
          <strong
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
            href="mailto:contact.itapworld@gmail.com"
          >
            contact.itapworld@gmail.com
          </strong>{" "}
          &nbsp; or&nbsp;
          <a
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
            href="https://wa.me/601159959078"
          >
            whatsapp 601159959078
          </a>{" "}
          &nbsp; . If your return is accepted, we’ll send you instructions on
          how and where to send your package. Items sent back to us without
          first requesting a return will not be accepted.
        </p>
        <br></br>
        <p>
          Once we receive and inspect your return, we'll notify you about the
          approval status of your return. After the return is approved, we will
          initiate the return process and ask for your delivery information for
          the delivery to be completed within 2-3 weeks
        </p>
        <br></br>
        <p>
          We won't be responsible for items lost or misplaced due to your
          personal negligence. In case you've lost or misplaced your iTap
          Products and wish to connect your existing account to your newly
          purchased iTap Products, please contact us at&nbsp;
          <strong
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
            href="mailto:contact.itapworld@gmail.com"
          >
            contact.itapworld@gmail.com
          </strong>{" "}
          &nbsp; or&nbsp;
          <a
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
            href="https://wa.me/601159959078"
          >
            whatsapp 601159959078
          </a>{" "}
          &nbsp;for assistance.
        </p>
        <br></br>
        <p className=" italic">Last Updated : 2023 Dec 15</p>
      </div>
    </div>
  );
}

export default RefundPolicy;
