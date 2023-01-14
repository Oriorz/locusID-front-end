import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)


  const renderList = () => {
    if (state) {
      return [
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        //<li key="create"><Link to="/create">CreatePost</Link></li>,
        //<li key="myfollowingpost"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <li key="logout">
          <button
            className="btn waves-effect waves-light red darken-3"
            onClick={() => (
              localStorage.clear(),
              dispatch({ type: "CLEAR" })
              /* navigate('/signin') */
            )}
          >
            Logout
          </button>
        </li>
      ]
    } else {
      return [

        <li key="signin"><Link to="/Signin">Signin</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper white" >
        <Link to={state ? "/" : "/"} className="brand-logo left"
        //style={{ margin: "5px" }}
        >iTap</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar