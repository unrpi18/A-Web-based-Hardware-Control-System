import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../register.css'
import CryptoJs from 'crypto-js'
import {useAlert} from 'react-alert';




const RegisterItem = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [realName, setName] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordRepeat) {
            alert("The passwords don't match.");
            return
        }

        let userPassword= CryptoJs.SHA1(password).toString
        const post = { email, userPassword, passwordRepeat, realName};

        console.log(post);

        fetch("http://localhost:8086/users/insertUserTest", {
            method:'POST',
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(post)
        }).then(() => {
            navigate('/login');
            console.log('new blog added');
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
                        onChange={(e) => setEmail(e.target.value)} />
                   

                </div>

                <div className="password">
                    <label form="password">Password</label>
                    <input type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="password_repeat">
                    <label>Password repeat</label>
                    <input type="password"
                        required
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)} />
                </div>

                <div className="name">
                    <label>Name</label>
                    <input type="type"
                        required
                        value={realName}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                
            <button className='register_Button' type='button' onClick={handleSubmit} >Register</button>
            </form>

            <button className="verify">verify</button>
        </div>

    )
}

export default RegisterItem