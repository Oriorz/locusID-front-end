import { useEffect, useState } from "react";

function ShowQR() {
  const [Qr, setQr] = useState();
  const generateQR = async (text) => {
    var QRCode = require("qrcode");
    try {
      var qrstring = await QRCode.toDataURL(text);
      return qrstring;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // try to use IIFE for generateQR async function
    (async () => {
      const genQR = await generateQR(window.location.href);
      setQr(genQR);
    })();

    return () => {};
  }, []);
  return (
    <>
      {Qr ? (
        <>
          <div className="flex items-center justify-center ">
            <img src={Qr} alt="qrcode" />{" "}
          </div>
          <div className="flex items-center justify-center mb-3 text-skin-base">
            Scan QR above for Digital Name Card
          </div>
        </>
      ) : (
        <div className="font-mono"> Loading QR </div>
      )}
    </>
  );
}

export default ShowQR;
