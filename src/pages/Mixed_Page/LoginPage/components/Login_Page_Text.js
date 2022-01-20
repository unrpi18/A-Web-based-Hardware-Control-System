import React from "react";
import '../Login_Page_Style.css'
import {Link} from "react-router-dom";
import addUsersLogo from './icons8-addUser-50.png'

const LOGIN_PAGE_TEXT = () => {
    return <div className="Title_set_all">
        <h1 className="Title_Set">Login with Your</h1>
        <h2 className="TECO_LAB_TEXT" id="KIT_Green">TECO-LAB
            <span> Account </span></h2>


        <Link className='linkStyle_login_page' to='/register'><p className='registerPosition_login_page'>
            Register Now <img src={addUsersLogo} className='addUserIcon_login_page' alt='test'/>
        </p>
        </Link>
    </div>
}

export default LOGIN_PAGE_TEXT