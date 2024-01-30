import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Layouts = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layouts;
