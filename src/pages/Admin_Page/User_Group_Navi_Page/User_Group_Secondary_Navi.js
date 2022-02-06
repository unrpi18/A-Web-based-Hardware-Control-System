import Button from "@mui/material/Button";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router";

import {ButtonGroup} from "@mui/material";
import {UserContext} from "../../../contexts/RegisterContext";

export default function USER_GROUP_SECONDARY_NAVI(){
    const {loginUser, setLoginUser} = useContext(UserContext);
    const navigate = useNavigate();
    return (
            <ButtonGroup orientation="vertical">
                <Button variant = "contained" onClick= {()=>navigate('/new_user_management')}>Registration Requests Management</Button>
                <Button variant = "contained" onClick= {()=>navigate('/user_management')}>Users Management</Button>
                <Button variant = "contained" disabled = {loginUser === null || loginUser.email !== 'teco@teco.com'} onClick= {()=>navigate('/admin_management')}>Administrators Management</Button>
            </ButtonGroup>
    )
}