import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { socials, single, socials_false, socials_true } from '../namelist'
import M from 'materialize-css'



const TestImage = () => {
  const { state, dispatch } = useContext(UserContext) // user state context
  const [image, setImage] = useState("") //image of profile
  const navigate = useNavigate() // navigation of page

  const [display, setDisplay] = useState("") // TESTING for console log purpose
  const [inputRow, setInputRow] = useState({ title: null, content: null }) //TESTING for update value
  const [isInputHidden, setisInputHidden] = useState({ ...socials_true }) // useState for input line hidden attribute, it should be true when hidden, input should be hidden initially, so initial state is true
  const [isEditDisabled, setisEditDisabled] = useState({ ...socials_false }) //useState for EditDisabled it should not be disabled initially, so initial state is false
  const [isConfirmHidden, setisConfirmHidden] = useState({ ...socials_true }) // useState for input line hidden attribute, it should be true when hidden, input should be hidden initially, so initial state is true
  const [isCancelHidden, setisCancelHidden] = useState({ ...socials_true }) //useState for EditDisabled it should not be disabled initially, so initial state is false

  const [isDisabled, setIsDisabled] = useState(true) //Testing 

  console.log("console log at Profile.js line 14, for state is,", state)
  //image handling process for updating profile image and loading profile image
  useEffect(() => {
    if (image) {
      console.log("state is ", state)
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "insta-clone")
      data.append("cloud_name", "cnq")
      console.log(data)
      fetch("https://api.cloudinary.com/v1_1/xiaomiao/image/upload", {
        method: "post",
        body: data
      })
        /* console.log(image)
        fetch('/user/cloudinary', {
          method:"put",
          body:image
        }) */
        .then(res => res.json())
        .then(data => {
          fetch('/updatepic', {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url,
              oldpic: getFileName(state.pic)
            })
          }).then(res => res.json())
            .then(result => {
              console.log("useeffect return for /updatepic", result)
              localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
              dispatch({ type: "UPDATEPIC", payload: result.pic })
              window.location.reload().then(

                console.log("state is ", state)
              )

            })
        })
        .catch(err => { console.log("useEffect to fetch profile image error is ", err) })
    }
  }, [image])
  const updatePhoto = (file) => {
    setImage(file)
  }
  //getPicPath() a testing API response to show the path of URL returned from API /getpic backend
  const getPicPath = () => {
    fetch('/getpic', {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        console.log("getPicPath() result from /getpic is ", result)
      })
  }

  const getFileName = (text) => {
    const theString = text
    const theStringLength = theString.split("/").length;
    const theSuffix = theString.split("/")[theStringLength-1].split('.')[0]
    return theSuffix
  }

  /* useEffect(()=>{
    console.log(CLOUDINARY_API)
  }) */

  const goToSignin = () => {
    navigate('/signin')
  }

  //some tester function to test if i can get the cloudinary API key from backend
  const GetAPI = () => {
    /* const text = "krafbinf5auqyqgf2p8l"
    fetch('/user/cloudinary', {
      method: "put", headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        oldpic: state.pic
      })
    }).then(res => res.json())
      .then(data => console.log("GetAPI is ", data)) */
    console.log("state is ", state.pic)
    //no-image-avatar-vector-icon-600w-2054244497_xdhqa3
  }

  //renderSocials is the component of RenderList where it renders the input line, edit button, confirm button and cancel button
  const renderSocials = () => {
    return (
      <>
        <div clasName='social-list'>

          renderSocials
        </div>
      </>
    )
  }

  //handleEdit is to handle the sequence of the buttons on/off upon user click on "Edit"
  const handleEdit = (text) => {
    //backend:
    //do nothing
    //frontend:
    //"current input", "current confirm" and "current cancel" should appear after pressed,
    //all "edit" button should disabled after pressed, 
    //it will be re-enabled later after "confirm" or "cancel"
    toggleInput(text)
    toggleConfirm(text)
    toggleCancel(text)
    hideEdit(text)
  }
  //handleConfirm is to handle the sequence of the buttons on/off upon user click on "confirm"
  const handleConfirm = (text, theLink, update_input) => {
    //backend:
    setInputRow({ ...inputRow, content: null })
    if (!update_input) {
      M.toast({ html: "nothing is inputted", classes: "red darken-2" })
      return
    }
    //TODO: clear the input field or inputrow.content, get the value in iput field, send the value in input field to backend /updatedetails API
    //(cont'), then chain on the success response to set the following on front end, else display err
    //frontend:
    console.log("handle Confirm", inputRow.content)
    const theValue = update_input.split(theLink)
    fetch(`/updatedetails/${text}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        value: theValue[theValue.length - 1]
      })
    })
      .then(res => res.json())
      ///.then((res) => { 
      .then((data) => {
        console.log("responsefrom /updatedetails is : ", data[text])
        localStorage.setItem("user", JSON.stringify({ ...state, [text]: data[text] }))
        dispatch({ type: "UPDATESOCIALS", payload: { theKey: text, theValue: data[text] } })
        console.log(state)
        toggleInput(text)
        toggleConfirm(text)
        toggleCancel(text)
        showEdit(text)
      })
  }
  //handleCancel is to handle the sequence of the buttons on/off upon user click on "cancel"
  const handleCancel = (text) => {

    toggleInput(text)
    toggleConfirm(text)
    toggleCancel(text)
    showEdit(text)
  }

  //toggleINput is to turn specific "input" field on and off by the "arg" passing 
  const toggleInput = (text) => {
    if (isInputHidden[text] === true) {
      setisInputHidden({ ...isInputHidden, [text]: false })
    }
    if (isInputHidden[text] === false) {
      setisInputHidden({ ...isInputHidden, [text]: true })
    }

  }
  //toggleConfirm is to turn specific "confirm" field on and off by the "arg" passing 
  const toggleConfirm = (text) => {
    if (isConfirmHidden[text] === true) {
      setisConfirmHidden({ ...isConfirmHidden, [text]: false })
    }
    if (isConfirmHidden[text] === false) {
      setisConfirmHidden({ ...isConfirmHidden, [text]: true })
    }
  }
  //toggleCancel is to turn specific "cancel" field on and off by the "arg" passing 
  const toggleCancel = (text) => {
    if (isCancelHidden[text] === true) {
      setisCancelHidden({ ...isCancelHidden, [text]: false })
    }
    if (isCancelHidden[text] === false) {
      setisCancelHidden({ ...isCancelHidden, [text]: true })
    }
  }
  //toggleEdit is to turn specific "edit" field on and off by the "arg" passing 
  const hideEdit = (text) => {
    Object.keys(isEditDisabled).map((e) => {
      isEditDisabled[e] = true
    })
    //setisEditDisabled({...isEditDisabled, [text]:true})
  }

  const showEdit = (text) => {
    Object.keys(isEditDisabled).map((e) => {
      isEditDisabled[e] = false
    })
    //setisEditDisabled({...isEditDisabled, [text]:true})
  }

  const renderList = () => {
    return (
      state
        ?
        <div>
          <button onClick={() => GetAPI()}> Test get back end</button>
          <ul className="collection">
            {single.map((item, index) => {
              return (
                <>
                  <li className="collection-item avatar" key={item.id}>
                    <img className="circle responsive-img" src={item.src} alt="Facebook" />
                    <div className='row' >
                      <div className='col s10'>
                        <span className="title">{index + 1} {item.title}</span>
                        {
                          state[item.id] ?
                            <p>Now : <a target="_blank" href={item.link + state[item.id]}>{item.link}{state[item.id]}</a></p>
                            :
                            <p>Now : <strong style={{ color: "red" }}> NOT SET </strong></p>
                        }
                        <div>
                          {/* this part is the input line*/}
                          {isInputHidden[item.id]
                            ?
                            ""
                            :
                            <>
                              {/* {state[item.id] ?<p>{item.link}________</p>:""} */}
                              <input placeholder='update'
                                onClick={(e) => {
                                  setInputRow({ ...inputRow, content: e.target.value })
                                }}
                                onChange={(e) => {
                                  setInputRow({ ...inputRow, content: e.target.value })
                                }}
                              />
                              <div style={{ fontSize: 10 }}>You can just copy paste in the whole link or just the id if you know it  </div>
                              <div style={{ fontSize: 10 }}>example : {item.link}<strong> 'YOUR ID' </strong></div>
                            </>
                          }
                        </div>
                      </div>

                      {/* this part is the "Edit" button*/}
                      {
                        isEditDisabled[item.id]
                          ?
                          ""
                          :
                          <div className='col s1'>
                            <button
                              className="btn-floating btn-small waves-effect waves-light blue"
                              onClick={() => {
                                handleEdit(item.id)
                              }}
                              disabled={false}
                            >
                              <i className="material-icons">edit</i>
                            </button>
                          </div>
                      }
                      {/* this part is the Confirm button*/}
                      {
                        isConfirmHidden[item.id]
                          ?
                          ""
                          :
                          <div className='col s1'>
                            <button
                              className="btn-floating btn-small waves-effect waves-light dark-green"
                              onClick={() => {
                                showHandle(item.id)
                                handleConfirm(item.id, item.link, inputRow.content)
                              }}
                              disabled={false}
                            >
                              <i className="material-icons">check</i>
                            </button>
                          </div>
                      }
                      {/* this part is the Cancel button*/}
                      {
                        isCancelHidden[item.id]
                          ?
                          ""
                          :
                          <div className='col s1'>
                            <button
                              className="btn-floating btn-small waves-effect waves-light red"
                              onClick={() => {
                                showHandle(item.id)
                                handleCancel(item.id)
                              }}
                              disabled={false}
                            >
                              <i className="material-icons">do_not_disturb</i>
                            </button>
                          </div>
                      }
                    </div>
                  </li>

                </>
              )
            })}

          </ul>
        </div>
        :
        <div> Loading </div>
    )
  }

  const handleClick = () => {
    console.log("handleClick() clicked")
  }

  const showHandle = (theTitle, theContent) => {
    if (!theContent) {
      setInputRow({ ...inputRow, title: theTitle })
    } else {

      setInputRow({ title: theTitle, content: theContent })
    }
    console.log("inputRow title is ", inputRow.title, "inputRow content is ", inputRow.content)
  }

  const updateDetails = (text, value) => {
    M.toast({ html: text, classes: "yellow darken-3" })
    fetch(`/updatedetails/${text}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        value
      })
    }).then(res => res.json())
      .then(result => console.log(result))
    console.log(`updateDetails() return from /updatedetails/${text}`)
    console.log("updateDetails() return type of value is ", typeof (value))
    console.log("updateDetails() return value is ", value)
  }

  return (
    state ?
      <div>
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
          {/* <p key="getPicPath">
            <button
              className="btn waves-effect waves-light red darken-3"
              onClick={() => (
                getPicPath()
              )}
            >
              get API
            </button>
          </p> */}
          {/* <div className="selfcheck">Clicked Element is {display}</div>
          <div className="selfcheck">InputRow.title : "{inputRow.title}" inputRow.content : "{inputRow.content}"</div> */}
          <div className='social'>
            {/* <ul className="collection">
              <li className="collection-item avatar" key="selftest-facebook">
                <img key="facebook-input" className="circle" src="./images/whatsapp.jpg" alt="Facebook" />
                <div className='row'>
                  <div className='col s8'>
                    <span className="title">Facebook</span>
                    <p>First Line
                      <br />
                      Second Line
                    </p>
                  </div>
                  <div className='col s4'>
                    <button
                      className="btn waves-effect waves-light blue darken-2"
                      onClick={() => updateDetails("100", "xxx")}
                    >
                      Update Details 100 xxx
                    </button>
                  </div>
                </div>
              </li>
              <li className="collection-item avatar" key="selftest-whatsapp">
                <img key="whatsapp-input" className="circle" src="./images/whatsapp.jpg" alt="Facebook" />
                <span className="title">Whastapp</span>
              </li>
            </ul> */}
            {renderList()}
          </div>
        </div>
      </div>
      : goToSignin()
  )
}

export default TestImage