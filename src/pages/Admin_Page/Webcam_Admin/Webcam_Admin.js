import Admin_Profile from "../Admin_Icon/Admin_Profile";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import WEBCAM_ADMIN_VIEW from "./Webcam_Admin_View";


export default function WEBCAM_ADMIN(){
    return (
        <div>
            <div>
                <Admin_Profile/>
                <Stack direction = "row" spacing = {2} alignItems="center">
                    <Box sx ={{height : "4vh", width : "5vw", bgcolor : "transparent", my : "35vh"}}>
                        <ADMIN_NAVI_PANEL/>
                    </Box>
                    <Box sx ={{height : "40vh", width : "90vw", bgcolor : "transparent"}}>
                        <WEBCAM_ADMIN_VIEW/>
                    </Box>
                </Stack>
            </div>
        </div>
    )
}