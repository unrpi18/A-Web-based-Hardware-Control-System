import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useContext} from "react";
import {UserContext} from "../../../../../contexts/RegisterContext";
import {useRefreshControlGet} from "../../../ReusedMethod/storeDataPersistance";
import * as React from "react";

const USER_ACCOUNT_READ_ONLY_FIELDS = () => {
    const {loginUser, setLoginUser} = useContext(UserContext)
    useRefreshControlGet(setLoginUser);

    return (
        <Box
            component="form"
            sx={{

                '& .MuiTextField-root': {m: 1, width: '25ch'},

            }}
            noValidate
            autoComplete="off"
            className='spacing_login_page'
        >
            <div>
                <TextField
                    disabled
                    label='E-mail'
                    id="outlined-disabled"
                    value={loginUser.email}

                />
            </div>
            <div>
                <TextField
                    disabled
                    label='First name'
                    id="outlined-disabled"
                    value={loginUser.firstName}


                />
            </div>
            <div>
                <TextField
                    disabled
                    label='Last name'
                    id="outlined-disabled"
                    value={loginUser.lastName}

                />
            </div>

        </Box>
    )
}

export default USER_ACCOUNT_READ_ONLY_FIELDS