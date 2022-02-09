import Admin_Profile from "../Admin_Icon/Admin_Profile";
import NEW_USER_MANAGEMENT_TABLE from "./New_User_Management_Table";
import {Grid} from "@mui/material";

const APPOINTMENT_ADMIN = () => {
    return <div>
        <Admin_Profile/>
        <Grid container spacing={3} direction="row"
              justifyContent="space-between"
              alignItems="center">
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={5}>
                <NEW_USER_MANAGEMENT_TABLE/>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>

    </div>
}

export default APPOINTMENT_ADMIN