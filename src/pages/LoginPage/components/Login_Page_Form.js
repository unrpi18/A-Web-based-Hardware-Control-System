import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../Login_Page_Style.css'
import CryptoJs from 'crypto-js'





const LOGIN_PAGE_FORM = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        let userPassword= CryptoJs.SHA1(password).toString
        const post = { email, userPassword};

        console.log(post);
    }


    return (
        <div className="spacing">

            <form>
                <div className="email">

                    <label form="email">E-mail </label>
                    <input type="email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)} />


                </div>

                <div className="password">
                    <label form="password">Password</label>
                    <input type="password"
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} />
                </div>


                {/*
                handle submit need to be overwritten to handleUserLogin and handleAdminLogin.
                Redirection of ForgetPassword need to be implemented.
                */}
                <button className='User_Login_Button' type='button' onClick={handleSubmit} >User Login</button>
                <button className='Admin_Login_Button' type='button' onClick={handleSubmit} >Admin Login</button>
                <button className='Goto_Register_Page_Button' type='button' onClick={() => navigate('/register')}>Register Page </button>
                <button className='Forget_Password_Button' type='button' onClick={handleSubmit} >Forget Password </button>
            </form>

        </div>

    )
}

export default LOGIN_PAGE_FORM