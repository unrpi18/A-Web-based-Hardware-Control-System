import ADMIN_MAIN_PAGE_TEXT from "./Admin_Main_Page_Text";
import Admin_Profile from "../Admin_Icon/Admin_Profile";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";


const ADMIN_MAIN_PAGE = () => {
    return <div>
        <Admin_Profile/>
        <Box componet = "span" sx ={{width : "95vw", height : "10vh", backgroundColor : "transparent", my : '35vh', mx : '10vw'}}>
            <Stack direction="row" justifyContent="space-between" alignItems = "center">
                <ADMIN_MAIN_PAGE_TEXT/>
            </Stack>
        </Box>




    </div>
}

export default ADMIN_MAIN_PAGE