import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function USER_GROUP_NAVI_TEXT(){
    return(
        <Stack direction="column" spacing ={3} alignItems="center">
            <Typography variant = "h3">
                You are in Navigation Panel of User Group Management
            </Typography>
            <Typography variant = "h4">
                Please use the navigation panel to the left hand side
            </Typography>
            <Typography variant = "h4">
                or click the button to the right hand side.
            </Typography>
        </Stack>
    )
}