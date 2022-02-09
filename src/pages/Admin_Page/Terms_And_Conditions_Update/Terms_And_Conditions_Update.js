import Admin_Profile from "../Admin_Icon/Admin_Profile";
import FILE_UPLOADER from "./File_Uploader";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function TERMS_AND_CONDITIONS_UPDATE(){
    return(
        <div>
            <Admin_Profile/>
            <Stack direction = "row" spacing = {2} alignItems="center">
                <Box sx ={{height : "4vh", width : "5vw", bgcolor : "transparent", my : "35vh"}}>

                </Box>
                <Box sx ={{height : "40vh", width : "90vw", bgcolor : "transparent"}}>
                    <FILE_UPLOADER/>
                </Box>
            </Stack>
        </div>
    )
}