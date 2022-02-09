import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Link} from "@mui/material";
import Stack from "@mui/material/Stack";
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {isBlank, validateEmail, validatePassword} from "../../../User_Page/ReusedMethod/checkInputFields";
import sha256 from "crypto-js/sha256";
import {baseUrl} from "../../../../contexts/RegisterContext";
import {handleVerificationCode} from "../../../User_Page/ReusedMethod/handleVerificationCode";
import '../Register_Page_Style.css'
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Label} from "@mui/icons-material";
import {useFetchData} from "../../../User_Page/ReusedMethod/fetchData";


const REGISTER_PAGE_INPUT_FIELD = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [data, setData] = useState("");
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(email) && isBlank(password) && isBlank(passwordRepeat) && isBlank(firstName) && isBlank(lastName) && isBlank(verifyCode);

        if (nullCheck) {
            if (password !== passwordRepeat) {
                alert("The passwords don't match.");
                return
            } else {
                if (!checked) {
                    alert("please checked the iterm first");
                    return
                }
            }
            let emailCheck = validateEmail(email)
            if (!emailCheck) {
                alert("Please enter the correct email-format: xxx@yyy.zzz.");
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be 8 digits long. It must include a maximum of two numbers.")
                return;
            }

            const userPassword = sha256(password.toString()).toString();

            const post = {email, userPassword, firstName, lastName, verifyCode};


            console.log(post);

            fetch(baseUrl + "/users/register", {
                method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(post)
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


    const api = "/files/view"
    const useFetchData = () => {

        useEffect(() => {
            fetch(baseUrl + api, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson)
                let message = responseJson.message;
                if (responseJson.resultCode === 200) {
                    setData(responseJson.data)
                    console.log(responseJson.data)

                }

            }).catch(error => console.error(error))
        }, []);
    }

    useFetchData()

    console.log(data)
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
            <Box sx={{display: 'flex'}}>
                <FormControlLabel
                    value={checked}
                    control={<Checkbox/>}
                    label={<div>By ticking this check box, I agree to all <Link href={data} target="_blank">Terms &
                        Conditions</Link> of
                        TECO Lab Management System.</div>}
                    onChange={(e) => setChecked(!checked)}
                    className='terms_position'
                />

            </Box>

        </Box>


    )
}

export default REGISTER_PAGE_INPUT_FIELD