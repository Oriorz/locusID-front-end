import { useRef, useState } from "react";
import { features } from "../features";
import Carousel from "./Carousel";

function Features() {
  return (
    <>
      <Carousel features={features} />
    </>
  );
}

export default Features;
