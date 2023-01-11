import React, { useState, useContext, useReducer } from 'react'
import { UserContext } from '../../App'
import { Link, useNavigate, useParams } from 'react-router-dom'
import M from 'materialize-css'

const NewPassword = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = () => {
        //fetch("/api/signin", {
        fetch("/api/new-password", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
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
                    type="password"
                    placeholder='enter a new password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light blue darken-2"
                    onClick={() => PostData()}
                >
                    Change Password
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default NewPassword