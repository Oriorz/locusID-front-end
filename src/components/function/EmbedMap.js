import React from 'react'

export const EmbedMap = () => {


  const API_KEY = process.env.REACT_APP_GOOGLE_API
  console.log(API_KEY)
  return (
    <div className="z-50 flex flex-col items-center justify-center w-full h-[400px]">
      <iframe className="w-full h-[400px] p-4" title="googlemap"
        src=
        {`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Red+Chilli+Hotpot+King,+21G,+Jalan+Radin+Bagus+1,+Bandar+Baru+Sri+Petaling,+57000+Kuala+Lumpur,+Federal+Territory+of+Kuala+Lumpur`}
      ></iframe>
      <p>process.env is {API_KEY}</p>
    </div>
  )
}
