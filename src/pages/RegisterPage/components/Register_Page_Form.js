import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import CryptoJs from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import '../Register_Page_Style.css'


function isBlank(str) {
    return str.replace(/(^s*)|(s*$)/g, "").length !== 0;
}

const REGISTER_PAGE_FORM = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(email) && isBlank(password) && isBlank(passwordRepeat)
            && isBlank(firstName) && isBlank(lastName) && isBlank(verifyCode);

        if (nullCheck) {
            if (password !== passwordRepeat) {
                alert("The passwords don't match.");
                return
            }


            const userPassword = sha256(password.toString()).toString();

            const post = {email, userPassword, passwordRepeat, firstName, lastName};


            console.log(post);

            fetch("http://localhost:8086/users/insertUserTest", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(() => {
                navigate('/login');
            })

        } else {
            alert("Please fill the field(s) first!");
        }


    }

    const handleVerificationCode = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(email)
        if (nullCheck) {
            let message = "send";
            const post2 = {email};
            fetch("https://a9d7-2a00-1398-300-307-00-11a6.ngrok.io/users/sendVerificationCode", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post2)
            }).then(() => {
                console.log("success");
            })
        } else {
            alert("enter the email first!");
        }

    }


    return (


        <form className="form_register_page">

            <div className='email_register_page'>
                <label id='label_big'>E-mail </label>
                <input id='input1' type="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <button id='button_medium' className="verifyButton_register_page"
                        onClick={handleVerificationCode}>verify
                </button>
            </div>


            <div className='password_register_page'>
                <label id='label_big'>Password</label>
                <input id='input1' type="password"
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="passwordRepeat_register_page">
                <label id='label_big'>Password repeat</label>
                <input id='input1' type="password"
                       required
                       value={passwordRepeat}
                       onChange={(e) => setPasswordRepeat(e.target.value)}/>
            </div>

            <div className="firstname_register_page">
                <label id='label_big'>firstname</label>
                <input id='input1' type="type"
                       required
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className="lastname_register_page">
                <label id='label_big'>lastname</label>
                <input id='input1' type="type"
                       required
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div className="verifyCode_register_page">
                <label id='label_big'>verification Code</label>
                <input id='input1' type="type"
                       required
                       value={verifyCode}
                       onChange={(e) => setVerifyCode(e.target.value)}/>
            </div>

            <button id='button_big' className='registerButton_register_page' type='button'
                    onClick={handleSubmit}>Register
            </button>
        </form>


    )
}

export default REGISTER_PAGE_FORM