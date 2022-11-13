import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { socials, single } from '../namelist'

const Profile = () => {
  const [mypics, setMypics] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [image, setImage] = useState("")
  console.log(state)
  useEffect(() => {
    fetch('/myposts', {
      method: "get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setMypics(result.posts)
      })
  }, [])

  useEffect(() => {
    if (image) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "insta-clone")
      data.append("cloud_name", "cnq")
      fetch("https://api.cloudinary.com/v1_1/xiaomiao/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          fetch('/updatepic', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url
            })
          }).then(res => res.json())
            .then(result => {
              console.log(result)
              localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
              dispatch({ type: "UPDATEPIC", payload: result.pic })
              //window.location.reload()
            })
        })
        .catch(err => { console.log(err) })
    }
  }, [image])

  const updatePhoto = (file) => {
    setImage(file)
  }
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{
        margin: "18px 0px",
        borderBottom: "1px solid grey"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-around",
        }}>
          <div>
            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "loading"}
            />

          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>
            {/* <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
              <h6>{mypics.length} posts</h6>
              <h6>{state ? state.followers.length : "0"} followers</h6>
              <h6>{state ? state.following.length : "0"} following</h6>
            </div> */}
          </div>
        </div>
        <div className="file-field input-field">
          <div className="btn blue darken-1">
            <span>Upload pic</span>
            <input
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper ">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className='social'>
        <ul class="collection">
          <li class="collection-item avatar">
            <img key="facebook-input" class="circle" src="./images/whatsapp.jpg" alt="Facebook" />
            <span class="title">Facebook</span>
            <p>First Line 
              <br/>
              Second Line
            </p>

          </li>
          <li class="collection-item avatar">
            <img key="whatsapp-input" class="circle" src="./images/whatsapp.jpg" alt="Facebook" />
            <span class="title">Whastapp</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Profile