import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Admin_Profile from "../Admin_Icon/Admin_Profile";
import USER_GROUP_NAVI_TEXT from "./Stock_Order_Navi_Text";
import STOCK_ORDER_SECONDARY_NAVI from "./Stock_Order_Secondary_Navi";


export default function STOCK_ORDER_NAVI_PAGE(){
    return(
        <div>
            <Admin_Profile/>
            <Box sx ={{width : "100vw", height : "80vh", backgroundColor : "transparent", my :"35vh"}} >
                <Stack direction="row" justifyContent="space-between" alignItems = "center" >

                    <Box sx ={{width : "80vw", height : "20vh", backgroundColor : "transparent"}}>
                        <USER_GROUP_NAVI_TEXT/>
                    </Box>
                    <Box sx ={{width : "11vw", height : "12vh", backgroundColor : "transparent"}}>
                        <STOCK_ORDER_SECONDARY_NAVI/>
                    </Box>
                </Stack>
            </Box>
        </div>

    )
}