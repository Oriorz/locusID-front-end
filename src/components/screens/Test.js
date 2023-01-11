import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import { socials, single, socials_false, socials_true } from '../namelist'
import M from 'materialize-css'

const Test = () => {
  const [isInputHidden, setisInputHidden] = useState({ ...socials_false })
  const [isEditDisabled, setisEditDisabled] = useState({ ...socials_true })
  const [isConfirmHidden, setisConfirmHidden] = useState({ ...socials_true })
  const toggleInput = (text) => {
    Object.keys(isInputHidden).map((e) => {
      if (isInputHidden[e] === true) { setisInputHidden({ [e]: false }) }

    })

    setisInputHidden({ ...isInputHidden, [text]: true })
    setInputRow({ ...inputRow, title: text })
    Object.keys(isEditDisabled).map((e) => {
      isEditDisabled[e] = false
    })
  }

  const toggleConfirm = (text) => {
    //setisConfirmHidden({...isConfirmHidden,[text]:false})
    /* Object.keys(socials_disabled).map((e) => {
      //if(isEditDisabled[e]===false){ setisEditDisabled({ [e]: true }) }
      //setisEditDisabled({...isEditDisabled, [e]: false })
      //setisEditDisabled({ [e]: false })
      isConfirmHidden[e]=true
    }) */
    isConfirmHidden[text] = false
  }

  const handleConfirm = (text) => {
    console.log(inputRow.content)
    setisConfirmHidden({ ...isConfirmHidden, [text]: true })
    Object.keys(isInputHidden).map((e) => {
      isEditDisabled[e] = true

    })
    setisInputHidden({ ...isInputHidden, [text]: false })
  }

  const checkStatus = () => {
    console.log("status is ", isInputHidden)
  }

  const [inputRow, setInputRow] = useState({ title: "facebook", content: "" })
  const renderInput = () => {
    return (
      <>
        <div> input.title is {inputRow.title} || input.content is {inputRow.content} </div>
      </>
    )
  }

  const renderSocials = () => {
    return (
      <div className='social-list'>
        {socials.map((e) => {
          //console.log(e, isInputHidden[e])
          return (
            <>
              <div className='row' >
                <div className='col s6'>Title is {e}</div>
                <div className='col s2'>
                  {isInputHidden[e]
                    ?
                    <input
                      placeholder={e}
                      onClick={(event) =>
                        setInputRow({ ...inputRow, content: event.target.value })}
                      onChange={(event) =>
                        setInputRow({ ...inputRow, content: event.target.value })}
                    />
                    :
                    ""
                  }
                </div>
                {/* <p> {isInputHidden[e] ?  e : null}  </p> */}
                <div className='col s4'>
                  {
                    isEditDisabled[e]
                      ?
                      <>
                        <button class="btn-floating btn-medium waves-effect waves-light blue"
                          onClick={() => { toggleInput(e); toggleConfirm(e) }}
                          disabled={false}
                        >
                          <i class="material-icons">edit</i>
                        </button>
                      </>
                      : 
                      <button class="btn-floating btn-medium waves-effect waves-light blue"
                        onClick={() => toggleInput(e)}
                        disabled={true}
                      >
                        
                        <i class="material-icons">edit</i>
                      </button>
                  }
                  {
                    isConfirmHidden[e]
                      ?
                      ""
                      :
                      <>
                      <button className="btn-floating btn-medium waves-effect waves-light dark-green"
                        onClick={() => { handleConfirm(e) }}
                        disabled={false}
                      >
                        <i class="material-icons">check</i>
                      </button>
                      
                      <button className="btn-floating btn-medium waves-effect waves-light red"
                        onClick={() => { handleConfirm(e) }}
                        disabled={false}
                      >
                        <i class="material-icons">do_not_disturb</i>
                      </button>
                      </>
                  }
                  {/* <button
                    onClick={() => toggleInput(e)}
                    disabled={isEditDisabled[e]}
                  >
                    EDIT
                  </button> */}
                </div>
              </div>
            </>
          )
        })}
      </div>
    )
  }

  const [data, setData] = useState(single)
  const showData = (text) => {
    //console.log(text)
    //M.toast({ html: data, classes: "red darken-3" })

    const invent = data.find(({ id }) => id === text)
    console.log(invent.title)
  }
  const changeData = (text, newTitle) => {
    //console.log(text)
    //M.toast({ html: data, classes: "red darken-3" })

    const invent = data.find(({ id }) => id === text)
      in
      console.log(invent.title)
  }
  const showAllData = () => {
    console.log(data)
  }
  return (
    <div className='test'>
      TEST
      <button onClick={() => checkStatus()}>Check Status</button>
      {renderInput()}
      {renderSocials()}

    </div>
  )
}

export default Test