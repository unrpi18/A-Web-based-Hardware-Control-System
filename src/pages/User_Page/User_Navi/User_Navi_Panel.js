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
import {useNavigate} from "react-router";
import '../../User_Page/User_Navi/User_Navi_Panel_Stytle.css'
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {Collapse} from "@material-ui/core";
import {ListItemButton} from "@mui/material";
import {useState} from "react";


const USER_NAVI_PANEL = () => {
    const [state, setState] = useState({
        left: false, bottom: false,

    });
    const [open, setOpen] = useState(true);

    const navigate = useNavigate();

    const toggleDrawer = (anchor, open) => (event) => {
        if ((event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };


    const handleClick = () => {
        setOpen(!open);
    };

    const list = (anchor) => (<Box
                sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, mb: 0, ml: 0}}
                role="presentation"

                onKeyDown={toggleDrawer(anchor, false)}

            >
                <Divider/>
                <List>

                    <ListItem button onClick={() => navigate("/user_appointment_page")}>
                        <ListItemIcon>
                            <EventIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Appointments' primaryTypographyProps={{
                            color: '#009682', fontWeight: 'medium', fontSize: 20
                        }}/>
                    </ListItem>
                    <Divider light/>
                    < ListItem button onClick={handleClick}>

                        <ListItemIcon>
                            <InventoryIcon/>
                        </ListItemIcon>

                        <ListItemText primary='Stocks & Orders' primaryTypographyProps={{
                            color: '#009682',
                            fontWeight: 'medium',
                            fontSize: 20
                        }}/>
                        {open ? <ExpandLess/> : <ExpandMore/>}

                    </ListItem>

                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            {[{
                                "text": 'Stock',
                                "url": '/stock_view',
                            },
                                {
                                    "text": 'Active Order',
                                    "url": '/active_order',
                                },
                                {
                                    "text": 'Past Order',
                                    "url": '/past_order',
                                },
                                {
                                    "text": 'Submit Order',
                                    "url": '/submit_order',
                                }
                            ].map((input) => (
                                <ListItemButton sx={{pl: 4}} key={input.text} onClick={() => navigate(input.url)}>
                                    <ListItemText primary={input.text} primaryTypographyProps={{
                                        color: '#009682', fontWeight: 'medium', fontSize: 15
                                    }}/>
                                </ListItemButton>
                            ))

                            }
                        < /List>

                    </Collapse>


                    <Divider light/>
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
        )
    ;

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