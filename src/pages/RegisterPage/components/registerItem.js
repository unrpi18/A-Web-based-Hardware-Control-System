import axios from 'axios';
import React, { useState } from 'react';
import '../register.css'




const RegisterItem = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { email, password, passwordRepeat, name };

        console.log(post);

        fetch("http://localhost:8086/users/insertUserTest", {
            method:'POST',
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(post)
        }).then(() => {
            console.log('new blog added');
        })


       

    }




    return (
        <div className="spacing">

            <form onSubmit={handleSubmit}>
                <div className="email">

                    <label form="email">E-mail </label>
                    <input type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <button className="verify">verify</button>

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
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>


                <button className="register_Button">Register</button>
                <p>{email}</p>
                <p>{password}</p>
                <p>{passwordRepeat}</p>
                <p>{name}</p>

            </form>
        </div>

    )
}

export default RegisterItem