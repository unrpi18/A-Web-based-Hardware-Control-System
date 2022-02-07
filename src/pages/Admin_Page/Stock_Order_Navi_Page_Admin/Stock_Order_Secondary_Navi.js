import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router";

import {ButtonGroup} from "@mui/material";

export default function STOCK_ORDER_SECONDARY_NAVI(){
    const navigate = useNavigate();
    return (
            <ButtonGroup orientation="vertical">
                <Button variant = "contained" onClick= {()=>navigate('/stock_admin')}>Stocks</Button>
                <Button variant = "contained" onClick= {()=>navigate('/active_order_admin')}>Active Orders</Button>
                <Button variant = "contained" onClick= {()=>navigate('/past_order_admin')}>Past Orders</Button>
            </ButtonGroup>
    )
}