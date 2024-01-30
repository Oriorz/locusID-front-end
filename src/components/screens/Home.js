import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import M from "materialize-css";
import ShopifyBuyButton from "../function/BuyNow";
import Features from "../function/Features";

const Home = () => {
  useEffect(() => {
    // Initialize the accordion when the component mounts
    const elems = document.querySelectorAll(".collapsible");
    const instances = M.Collapsible.init(elems);
    // Clean up the accordion when the component unmounts
    return () => instances.destroy();
  }, []);

  const checkStatus = () => {
    fetch("/api/healthcheck", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Health Check : ", data.data);
      });
  };

  return (
    <div>
      <div className="home">
        {/* <Carousel /> */}
        <div className="container"></div>
        <div className=" mx-auto flex flex-wrap justify-center ">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2   text-3xl text-center items-center justify-center bg-[#121212]">
            <div className="text-6xl text-white font-bold text-left px-5 pt-6 lg:px-16 lg:pt-16 md:px-20 md:pt-20 leading-tight  ">
              BRING YOUR NAMECARD TO LIVE{" "}
              <strong className="text-cyan-300 ">WITH ITAP</strong>
            </div>
            <div className="mt-10 bg-green-500 text-white h-12 w-40 items-center justify-center mx-auto px-3 text-center py-1">
              Get Yours
            </div>
          </div>
          <div className="relative w-full sm:w-1/2  md:w-1/2 lg:w-1/2 xl:w-1/2  text-3xl text-center bg-gray-300 bg-blend-multiply opacity-70 ">
            {/* <div
              className="bg-[url('../public/images/cover1.jpg')]"
              alt="coverimage"
            ></div> */}
            <div className="absolute z-10 flex text-emerald-100 font-serif tracking-widest text-center content-center justify-center w-full h-full top-24 mx-auto my-auto">
              TAP . SHARE . CONNECT
            </div>
            <div
              className="bg-cover bg-no-repeat  bg-center h-screen bg-gray-600 bg-blend-multiply"
              /* style={{ backgroundImage: `url('../images/cover2.jpg')` }} */
              style={{
                backgroundImage: `url('../images/cover2.jpg')`,
              }}
            ></div>
          </div>
          <div className=" container">
            <div className=" text-center mt-16 mb-10 text-lg">
              Incorporated with numerous famous medium
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 grid-rows-3 md:grid-rows-3 lg:grid-rows-3 gap-5 mx-4 ">
              {/* Your grid items go here */}
              <img src="/images/home/facebook.svg"></img>
              <img src="/images/home/instagram.svg"></img>
              <img src="/images/home/twitter.svg"></img>
              <img src="/images/home/wechat.svg"></img>
              <img src="/images/home/foursquare.svg"></img>
              <img src="/images/home/googlemap.svg"></img>
              <img src="/images/home/grab.svg"></img>
              <img src="/images/home/discord.svg"></img>
              <img src="/images/home/youtube.svg"></img>
              <img src="/images/home/foodpanda.svg"></img>
              <img src="/images/home/weibo.svg"></img>
              <img src="/images/home/tiktok.svg"></img>
              <img src="/images/home/abnb.svg"></img>
              <img src="/images/home/telegram.svg"></img>
              <img src="/images/home/linkedin.svg"></img>

              {/* Add more items as needed */}
            </div>
            <div className=" text-center mb-16 mt-8 text-lg">and more ...</div>
          </div>
        </div>

        <Features />
        {/* <div className="w-full mx-auto flex  justify-center ">
          <div className="w-full">
            <img
              src="images/ilovethis.gif"
              alt="coverphoto"
              className="w-full max-w-full object-cover"
            ></img>
          </div>
        </div> */}
        <div className="social"></div>
      </div>
    </div>
  );
};

export default Home;
