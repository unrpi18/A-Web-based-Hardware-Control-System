import Admin_Profile from "../Admin_Icon/Admin_Profile";
import {Grid} from "@mui/material";
import USER_MANAGEMENT_TABLE from "./User_Management_Table";

const USER_MANAGEMENT = () => {
    return <div>
        <Admin_Profile/>
        <Grid container spacing={3} direction="row"
              justifyContent="space-between"
              alignItems="center">
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={5}>
                <USER_MANAGEMENT_TABLE/>
            </Grid>
            <Grid item xs={1}>

            </Grid>
        </Grid>

    </div>
}
export default USER_MANAGEMENT