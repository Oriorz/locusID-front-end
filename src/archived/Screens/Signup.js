import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  useEffect(()=>{
    if(url){
      UploadFields()
    }
  },[url])
  
  const PostData = () => {
    if(image){
      UploadPic()
    }
    else {
      UploadFields()
    }
  }

  const UploadPic = () => {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "xiaomiao")
    fetch("https://api.cloudinary.com/v1_1/xiaomiao/image/upload", {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url)
        })
        .catch(err => console.log(err))
  }

  const UploadFields = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      return M.toast({ html: "invalid email", classes: "red darken-3" })
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic:url
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-3" })
        }
        else {
          M.toast({ html: data.message, classes: "green darken-1" })
          navigate('/signin')

        }
      })

  }

  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2>iTap</h2>
        <input
          type="text"
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn blue darken-1">
            <span>Upload pic</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper ">
            <input className="file-path validate" type="text" placeholder="Upload one or more files" />
          </div>
        </div>
        <button className="btn waves-effect waves-light blue darken-2"
          onClick={() => PostData()}
        >
          Signup
        </button>

        <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5>
      </div>
    </div>
  )
}

export default Signup