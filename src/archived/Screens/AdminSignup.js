import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import { add } from 'lodash'

const AdminSignup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  /* useEffect(()=>{
    if(url){
      UploadFields()
    }
  },[url]) */

  
  const PostData = () => {
    var randomstring = Math.random().toString(36).substring(2, 12);
    var randomstring1 = Math.random().toString(36).substring(2, 12);
    var randomstring2 = Math.random().toString(36).substring(2, 12);
    console.log("randomstring = ", randomstring)
    console.log("randomstring1 = ", randomstring1)
    console.log("randomstring2 = ", randomstring2)
    fetch("/adminsignup", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        name: randomstring,
        password: randomstring1,
        email: randomstring2,
        pic: url,
        isInitialized: false
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))

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
        pic: url
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
        <h2>iTap Admin</h2>
        {/* <input
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
        /> */}
        <button className="btn waves-effect waves-light blue darken-2"
          onClick={() => PostData()}
        >
          Create New User
        </button>
        <div>
          <button className="btn waves-effect waves-light blue darken-2"
            onClick={() => PostData()}
          >
            add json
          </button>
        </div>

        {/* <h5>
          <Link to="/signin">Already have an account?</Link>
        </h5> */}
      </div>
    </div>
  )
}

export default AdminSignup