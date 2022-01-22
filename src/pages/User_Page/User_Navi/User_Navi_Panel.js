import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";

const USER_NAVI_PANEL = () => {
    const navigate = useNavigate();


    const handleAppointment = (e) => {
        e.preventDefault();
        navigate('/user_appointment_page');

    }

    return <div>
        <ButtonGroup
            orientation="vertical"
            variant="contained"
            aria-label="vertical outlined button group"
            sx={{my: "15%", ml: 0, height: "5vh",width:"20vh"}}
        >
            <Button key="appointment_user" onClick={handleAppointment}>Appointment Management</Button>
            <Button key="stock_user">Stocks & Orders</Button>
            <Button key="webcam_user">Webcam</Button>
        </ButtonGroup>

    </div>
}

export default USER_NAVI_PANEL