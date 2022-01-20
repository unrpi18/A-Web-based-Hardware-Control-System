import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import '../Login_Page_Style.css'
import sha256 from "crypto-js/sha256";
import {UserContext} from "../../../../contexts/RegisterContext";
import {baseUrl} from "../../../../contexts/RegisterContext"
import {Link} from "react-router-dom";


function isBlank(str) {
    return str.replace(/(^s*)|(s*$)/g, "").length !== 0;
}

const LOGIN_PAGE_FORM = () => {
    const [email, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const {loginUser, setLoginUser} = useContext(UserContext);
    const navigate = useNavigate();
    const adminLoginApi = '/users/adminLogin';
    const userLoginApi = '/users/visitorLogin';


    const handleLogin = (url, navigatePage) => {
        let nullCheck = isBlank(email) && isBlank(userPassword);
        if (!nullCheck) {
            alert("Please fill the field(s) first!");
        } else {
            let password = sha256(userPassword.toString()).toString();
            const post = {email, password};

            console.log(post);
            fetch(baseUrl + url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let resultCode = responseJson.resultCode;
                let errorMessage = responseJson.message;


                if (resultCode === 200) {
                    setLoginUser(prev => ({...prev, firstName: responseJson.firstName}))
                    setLoginUser(prev => ({...prev, token: responseJson.token}))

                    navigate(navigatePage);
                } else {
                    alert(errorMessage);

                }

            })
        }

    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(loginUser))
    });


    return (


        <form className="spacing_login_page">

            <div className="email_Login_Page">

                <label id='label_medium' form="email">E-mail </label>
                <input id='input1' type="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>


            </div>

            <div className="password_Login_Page">
                <label id='label_medium' form="password">Password</label>
                <input id='input1' type="password"
                       required
                       value={userPassword}
                       onChange={(e) => setUserPassword(e.target.value)}/>
                <Link className='linkStyle_login_page' to="/forget_password">
                    <p className='linkFontSize_login_page'>Forget your Password?</p>
                </Link>
            </div>


            {/*
                handle submit need to be overwritten to handleUserLogin and handleAdminLogin.
                Redirection of ForgetPassword need to be implemented.
                */}
            <button id='button_big' className='User_Login_Button' type='button'
                    onClick={() => handleLogin(userLoginApi, '/user_main_page')}>User Login
            </button>
            <button id='button_big' className='Admin_Login_Button' type='button'
                    onClick={() => handleLogin(adminLoginApi, '/admin_main_page')}>Admin Login
            </button>


        </form>


    )
}

export default LOGIN_PAGE_FORM