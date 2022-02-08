import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import {ButtonGroup} from "@mui/material";

export default function USER_GROUP_SECONDARY_NAVI(){
    const navigate = useNavigate();
    return (
            <ButtonGroup orientation="vertical">
                <Button variant = "contained" onClick= {()=>navigate('/new_user_management')}>Registration Requests Management</Button>
                <Button variant = "contained" onClick= {()=>navigate('/user_management')}>Users Management</Button>
                <Button variant = "contained" disabled = {window.sessionStorage.getItem('email') !== 'teco@teco.com'} onClick= {()=>navigate('/admin_management')}>Administrators Management</Button>
            </ButtonGroup>
    )
}