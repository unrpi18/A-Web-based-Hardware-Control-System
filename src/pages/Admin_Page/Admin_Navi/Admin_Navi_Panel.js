
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";

const ADMIN_NAVI_PANEL = () => {

    return <div>
        <ButtonGroup
            orientation="vertical"
            variant="contained"
            aria-label="vertical outlined button group"
            sx ={{my : "35vh", ml : 0, height : "10vh"}}
        >
            <Button key = "appointment_admin" >Appointment Management</Button>
            <Button key = "stock_admin" >Stocks & Orders</Button>
            <Button key = "webcam_admin" >Webcam</Button>
            <Button key = "User Group Management">User Group Management</Button>
            <Button key = "t_and_c_update" >T&C Update</Button>
        </ButtonGroup>

    </div>
}

export default ADMIN_NAVI_PANEL