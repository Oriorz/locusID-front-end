import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/allpost', {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])
    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                console.log(newData)
                setData(newData)
            }).catch(err => console.log(err))
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => console.log(err))
    }
    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => console.log(err))
    }

    const deletePost= (postid)=>{
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        }).catch(err=>console.log(err))
    }

    const getVCard = () => {
      var data = "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
      window.open("data:text/x-vcard;urlencoded," + data);
    }
    return (
        <div className='home'>
            <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey"
          }}>
            <div>
              <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src="../images/gamiauto.png"
              />
            </div>
            <div>
              <h4>GamiAuto</h4>
              <h5>contact@gamiauto.art</h5>
              
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
                <p>+601111234567
                  <br />
                </p>
              </li>
              <li className="collection-item avatar">
                <img key="wechat-input" className="circle" src="../images/wechat.png" alt="Facebook" />
                <span className="title">Wechat</span>
                <p>+601111234567
                  <br />
                </p>
              </li>
              <li className="collection-item avatar">
                <img key="instagram-input" className="circle" src="../images/instagram.png" alt="Facebook" />
                <span className="title">Instagram</span>
                <p>@GamiAuto
                  <br />
                </p>
              </li>
              
              <li className="collection-item avatar">
                <img key="tng-input" className="circle" src="../images/tng.png" alt="Facebook" />
                <span className="title">Touch N Go</span>
                <p>9845-7423-524
                  <br />
                </p>
              </li>
              <li className="collection-item avatar">
                <img key="steam-input" className="circle" src="../images/steam.png" alt="Facebook" />
                <span className="title">Steam</span>
                <p>@oriorz
                  <br />
                </p>
              </li>
              <li className="collection-item avatar">
                <img key="steam-input" className="circle" src="../images/pokemon.png" alt="Facebook" />
                <span className="title">Pokemon</span>
                <p>5096-2990-8559
                  <br />
                </p>
              </li>
            </ul>
          </div>
        </div>
        </div>
    )
}

export default Home