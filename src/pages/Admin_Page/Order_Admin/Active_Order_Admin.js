import Admin_Profile from "../Admin_Icon/Admin_Profile";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import ACTIVE_ORDER_ADMIN_TABLE from "./Active_Order_Admin_Table";

export default function ACTIVE_ORDER_ADMIN() {
    return (
        <div>
            <Admin_Profile/>
            <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{height: "4vh", width: "5vw", bgcolor: "transparent", my: "35vh"}}>
                    <ADMIN_NAVI_PANEL/>
                </Box>
                <Box sx={{height: "40vh", width: "90vw", bgcolor: "transparent"}}>
                    <ACTIVE_ORDER_ADMIN_TABLE/>
                </Box>
            </Stack>

        </div>
    )
}