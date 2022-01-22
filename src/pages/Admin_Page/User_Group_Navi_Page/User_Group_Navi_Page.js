import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Admin_Profile from "../Admin_Icon/Admin_Profile";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import USER_GROUP_NAVI_TEXT from "./User_Group_Navi_Text";
import USER_GROUP_SECONDARY_NAVI from "./User_Group_Secondary_Navi";


export default function USER_GROUP_NAVI_PAGE(){
    return(
        <div>
            <Admin_Profile/>
            <Box sx ={{width : "100vw", height : "80vh", backgroundColor : "transparent", my :"35vh"}} >
                <Stack direction="row" justifyContent="space-between" alignItems = "center" >
                    <Box sx ={{width : "3vw", height : "5vh", backgroundColor : "transparent"}}>
                        <ADMIN_NAVI_PANEL/>
                    </Box>
                    <Box sx ={{width : "65vw", height : "20vh", backgroundColor : "transparent"}}>
                        <USER_GROUP_NAVI_TEXT/>
                    </Box>
                    <Box sx ={{width : "18vw", height : "12vh", backgroundColor : "transparent"}}>
                        <USER_GROUP_SECONDARY_NAVI/>
                    </Box>
                </Stack>
            </Box>

        </div>

    )
}