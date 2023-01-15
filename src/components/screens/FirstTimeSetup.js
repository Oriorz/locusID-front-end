import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import M from 'materialize-css'
const FirstTimeSetup = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)
  useEffect(() => {
    if (url) {
      UploadFields()
    }
  }, [url])

  const PostData = () => {
    if (image) {
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
    /* if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      return M.toast({ html: "invalid email", classes: "red darken-3" })
    } */
    fetch("/api/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        //email,
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

  const showData = () => {
    //M.toast({html:"1"})
    console.log("pw is ", token)
  }

  const reflectReq = () => {
    fetch(`/api/new-account`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        token,
        name,
        password
      })
    }).then(res => res.json())
      .then(result => console.log(result))
  }

  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2>set Account Password</h2>
        <input
          type="text"
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input
          type="password"
          placeholder='password'
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        /> */}

        {/* <button className="btn waves-effect waves-light blue darken-2"
          onClick={() => PostData()}
        >
          SET
        </button> */}
        <div>

        </div>
        {/* <button className="btn waves-effect waves-light blue darken-2"
          onClick={() => showData()}
        >
          showdata
        </button> */}
        <div>

        </div>
        <button className="btn waves-effect waves-light blue darken-2"
          onClick={() => reflectReq()}
        >
          Set Password
        </button>
      </div>
    </div>
  )
}

export default FirstTimeSetup