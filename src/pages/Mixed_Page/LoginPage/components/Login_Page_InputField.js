import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {ThemeProvider} from '@material-ui/styles';
import {createTheme} from '@material-ui/core/styles';
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import '../Login_Page_Style.css'
import {baseUrl, UserContext} from "../../../../contexts/RegisterContext";
import {useNavigate} from "react-router";
import sha256 from "crypto-js/sha256";
import {isBlank} from "../../../User_Page/ReusedMethod/checkInputFields";
import {Link} from "react-router-dom";
import {ButtonGroup} from '../../../../components/ButtonGroup'

const LOGIN_PAGE_INPUT_FIELD = () => {
    const [email, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const {loginUser, setLoginUser} = useContext(UserContext);

    const navigate = useNavigate();
    const adminLoginApi = "/users/adminLogin";
    const userLoginApi = "/users/visitorLogin";


    const handleLogin = (url, navigatePage, isLogged) => {
        let nullCheck = isBlank(email) && isBlank(userPassword);
        if (!nullCheck) {
            alert("Please fill the field(s) first!");
        }
        let password = sha256(userPassword.toString()).toString();
        const post = {email, password};
        console.log(post);
        console.log(baseUrl + url)
        fetch(baseUrl + url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);

            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;


            if (resultCode === 200) {
                setLoginUser(responseJson)
                setLoginUser(prev => ({...prev, isLogged: true}))
                /*
                setLoginUser(prev => ({...prev, firstName: responseJson.firstName}))
                setLoginUser(prev => ({...prev, lastName: responseJson.lastName}))
                setLoginUser(prev => ({...prev, email: responseJson.email}))
                setLoginUser(prev => ({...prev, token: responseJson.token}))

                 */
                navigate(navigatePage);
            } else {
                alert(errorMessage);

            }

        })
    }

    let isUserLogged = loginUser.isUserLogged
    let isAdminLogged = loginUser.isAdminLogged
    const buttons = [
        <Button key="one"
                onClick={() => handleLogin(userLoginApi, '/user_main_page', isUserLogged)}>User
            Login</Button>,
        <Button key="two"
                onClick={() => handleLogin(adminLoginApi, '/admin_main_page', isAdminLogged)}>Admin
            Login</Button>,

    ];

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(loginUser))
    });


    const theme = createTheme();

    return (
        <Box
            component="form"
            sx={{

                '& .MuiTextField-root': {m: 1, width: '50ch'},

            }}
            noValidate
            autoComplete="off"

            className='spacing_login_page'
        >
            <div>

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


            </div>

            <div>
                <TextField
                    required
                    id="outlined-helperText"
                    label="Password"
                    type="password"
                    value={userPassword}
                    inputProps={{
                        style: {
                            fontSize: 20
                        }
                    }}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
            </div>
            <Link className='linkStyle_login_page' to="/forget_password">
                <p className='linkFontSize_login_page'>Forget your Password?</p>
            </Link>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        display: 'flex',
                        '& > *': {
                            m: 3,

                        },
                    }}
                >
                    <ButtonGroup
                        aria-label="button group"
                        variant="contained"
                        className='Login_Button'
                    >
                        {buttons}
                    </ButtonGroup>

                </Box>
            </ThemeProvider>
        </Box>
    )
}
export default LOGIN_PAGE_INPUT_FIELD