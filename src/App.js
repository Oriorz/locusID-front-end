import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";
import Home from "./components/screens/Home";
import UserProfile from "./components/screens/userProfile";
import ResetPassword from "./components/screens/ResetPassword";
import NewPassword from "./components/screens/NewPassword";
import FirstTimeSetup from "./components/screens/FirstTimeSetup";
import Faq from "./components/screens/Faq";
import ContactUs from "./components/screens/ContactUs";
import CheckYourEmail from "./components/screens/CheckYourEmail";
import NamedProfile from "./components/screens/NamedProfile";
import RefundPolicy from "./components/screens/RefundPolicy";
import TermsOfService from "./components/screens/TermsOfService";
import PrivacyPolicy from "./components/screens/PrivacyPolicy";
import Loading from "./components/screens/TestLoading";
import Layouts from "./components/function/Layouts";
import Shop from "./components/screens/Shop";
import Payment from "./components/screens/Payment";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      //navigate('/')
    } else {
      //if we need to use the navigate to /signin below, i need to find a  similar
      //similar useHistory.location, maybe useLocation, to check if the location is /ResetPassword
      //navigate('/signin')
    }
  }, []);
  return (
    <>
      <Routes>
        {/* This is public */}
        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<NewPassword />} />
          <Route path="/setup/:token" element={<FirstTimeSetup />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/checkyouremail" element={<CheckYourEmail />} />
          {/* Newly added business module, need to check */}
          <Route path="/refundpolicy" element={<RefundPolicy />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/testload" element={<Loading />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        <Route path="/profile/:userid" element={<UserProfile />} />
        <Route path="/u/:userid" element={<NamedProfile />} />

        {/* this is private */}
        {/* <Route path="/signin" element={<Signin />} /> */}
        {/* <Route exact path="/profile" element={<Profile />} /> */}
        {/* <Route path="/adminsignup" element={<AdminSignup />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/myfollowingpost" element={<SubscribesUsersPosts />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/testimage" element={<TestImage />} /> */}

        {/* This is testing */}
        {/* <Route path="/uploadimage" element={<UploadImage />} /> */}
        {/* <Route path="/newuploadimage" element={<NewUploadImage />} /> */}
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
