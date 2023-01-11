import React, { useState, useContext, useReducer } from 'react'
import { UserContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Reset = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({ html: "invalid email", classes: "red darken-3" })
        }
        //fetch("/api/reset-password", {
        fetch("/api/reset-password", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email
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
            .catch(err => { console.log(err) })
    }
    return (
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>iTap</h2>
                <input
                    type="text"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light blue darken-2"
                    onClick={() => PostData()}
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset