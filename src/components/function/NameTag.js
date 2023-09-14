import React,{useState} from 'react'


const NameTag = () => {
    const [organization, setOrganization] = useState('Planet M');
  const [title, setTitle] = useState('Manager');

  return (
    <>
      <h1 className="font-poppins text-2xl text-skin-base text-center">Ming</h1>
      <div className="row justify-center mx-auto items-center text-center flex flex-row">
        <div className="font-poppins w-full text-2xl text-skin-base col s5 text-right justify-end items-center">
          {organization}
        </div>
        <div className="font-poppins text-2xl text-skin-base col s2 text-center"> | </div>
        <div className="font-poppins text-2xl text-skin-base col s5 text-left">
          {title}
        </div>
      </div>
    </>
  );

}

export default NameTag