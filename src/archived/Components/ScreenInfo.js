import React, { useState , useEffect} from 'react'

export const ScreenInfo = () => {
  const [screen, setScreen] = useState([window.innerHeight, window.innerWidth]);

  const updateInfo = () => {
    setScreen([window.innerHeight, window.innerWidth])
  }
  useEffect(() => {
    window.addEventListener("resize", () => {updateInfo()});
  }, []);
  
  return (
    <div className='absolute flex flex-col top-10 left-2 bg-yellow-500 opacity-50 items-center'  >
      <div>window.innerHeight : {screen[0]}</div>
      <div>window.innerWidth : {screen[1]}</div>
      <div>sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px</div>
      <div></div>
      {/* <button className='border-2 border-solid border-red-600 ' onClick={updateInfo}>update</button> */}
    </div>
  )
}
