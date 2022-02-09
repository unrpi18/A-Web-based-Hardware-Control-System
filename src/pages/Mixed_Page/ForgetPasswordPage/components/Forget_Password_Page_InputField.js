import {useState} from "react";
import {useNavigate} from "react-router";
import {isBlank} from "../../../User_Page/ReusedMethod/checkInputFields";
import sha256 from "crypto-js/sha256";
import {baseUrl} from "../../../../contexts/RegisterContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

import * as React from "react";

import {createTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@mui/styles";
import '../Forget_Password_Page_Style.css'
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import {handleVerificationCode} from "../../../User_Page/ReusedMethod/handleVerificationCode";


const FORGET_PASSWORD_PAGE_INPUT_FIELD = () => {
    const initialData = {email: '', password: '', passwordRepeat: '', verifyCode: ''};
    const [data, setData] = useState(initialData);


    const navigate = useNavigate();


    const handleReset = (e) => {
        e.preventDefault();
        let nullCheck = isBlank(data.email) && isBlank(data.password) && isBlank(data.passwordRepeat) && isBlank(data.verifyCode);

        if (nullCheck) {
            if (data.password !== data.passwordRepeat) {
                alert("The passwords don't match.");
                return
            }


            const userPassword = sha256(data.password.toString()).toString();

            const post = {email: data.email, userPassword, verifyCode: data.verifyCode};


            console.log(post);

            fetch(baseUrl + "/users/resetPassword", {
                method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let message = responseJson.message;
                let resultCode = responseJson.resultCode
                console.log(message);

                if (resultCode === 200) {
                    navigate('/login');
                } else {
                    alert(message);
                }

            })


        } else {
            alert("Please fill the field(s) first!");
        }

    }
    const theme = createTheme();
    return (<Box
            component="form"
            sx={{

                '& .MuiTextField-root': {m: 1, width: '50ch'},

            }}
            noValidate
            autoComplete="off"

            className='spacing_forget_password_page'
        >
            <div>
                <Stack direction="row" spacing={1}>
                    <TextField
                        required
                        value={data.email}
                        id="outlined-helperText"
                        label="E-mail"
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}

                        onChange={(e) => setData(prev => ({...prev, email: e.target.value}))}
                    />
                    < Button className='verifyButton_forget_password_page' variant="contained" endIcon={<SendIcon/>}
                             onClick={() => handleVerificationCode(data.email, 'forget password')}>
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
                    value={data.password}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setData(prev => ({...prev, password: e.target.value}))}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Password Repeat"
                    type="password"
                    value={data.passwordRepeat}
                    inputProps={{

                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setData(prev => ({...prev, passwordRepeat: e.target.value}))}
                />
            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Verification Code"
                    value={data.verifyCode}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setData(prev => ({...prev, verifyCode: e.target.value}))}
                />
            </div>

            <ThemeProvider theme={theme}>
                <Button className='resetButton_forget_password__page' sx={{
                    backgroundColor: '#009682',
                    color: 'black'
                }}
                        onClick={handleReset}>
                    Reset
                </Button>
            </ThemeProvider>
        </Box>
    )
}

export default FORGET_PASSWORD_PAGE_INPUT_FIELD