import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VideocamIcon from '@mui/icons-material/Videocam';
import EventIcon from '@mui/icons-material/Event';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArticleIcon from '@mui/icons-material/Article';
import {useNavigate} from "react-router";
export default function ADMIN_NAVI_PANEL() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const navigate = useNavigate();
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 , mb : 0, ml : 0}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider />
            <List>
                <ListItem button onClick={()=>navigate("/appointment_admin")}>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary='Appointments' />
                </ListItem>
                <ListItem button onClick ={()=>navigate("/stock_and_order_admin_navi")}>
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary='Stocks & Orders' />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <VideocamIcon />
                    </ListItemIcon>
                    <ListItemText primary='Webcam' />
                </ListItem>
                <ListItem button onClick={()=>navigate("/user_group_navi_page")}>
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary = 'User Group' />
                </ListItem>
                <ListItem button onClick={()=>navigate("/t_and_c_update")}>
                    <ListItemIcon>
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary='T&C Update' />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton aria-label="view" size = "large" onClick={toggleDrawer(anchor, true)}>
                        <FormatListBulletedIcon />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
