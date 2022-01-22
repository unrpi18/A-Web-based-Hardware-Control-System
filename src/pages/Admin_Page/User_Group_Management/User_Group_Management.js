
import Admin_Profile from "../Admin_Icon/Admin_Profile";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";
import USER_GROUP_MANAGEMENT_TABLE from "./User_Group_Management_Table";

import {Grid} from "@mui/material";
import * as PropTypes from "prop-types";


function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
const APPOINTMENT_ADMIN = () => {
    return <div>
        <Admin_Profile/>
        <Grid container spacing={3} direction="row"
              justifyContent="space-between"
              alignItems="center">
            <Grid item xs={2}>
                <ADMIN_NAVI_PANEL/>
            </Grid>
            <Grid item xs={5}>
                <USER_GROUP_MANAGEMENT_TABLE/>
            </Grid>
            <Grid item xs={1}>
                <Item>  </Item>
            </Grid>
        </Grid>

    </div>
}

export default APPOINTMENT_ADMIN