import Button from "@mui/material/Button";
import React, {useContext} from "react";
import {useNavigate} from "react-router";

import {ButtonGroup} from "@mui/material";
import {checkToken} from "../TokenTest";
import {UserContext} from "../../../contexts/RegisterContext";

export default function USER_GROUP_SECONDARY_NAVI(){
    const {loginUser, setLoginUser} = useContext(UserContext);
    const tokenTest = (url) => {
        if (checkToken(loginUser.token)) {
            navigate(url)
        }
    }

    const navigate = useNavigate();
    return (
            <ButtonGroup orientation="vertical">
                <Button variant = "contained" onClick= {()=>navigate('/new_user_management')}>Registration Requests Management</Button>
                <Button variant = "contained" onClick= {()=>tokenTest('/user_management')}>Users Management</Button>
                <Button variant = "contained" disabled = {false} onClick= {()=>navigate('/admin_management')}>Administrators Management</Button>
            </ButtonGroup>
    )
}