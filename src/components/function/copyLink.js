import { useRef, useState } from "react";

function CopyLink({ link }) {
  const handleCopy = async (text) => {
    if (text) {
      await navigator.clipboard.writeText(text);
    } else {
      await navigator.clipboard.writeText("no copied text");
    }
  };

  return (
    <div className="my-3 flex flex-row items-center justify-center mx-auto px-auto">
      <div className="col s2 mx-2">{link?.toString()}</div>
      <button
        className="col s6 w-16 h-6 bg-blue-300  mx-2 text-xs"
        onClick={() => {
          handleCopy(link?.toString());
        }}
      >
        Copy
      </button>
    </div>
  );
}

export default CopyLink;
