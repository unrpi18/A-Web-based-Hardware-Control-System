import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import '../Register_Page_Style.css'
import CryptoJs from 'crypto-js'


let flag = Boolean(false);


function isBlank(str) {
    flag = str.replace(/(^s*)|(s*$)/g, "").length !== 0;
}

const REGISTER_PAGE_FORM = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [realName, setName] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        isBlank(email);
        isBlank(password);
        isBlank(passwordRepeat);
        isBlank(realName);
        if (flag) {
            if (password !== passwordRepeat) {
                alert("The passwords don't match.");
                return
            }


            let userPassword = CryptoJs.SHA1(password).toString
            const post = {email, userPassword, passwordRepeat, realName};


            console.log(post);

            fetch("http://localhost:8086/users/insertUserTest", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(() => {
                navigate('/login');
                console.log('new information added');
            })

        } else {
            alert("Please fill the fields first!");
        }


    }


    return (
        <div className="spacing">

            <form>

                <div className='emailTest'>
                    <label id='label1' form="email">E-mail </label>
                    <input type="email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <button id='button1' className="verify">verify</button>
                </div>


                <div className='passwordTest'>
                    <label id='label1' form="password">Password</label>
                    <input type="password"
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="passwordRepeat">
                    <label id='label1'>Password repeat</label>
                    <input type="password"
                           required
                           value={passwordRepeat}
                           onChange={(e) => setPasswordRepeat(e.target.value)}/>
                </div>

                <div className="nameTest">
                    <label id='label1'>Name</label>
                    <input type="type"
                           required
                           value={realName}
                           onChange={(e) => setName(e.target.value)}/>
                </div>


                <button id='button' className='register_Button' type='button' onClick={handleSubmit}>Register</button>
            </form>


        </div>

    )
}

export default REGISTER_PAGE_FORM