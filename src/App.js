import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/userProfile";
import Test from "./components/screens/Test";
import TestImage from "./components/screens/TestImage";
import Reset from "./components/screens/Reset";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";
import SubscribesUsersPosts from "./components/screens/SubscribesUsersPosts";
import NewPassword from "./components/screens/NewPassword";
import AdminSignup from "./components/screens/AdminSignup";
import FirstTimeSetup from "./components/screens/FirstTimeSetup";
import UploadImage from "./components/screens/UploadImage";
import NewUploadImage from "./components/screens/NewUploadImage";

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
      //similar useHistory.location, maybe useLocation, to check if the location is /reset
      //navigate('/signin')
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/profile/:userid" element={<UserProfile />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route path="/reset/:token" element={<NewPassword />} />
        <Route path="/setup/:token" element={<FirstTimeSetup />} />

        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/myfollowingpost" element={<SubscribesUsersPosts />} />
        <Route path="/test" element={<Test />} />
        <Route path="/testimage" element={<TestImage />} />

        <Route path="/uploadimage" element={<UploadImage />} />
        <Route path="/newuploadimage" element={<NewUploadImage />} />
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
