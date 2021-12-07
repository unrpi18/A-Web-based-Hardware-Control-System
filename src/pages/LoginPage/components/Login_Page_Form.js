import React, {useState} from 'react';
import {useNavigate} from 'react-router';

import CryptoJs from 'crypto-js'


const LOGIN_PAGE_FORM = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        let userPassword = CryptoJs.SHA1(password).toString
        const post = {email, userPassword};

        console.log(post);
        fetch("http://localhost:8086/users/insertUserTest", {
            method:'POST',
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(post)
        }).then(() => {
            navigate('/user');
        })
    }

    return (
        <div className="spacing">

            <form>
                <div className="email">

                    <label form="email">E-mail </label>
                    <input type="email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>


                </div>

                <div className="password">
                    <label form="password">Password</label>
                    <input type="password"
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>


                {/*
                handle submit need to be overwritten to handleUserLogin and handleAdminLogin.
                Redirection of ForgetPassword need to be implemented.
                */}
                <button id='button1' className='User_Login_Button' type='button' onClick={handleSubmit}>User Login</button>
                <button id='button1' className='Admin_Login_Button' type='button' onClick={handleSubmit}>Admin Login</button>
            </form>

        </div>

    )
}

export default LOGIN_PAGE_FORM