import Admin_Profile from "../Admin_Icon/Admin_Profile";
import ALL_APPOINTMENT_ADMIN_TABLE from "./All_Appointment_Admin_Table";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


const ALL_APPOINTMENT_ADMIN = () => {
    return <div>
        <Admin_Profile/>
        <Box sx ={{width : "100vw", height : "100vh", backgroundColor : "transparent", my : "15vh"}}>
            <Stack direction= "row" spacing ={2} justifyContent="flex-start" alignItems="flex-start" >
                <Box sx ={{width : "20vw", height : "50vh", backgroundColor : "transparent", my : "25vh"}}>
                </Box>
                    <ALL_APPOINTMENT_ADMIN_TABLE/>
            </Stack>
        </Box>



    </div>
}

export default ALL_APPOINTMENT_ADMIN;