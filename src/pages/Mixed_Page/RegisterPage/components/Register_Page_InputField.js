import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";
import {useNavigate} from "react-router";
import {isBlank} from "../../../User_Page/checkMethod/checkInputFieldsIsBlank";
import sha256 from "crypto-js/sha256";
import {baseUrl} from "../../../../contexts/RegisterContext";
import {handleVerificationCode} from "../../../User_Page/checkMethod/handleVerificationCode";
import '../Register_Page_Style.css'


const REGISTER_PAGE_INPUT_FIELD = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(email) && isBlank(password) && isBlank(passwordRepeat)
            && isBlank(firstName) && isBlank(lastName) && isBlank(verifyCode);

        if (nullCheck) {
            if (password !== passwordRepeat) {
                alert("The passwords don't match.");
                return
            }


            const userPassword = sha256(password.toString()).toString();

            const post = {email, userPassword, firstName, lastName, verifyCode};


            console.log(post);

            fetch(baseUrl + "/users/register", {
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
                    alert(message);
                }

            })


        } else {
            alert("Please fill the field(s) first!");
        }

    }

    return (

        <Box
            component="form"
            sx={{

                '& .MuiTextField-root': {m: 1, width: '50ch'},

            }}
            noValidate
            autoComplete="off"
            className='spacing_register_page'

        >
            <div>
                <Stack direction="row" spacing={1}>
                    <TextField
                        required
                        value={email}
                        id="outlined-helperText"
                        label="E-mail"
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}

                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button className='verifyButton_register_page' variant="contained" endIcon={<SendIcon/>}
                            onClick={() => handleVerificationCode(email, "register")}>
                        Verify
                    </Button>
                </Stack>
            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Password"
                    type="password"
                    value={password}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Password Repeat"
                    type="password"
                    value={passwordRepeat}
                    inputProps={{

                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Firstname"
                    value={firstName}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Lastname"
                    value={lastName}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Verification Code"
                    value={verifyCode}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setVerifyCode(e.target.value)}
                />
            </div>

            <Button className='registerButton_register_page' variant='contained' color='success'
                    onClick={handleRegister}>
                Register
            </Button>
        </Box>

    )
}

export default REGISTER_PAGE_INPUT_FIELD