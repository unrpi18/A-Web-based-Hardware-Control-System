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
import '../../User_Page/User_Navi/User_Navi_Panel_Stytle.css'


const USER_NAVI_PANEL = () => {
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

        setState({...state, [anchor]: open});
    };


    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, mb: 0, ml: 0}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}

        >
            <Divider/>
            <List>
                <ListItem button onClick={() => navigate("/user_appointment_page")}>
                    <ListItemIcon>
                        <EventIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Appointments' primaryTypographyProps={{
                        color: '#009682',
                        fontWeight: 'medium',
                        fontSize: 20
                    }}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InventoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Stocks & Orders' primaryTypographyProps={{
                        color: '#009682',
                        fontWeight: 'medium',
                        fontSize: 20
                    }}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <VideocamIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Webcam' primaryTypographyProps={{
                        color: '#009682',
                        fontWeight: 'medium',
                        fontSize: 20
                    }}/>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <div className='User_Navi_Panel_Style'>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton aria-label="view" onClick={toggleDrawer(anchor, true)}>
                        <FormatListBulletedIcon sx={{
                            width: 50,
                            height: 50,
                            color: 'black',
                        }}/>
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

export default USER_NAVI_PANEL