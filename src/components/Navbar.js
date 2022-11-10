import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  const getVCard = () => {

    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], { type: 'text/plain' });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        // returns a URL you can use as a href
        return textFile;
      };
    const VCard = require('vcard-creator').default

    // Define a new vCard
    const myVCard = new VCard()

    // Some variables
    const lastname = 'Desloovere'
    const firstname = 'Jeroen'
    const additional = ''
    const prefix = ''
    const suffix = ''

    myVCard
      // Add personal data
      .addName(lastname, firstname, additional, prefix, suffix)
      // Add work data
      .addCompany('Siesqo')
      .addJobtitle('Web Developer')
      .addRole('Data Protection Officer')
      .addEmail('info@jeroendesloovere.be')
      .addPhoneNumber(1234121212, 'PREF;WORK')
      .addPhoneNumber(123456789, 'WORK')
      .addAddress(null, null, 'street', 'worktown', null, 'workpostcode', 'Belgium')
      .addURL('http://www.jeroendesloovere.be')

    console.log(myVCard.toString())

    /* var link = document.createElement('a');
    link.setAttribute('download', 'Desloovere.vcf' );
    link.href = makeTextFile(
      myVCard.getFormattedString()
    );
    document.body.appendChild(link);
    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    }); */

    /* const url = window.URL.createObjectURL(new Blob([myVCard]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('href', 'blob.vcf');
    document.body.appendChild(link);
    link.click(); */

    var data = "BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ADoe%3BJohn%0AFN%3AJohn%20Doe%0ATITLE%3A08002221111%0AORG%3AStackflowover%0AEMAIL%3BTYPE%3DINTERNET%3Ajohndoe%40gmail.com%0AEND%3AVCARD";
    window.open("data:text/x-vcard;urlencoded," + data);


    myVCard.saveToFile('./Desloovere.vcf')
  }

  const renderList = () => {
    if (state) {
      return [
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        <li key="create"><Link to="/create">CreatePost</Link></li>,
        <li key="myfollowingpost"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <li key="logout">
          <button
            className="btn waves-effect waves-light red darken-3"
            onClick={() => (
              localStorage.clear(),
              dispatch({ type: "CLEAR" }),
              navigate('/signin')
            )}
          >
            Logout
          </button>
        </li>
      ]
    } else {
      return [
        <li key="logout">
          <button
            className="btn waves-effect waves-light green darken-3"
            onClick={() => getVCard()}
          >
            TryAPI
          </button>
        </li>,

        <li key="signin"><Link to="/Signin">Signin</Link></li>,
        <li key="signup"><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper white" >
        <Link to={state ? "/" : "signin"} className="brand-logo left"
        //style={{ margin: "5px" }}
        >LocusID</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar