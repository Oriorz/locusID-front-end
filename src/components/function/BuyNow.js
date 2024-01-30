import React, { useEffect } from "react";
const { SHOPIFY_STORE_ACCESS } = require("../../config/key");

const ShopifyBuyButton = ({ id }) => {
  const divId = `product-component-${id}`;
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

    // Append the script to the document head
    document.head.appendChild(script);

    // Event listener for script load
    script.onload = () => {
      // Once the script is loaded, use the global ShopifyBuy object
      const client = window.ShopifyBuy.buildClient({
        domain: "9aa573-2.myshopify.com",
        storefrontAccessToken: SHOPIFY_STORE_ACCESS,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: id,
          node: document.getElementById(divId),
          moneyFormat: "RM%7B%7Bamount%7D%7D%20MYR",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(25% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "50px",
                  },
                },
                title: {
                  "font-size": "26px",
                },
                price: {
                  "font-size": "18px",
                },
                compareAt: {
                  "font-size": "15.299999999999999px",
                },
                unitPrice: {
                  "font-size": "15.299999999999999px",
                },
              },
              layout: "horizontal",
              contents: {
                img: false,
                imgWithCarousel: true,
                description: true,
              },
              width: "100%",
              text: {
                button: "Add to cart",
              },
            },
            // ... other options
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                title: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "bold",
                  "font-size": "26px",
                  color: "#4c4c4c",
                },
                price: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "normal",
                  "font-size": "18px",
                  color: "#4c4c4c",
                },
                compareAt: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "normal",
                  "font-size": "15.299999999999999px",
                  color: "#4c4c4c",
                },
                unitPrice: {
                  "font-family": "Helvetica Neue, sans-serif",
                  "font-weight": "normal",
                  "font-size": "15.299999999999999px",
                  color: "#4c4c4c",
                },
              },
              text: {
                button: "Add to cart",
              },
            },
            option: {},
            cart: {
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
            toggle: {},
          },
        });
      });
    };

    // Cleanup function to remove the script from the head
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Run only on mount and unmount

  return <div id={divId} className=" top-2"></div>;
};

export default ShopifyBuyButton;
