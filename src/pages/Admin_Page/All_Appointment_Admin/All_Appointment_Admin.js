
import Admin_Profile from "../Admin_Icon/Admin_Profile";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import ALL_APPOINTMENT_ADMIN_TABLE from "./All_Appointment_Admin_Table";

import {Grid} from "@mui/material";
import * as PropTypes from "prop-types";


function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
const ALL_APPOINTMENT_ADMIN = () => {
    return <div>
        <Admin_Profile/>
        <Grid container spacing={3} direction="row"
              justifyContent="space-between"
              alignItems="center">
            <Grid item xs={2}>
                <ADMIN_NAVI_PANEL/>
            </Grid>
            <Grid item xs={5}>
                <ALL_APPOINTMENT_ADMIN_TABLE/>
            </Grid>
            <Grid item xs={1}>
                <Item>  </Item>
            </Grid>
        </Grid>

    </div>
}

export default ALL_APPOINTMENT_ADMIN;