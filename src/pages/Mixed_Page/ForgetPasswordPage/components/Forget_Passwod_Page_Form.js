import React, {useState} from "react";
import {useNavigate} from "react-router";
import sha256 from "crypto-js/sha256";
import "../Forget_Password_Page_Style.css"
import {baseUrl} from "../../../../contexts/RegisterContext";
import {isBlank} from "../../../User_Page/checkMethod/checkInputFieldsIsBlank";
import {handleVerificationCode} from "../../../User_Page/checkMethod/handleVerificationCode";

const FORGET_PASSWORD_PAGE_FORM = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    const navigate = useNavigate();


    const handleReset = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(email) && isBlank(password) && isBlank(passwordRepeat) && isBlank(verifyCode);

        if (nullCheck) {
            if (password !== passwordRepeat) {
                alert("The passwords don't match.");
                return
            }


            const userPassword = sha256(password.toString()).toString();

            const post = {email, userPassword, verifyCode};


            console.log(post);

            fetch(baseUrl + "/users/forget", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let message = responseJson.message;
                console.log(message);

                if (message === "SUCCESS") {
                    navigate('/login');
                } else {
                    alert("the verification code is incorrect.");
                }

            })


        } else {
            alert("Please fill the field(s) first!");
        }


    }


    return (
        <form className='form_forget_password_page'>

            <div className='email_forget_password_page'>
                <label id='label_big'>E-mail </label>
                <input id='input1' type="email"
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <button id='button_medium' className="verifyButton_forget_password_page"
                        onClick={() => handleVerificationCode(email)}>verify
                </button>
            </div>


            <div className='password_forget_password_page'>
                <label id='label_big'>Password</label>
                <input id='input1' type="password"
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="passwordRepeat_forget_password_page">
                <label id='label_big'>Password repeat</label>
                <input id='input1' type="password"
                       required
                       value={passwordRepeat}
                       onChange={(e) => setPasswordRepeat(e.target.value)}/>
            </div>

            <div className="verifyCode_forget_password_page">
                <label id='label_big'>Verification Code</label>
                <input id='input1' type="type"
                       required
                       value={verifyCode}
                       onChange={(e) => setVerifyCode(e.target.value)}/>
            </div>

            <button id='button_medium' className='resetButton_forget_password__page' type='button'
                    onClick={handleReset}>Reset
            </button>

        </form>

    )
}

export default FORGET_PASSWORD_PAGE_FORM