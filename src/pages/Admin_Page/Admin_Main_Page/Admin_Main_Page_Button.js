
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import {UserContext} from "../../../contexts/RegisterContext";
import {useNavigate} from "react-router";
import {checkToken} from "../TokenTest";

const ADMIN_MAIN_PAGE_BUTTON = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const tokenTest = (url) => {
        if (checkToken(loginUser.token)) {
            navigate(url)
        }
    }

    return <div>
        <ButtonGroup
            orientation="vertical"
            variant="contained"
            aria-label="vertical outlined button group"
            sx ={{my : "30vh", ml : 0, height : "10vh"}}
        >
            <Button key = "appointment_admin" >Appointment Management</Button>
            <Button key = "stock_admin" >Stocks & Orders</Button>
            <Button key = "webcam_admin" >Webcam</Button>
            <Button key = "User Group Management" onClick={() => tokenTest('/user_group_management')}>User Group Management</Button>
            <Button key = "t_and_c_update" >T&C Update</Button>
        </ButtonGroup>

    </div>
}

export default ADMIN_MAIN_PAGE_BUTTON