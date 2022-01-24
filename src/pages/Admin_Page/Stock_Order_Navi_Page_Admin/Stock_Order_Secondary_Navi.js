import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router";

import {ButtonGroup} from "@mui/material";

export default function STOCK_ORDER_SECONDARY_NAVI(){
    const navigate = useNavigate();
    return (
            <ButtonGroup orientation="vertical">
                <Button variant = "contained" onClick= {()=>navigate('/new_user_management')}>Stocks</Button>
                <Button variant = "contained" onClick= {()=>navigate('/user_management')}>Active Orders</Button>
                <Button variant = "contained" disabled = {false} onClick= {()=>navigate('/admin_management')}>Past Orders</Button>
            </ButtonGroup>
    )
}