import React, { useEffect } from "react";
import ShopifyBuyButton from "../function/BuyNow";

const Shop = () => {
  return (
    <>
      <div className="row sm:max-w-xl md:max-w-xl lg:max-w-2xl text-left p-6">
        <br></br>
        <h6 className="container text-center text-5xl font-sans">Shop</h6>

        <ShopifyBuyButton id="7235519971382" />
        <ShopifyBuyButton id="7235987374134" />
      </div>
    </>
  );
};

export default Shop;
