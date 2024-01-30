import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="page-footer blue-grey darken-4 p-3">
      <div className="container">
        {/* <div className="row justify-center mx-auto gap-4">
          <div className="col l6 s12 mb-5 mt-2">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">Terms and Condition.</p>
          </div>
          <div className="col l4 offset-l2 s12  mb-5 mt-2">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 1
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 2
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 3
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 4
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="container mx-auto flex flex-wrap justify-left ">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6 sm:mb-1">
            <p className="text-lg  mb-1">Quick Links</p>
            <ul>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer"
                  to="/"
                  reloadDocument="true"
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Home
                  </strong>
                </Link>
              </li>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer"
                  to="/contactus"
                  reloadDocument="true"
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Contact Us
                  </strong>
                </Link>
              </li>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer"
                  to="/shop"
                  reloadDocument="true"
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Shop
                  </strong>
                </Link>
              </li>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer"
                  to="/payment"
                  reloadDocument="true"
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Payment Method
                  </strong>
                </Link>
              </li>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer"
                  to="/faq"
                  reloadDocument="true"
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    FAQ
                  </strong>
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6 sm:mb-1">
            <p className="text-lg  mb-1">About Us</p>
            <ul>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer font-normal"
                  to="/refundpolicy"
                  reloadDocument="true"
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Return Policy
                  </strong>
                </Link>
              </li>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer "
                  to="/privacypolicy"
                  reloadDocument="true"
                  /* onClick={() => {
                navigate("/privacypolicy");
              }} */
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Privacy Policy
                  </strong>
                </Link>
              </li>
              <li>
                <Link
                  className="pl-3 text-white hover:underline hover:cursor-pointer "
                  to="/terms"
                  reloadDocument="true"
                  /* onClick={() => {
                navigate("/terms");
              }} */
                >
                  <strong className="text-white hover:underline hover:cursor-pointer font-normal">
                    Terms of service
                  </strong>
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6 sm:mb-1">
            <p className="text-lg  mb-1">Column 3</p>
            <p>link 1</p>
          </div> */}
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2023 iTap World | one world a tap
          {/* <svg src="/images/home/fb.svg" className="  w-10 h-10 right"></svg> */}
          <a
            href="https://www.facebook.com/itapworld"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="w-10 h-10 right fill-gray-500 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              height="800"
              width="1200"
              viewBox="-204.79995 -341.33325 1774.9329 2047.9995"
            >
              <path d="M1365.333 682.667C1365.333 305.64 1059.693 0 682.667 0 305.64 0 0 305.64 0 682.667c0 340.738 249.641 623.16 576 674.373V880H402.667V682.667H576v-150.4c0-171.094 101.917-265.6 257.853-265.6 74.69 0 152.814 13.333 152.814 13.333v168h-86.083c-84.804 0-111.25 52.623-111.25 106.61v128.057h189.333L948.4 880H789.333v477.04c326.359-51.213 576-333.635 576-674.373" />
              <path
                d="M948.4 880l30.267-197.333H789.333V554.609C789.333 500.623 815.78 448 900.584 448h86.083V280s-78.124-13.333-152.814-13.333c-155.936 0-257.853 94.506-257.853 265.6v150.4H402.667V880H576v477.04a687.805 687.805 0 00106.667 8.293c36.288 0 71.91-2.84 106.666-8.293V880H948.4"
                fill="#fff"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/itapworld"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="w-10 h-10 right fill-gray-500 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              height="800"
              width="1200"
              viewBox="-100.7682 -167.947 873.3244 1007.682"
            >
              <path d="M335.895 0c-91.224 0-102.663.387-138.49 2.021-35.752 1.631-60.169 7.31-81.535 15.612-22.088 8.584-40.82 20.07-59.493 38.743-18.674 18.673-30.16 37.407-38.743 59.495C9.33 137.236 3.653 161.653 2.02 197.405.386 233.232 0 244.671 0 335.895c0 91.222.386 102.661 2.02 138.488 1.633 35.752 7.31 60.169 15.614 81.534 8.584 22.088 20.07 40.82 38.743 59.495 18.674 18.673 37.405 30.159 59.493 38.743 21.366 8.302 45.783 13.98 81.535 15.612 35.827 1.634 47.266 2.021 138.49 2.021 91.222 0 102.661-.387 138.488-2.021 35.752-1.631 60.169-7.31 81.534-15.612 22.088-8.584 40.82-20.07 59.495-38.743 18.673-18.675 30.159-37.407 38.743-59.495 8.302-21.365 13.981-45.782 15.612-81.534 1.634-35.827 2.021-47.266 2.021-138.488 0-91.224-.387-102.663-2.021-138.49-1.631-35.752-7.31-60.169-15.612-81.534-8.584-22.088-20.07-40.822-38.743-59.495-18.675-18.673-37.407-30.159-59.495-38.743-21.365-8.302-45.782-13.981-81.534-15.612C438.556.387 427.117 0 335.895 0zm0 60.521c89.686 0 100.31.343 135.729 1.959 32.75 1.493 50.535 6.965 62.37 11.565 15.68 6.094 26.869 13.372 38.622 25.126 11.755 11.754 19.033 22.944 25.127 38.622 4.6 11.836 10.072 29.622 11.565 62.371 1.616 35.419 1.959 46.043 1.959 135.73 0 89.687-.343 100.311-1.959 135.73-1.493 32.75-6.965 50.535-11.565 62.37-6.094 15.68-13.372 26.869-25.127 38.622-11.753 11.755-22.943 19.033-38.621 25.127-11.836 4.6-29.622 10.072-62.371 11.565-35.413 1.616-46.036 1.959-135.73 1.959-89.694 0-100.315-.343-135.73-1.96-32.75-1.492-50.535-6.964-62.37-11.564-15.68-6.094-26.869-13.372-38.622-25.127-11.754-11.753-19.033-22.943-25.127-38.621-4.6-11.836-10.071-29.622-11.565-62.371-1.616-35.419-1.959-46.043-1.959-135.73 0-89.687.343-100.311 1.959-135.73 1.494-32.75 6.965-50.535 11.565-62.37 6.094-15.68 13.373-26.869 25.126-38.622 11.754-11.755 22.944-19.033 38.622-25.127 11.836-4.6 29.622-10.072 62.371-11.565 35.419-1.616 46.043-1.959 135.73-1.959" />
              <path d="M335.895 447.859c-61.838 0-111.966-50.128-111.966-111.964 0-61.838 50.128-111.966 111.966-111.966 61.836 0 111.964 50.128 111.964 111.966 0 61.836-50.128 111.964-111.964 111.964zm0-284.451c-95.263 0-172.487 77.224-172.487 172.487 0 95.261 77.224 172.485 172.487 172.485 95.261 0 172.485-77.224 172.485-172.485 0-95.263-77.224-172.487-172.485-172.487m219.608-6.815c0 22.262-18.047 40.307-40.308 40.307-22.26 0-40.307-18.045-40.307-40.307 0-22.261 18.047-40.308 40.307-40.308 22.261 0 40.308 18.047 40.308 40.308" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
