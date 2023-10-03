import React, { useState, useEffect } from "react";

export const GetMapMetaData = ({
  url = "https://goo.gl/maps/UkvXjMbZ3fD84QeG9",
}) => {
  const [mapUrl, setMapUrl] = useState("");
  const placeId = "ChIJeRpOeF67j4AR9ydy_PIzPuM";
  useEffect(() => {
    fetch(`/api/metadata?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMapUrl(result.image);
        console.log(result);
      });

    return () => {};
  }, []);

  const handleClick = () => {
    fetch(`/api/get-map`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <div>GetMapMetaData</div>
      <div>{mapUrl}</div>
      <div>
        <img src={mapUrl}></img>
      </div>
      <button onClick={handleClick}> Get Map </button>
      <div>
        <img src=""></img>
      </div>
    </>
  );
};
