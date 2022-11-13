import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null)
  const { state, dispatch } = useContext(UserContext)
  const { userid } = useParams()
  const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true)
  useEffect(() => {
    fetch(`/user/${userid}`, {
      method: "get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        //console.log(result)
        setProfile(result)
      })
  }, [])

  const getVCard = () => {
    var data = "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
    window.open("data:text/x-vcard;urlencoded," + data);
  }

  const followUser = () => {
    fetch('/follow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
        localStorage.setItem("user", JSON.stringify(data))
        setProfile((prevState) => {
          return {
            ...prevState,
            //user:data
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id]
            }
          }
        })
        setShowFollow(false)
      })
  }

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
        localStorage.setItem("user", JSON.stringify(data))
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(item => item != data._id)
          return {
            ...prevState,
            //user:data
            user: {
              ...prevState.user,
              followers: newFollower
            }
          }
        })
        setShowFollow(true)
      })
  }

  return (
    <>
      {userProfile ?
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey"
          }}>
            <div>
              <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src={userProfile.user.pic}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              {/* <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              {showFollow ?
                <button
                  style={{margin:"10px"}}
                  className="btn waves-effect waves-light blue darken-2"
                  onClick={() => followUser()}
                >
                  FOLLOW
                </button>
                :
                <button
                  style={{margin:"10px"}}
                  className="btn waves-effect waves-light red darken-2"
                  onClick={() => unfollowUser()}
                >
                  UNFOLLOW
                </button>
              } */}


            </div>
            
          </div>
          <div key="getVCard">
              <button
                className="btn waves-effect waves-light green darken-3"
                onClick={() => getVCard()}
              >
                Get Contact
              </button>
            </div>
          <div>

          </div>
          <div className='social'>
            <ul className="collection">
              <li className="collection-item avatar">
                <img key="facebook-input" className="circle" src="../images/facebook.png" alt="Facebook" />
                <span className="title">Facebook</span>
                <p>@GamiAuto
                  <br />
                  
                </p>

              </li>
              <li className="collection-item avatar">
                <img key="whatsapp-input" className="circle" src="../images/whatsapp.png" alt="Facebook" />
                <span className="title">Whastapp</span>
                <p>+01111234567
                  <br />
                  
                </p>
              </li>
            </ul>
          </div>
        </div>

        : <h2>loading...!</h2>}
    </>
  )
}

export default UserProfile