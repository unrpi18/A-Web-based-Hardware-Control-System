
import Admin_Profile from "../Admin_Icon/Admin_Profile";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import ALL_APPOINTMENT_ADMIN_TABLE from "./All_Appointment_Admin_Table";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
const ALL_APPOINTMENT_ADMIN = () => {
    return <div>
        <Admin_Profile/>
        <Box sx ={{width : "100vw", height : "100vh", backgroundColor : "transparent", my : "15vh"}}>
            <Stack direction= "row" spacing ={2} justifyContent="flex-start" alignItems="flex-start" >
                <Box sx ={{width : "25vw", height : "50vh", backgroundColor : "transparent", my : "25vh"}}>
                    <ADMIN_NAVI_PANEL/>
                </Box>
                    <ALL_APPOINTMENT_ADMIN_TABLE/>
            </Stack>
        </Box>



    </div>
}

export default ALL_APPOINTMENT_ADMIN;