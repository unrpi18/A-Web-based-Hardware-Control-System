import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router';
import '../Login_Page_Style.css'
import sha256 from "crypto-js/sha256";
import {UserContext} from "../../../../contexts/RegisterContext";

function isBlank(str) {
    return str.replace(/(^s*)|(s*$)/g, "").length !== 0;
}
const LOGIN_PAGE_FORM = () => {

    const [email, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const {value,setValue} = useContext(UserContext);
    const navigate = useNavigate();

    const handleAdminLogin = (e) =>{
        e.preventDefault();
        let nullCheck = isBlank(email) && isBlank(userPassword);
        if (!nullCheck) {
            alert("null pointer");
            return
        } else {
            let password = sha256(userPassword.toString()).toString();
            const post = {email, password};

            console.log(post);
            fetch("http://b907-2a02-3038-401-43d3-4057-4b24-9a91-f82.ngrok.io/users/adminLogin", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let message = responseJson.resultCode;

                let error = responseJson.message;
                console.log(message);

                if (message === 200) {
                    console.log("go")
                    navigate('/admin_main_page');

                } else {
                    alert(error);
                    setLoginStatus(false);
                }

            })
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(email) && isBlank(userPassword);
        if (!nullCheck) {
            alert("null pointer");
        } else {
            let password = sha256(userPassword.toString()).toString();
            const post = {email, password};

            console.log(post);
            fetch("http://b907-2a02-3038-401-43d3-4057-4b24-9a91-f82.ngrok.io/users/visitorLogin", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let resultCode = responseJson.resultCode;
                let token = responseJson.token;
                let errorMessage = responseJson.message;
                console.log(errorMessage);
                console.log(token)
                console.log(responseJson.firstName);

                if (resultCode === 200) {
                    setValue(errorMessage);
                    navigate('/user_main_page');
                    setValue(token);
                } else {
                    alert(errorMessage);
                    setLoginStatus(false);
                }

            })
        }

    }

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
            </div>


            {/*
                handle submit need to be overwritten to handleUserLogin and handleAdminLogin.
                Redirection of ForgetPassword need to be implemented.
                */}
            <button id='button_big' className='User_Login_Button' type='button' onClick={handleSubmit}>User Login</button>
            <button id='button_big' className='Admin_Login_Button' type='button' onClick={handleAdminLogin}>Admin Login
            </button>
        </form>


    )
}

export default LOGIN_PAGE_FORM