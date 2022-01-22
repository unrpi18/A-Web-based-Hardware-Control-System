import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router";

export default function APPOINTMENT_SECONDARY_NAVI(){
    const navigate = useNavigate();
    return (
    <Button variant = "contained" onClick= {()=>navigate('/all_appointment_admin')}>All Appointments</Button>
)
}