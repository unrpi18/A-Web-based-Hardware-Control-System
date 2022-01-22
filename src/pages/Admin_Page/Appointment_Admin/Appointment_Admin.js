import './Appointment_Admin.css'
import Admin_Profile from "../Admin_Icon/Admin_Profile";


import APPOINTMENT_ADMIN_VIEW from "./Appointment_Admin_View";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import Stack from "@mui/material/Stack";
import APPOINTMENT_SECONDARY_NAVI from "./Appointment_Secondary_Navi";


const APPOINTMENT_ADMIN = () => {
    return <div>
        <Admin_Profile/>
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               spacing={2}>
            <ADMIN_NAVI_PANEL/>
            <APPOINTMENT_ADMIN_VIEW/>
            <APPOINTMENT_SECONDARY_NAVI/>
        </Stack>
    </div>
}

export default APPOINTMENT_ADMIN