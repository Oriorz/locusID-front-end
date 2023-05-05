import { useRef, useState } from "react";

function CopyLink({ link }) {
  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
    } else {
      navigator.clipboard.writeText("no copied text");
    }
  };
  return (
    <>
      <button onClick={() => handleCopy(link)}>Copy</button>
    </>
  );
}

export default CopyLink;
