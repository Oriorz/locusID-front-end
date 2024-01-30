import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const renderList = () => {
    return [
      <li key="home">
        {/* <Link to="/">Home</Link> */}

        <Link
          className="pl-3 text-black hover:underline hover:cursor-pointer"
          to="/"
          reloadDocument="true"
        >
          <strong className="text-black hover:underline hover:cursor-pointer font-normal">
            Home
          </strong>
        </Link>
      </li>,
      <li key="faq">
        <Link
          className="pl-3 text-black hover:underline hover:cursor-pointer"
          to="/faq"
          reloadDocument="true"
        >
          <strong className="text-black hover:underline hover:cursor-pointer font-normal">
            FAQ
          </strong>
        </Link>
      </li>,
    ];
  };
  return (
    <nav>
      <div className="nav-wrapper bg-white">
        <Link
          to="/"
          reloadDocument="true"
          className="brand-logo left font-display"
        >
          <strong className="font-normal sm:px-2 md:px-5">iTap</strong>
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
