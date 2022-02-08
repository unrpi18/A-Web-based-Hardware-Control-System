import Admin_Profile from "../Admin_Icon/Admin_Profile";
import ADMINISTRATOR_MANAGEMENT_TABLE from "./Administrator_Management_Table";
import {Grid} from "@mui/material";



const ADMINISTRATOR_MANAGEMENT = () => {
    return <div>
        <Admin_Profile/>
        <Grid container spacing={3} direction="row"
              justifyContent="space-between"
              alignItems="center">
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={5}>
                <ADMINISTRATOR_MANAGEMENT_TABLE/>
            </Grid>
            <Grid item xs={1}>

            </Grid>
        </Grid>

    </div>
}

export default ADMINISTRATOR_MANAGEMENT