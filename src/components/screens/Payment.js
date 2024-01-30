import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  return (
    <>
      <div className="row sm:max-w-xl md:max-w-xl lg:max-w-2xl text-left p-6">
        <br></br>
        <h6 className="container text-center text-5xl font-sans mb-6">
          Payment Method
        </h6>
        <p className="mb-5 font-bold">Acceptable Payment Method</p>
        <p className="mb-4">
          Other than the payment done via cart check out purchase. iTap World
          Resources accepts other 2 payment methods:
          <ul className="mt-4">
            <li className=" indent-2 mb-2">
              1. Bank transfer to{" "}
              <strong className=" font-bold">AFFIN BANK</strong> account number
              : <br></br>
              &nbsp; &nbsp; &nbsp;{" "}
              <strong className=" font-bold">100200260346</strong> (Acc : iTap
              World Resources)
            </li>
            <li className=" indent-2">
              2. Touch N Go payment to <strong>iTap World Resources</strong>:{" "}
              <br></br>
              <a
                className="pl-6 hover:cursor-pointer text-blue-400 underline"
                href="https://payment.tngdigital.com.my/sc/bDLnGePOgK"
                target="_blank"
                rel="noreferrer"
              >
                https://payment.tngdigital.com.my/sc/bDLnGePOgK
              </a>
              <div className="m-3 grid grid-cols-2 gap-3">
                <div className="container">
                  <img
                    className="w-[250px] items-center justify-center mx-auto"
                    src="images/home/SVG/tngpayment_itap.jpg"
                    alt="itap tng payment"
                  />
                  <p className="text-center">TNG payment</p>
                </div>
                <div className="container">
                  <img
                    className="w-[250px] items-center justify-center mx-auto"
                    src="images/home/SVG/duitnowpayment_itap.jpg"
                    alt="itap duitnow payment"
                  />
                  <p className="text-center">Duit Now payment</p>
                </div>
              </div>
            </li>
          </ul>
        </p>
        <p className="mb-4">
          Please ensure to key in your{" "}
          <strong>whatsapp number / email / FB or Ins account number</strong> in
          the <strong>payment details</strong> for easy identification. You are
          most welcomed to &nbsp;
          <Link
            className=" text-blue-300 hover:underline hover:cursor-pointer"
            to="/contactus"
            reloadDocument="true"
          >
            <strong className="text-blue-600 hover:underline hover:cursor-pointer font-normal">
              contact us
            </strong>
          </Link>{" "}
          for receiving direct payment instruction.
        </p>
      </div>
    </>
  );
};

export default Payment;
