
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {Fragment} from "react";
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
import {ListItemButton} from "@mui/material";
import {Collapse} from "@material-ui/core";
import {ExpandMore} from "@mui/icons-material";
import {useState} from "react";
export default function ADMIN_NAVI_PANEL() {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [order_open, setOrder_open] = useState(false)
    const handleOrderClick = () => {
        setOrder_open(!order_open);
    };
    const [user_open, setUser_open] = useState(false)
    const handleUserClick=()=>{
        setUser_open(!user_open);
    }
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
                <ListItem button onClick ={handleOrderClick}>
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary='Stocks & Orders' />
                    {<ExpandMore/>}
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {[{
                            "text": 'Stock',
                            "url": '/stock_admin',
                        },
                            {
                                "text": 'Active Orders',
                                "url": '/active_order_admin',
                            },
                            {
                                "text": 'Past Orders',
                                "url": '/past_order_admin',
                            },

                        ].map((input) => (
                            <ListItemButton sx={{pl: 4}} key={input.text} onClick={() => navigate(input.url)}>
                                <ListItemText primary={input.text} primaryTypographyProps={{
                                    fontWeight: 'medium', fontSize: 15
                                }}/>
                            </ListItemButton>
                        ))

                        }
                    < /List>

                </Collapse>
                <ListItem button onClick ={()=>navigate("/webcam_admin")}>
                    <ListItemIcon>
                        <VideocamIcon />
                    </ListItemIcon>
                    <ListItemText primary='Webcam' />
                </ListItem>
                <ListItem button onClick={handleUserClick}>
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary = 'User Group' />
                    <ExpandMore/>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {[{
                            "text": 'Registration Management',
                            "url": '/new_user_management',
                        },
                            {
                                "text": 'Users Management ',
                                "url": '/user_management',
                            },
                            {
                                "text": 'Admin Management',
                                "url": '/admin_management',
                            },

                        ].map((input) => (
                            <ListItemButton sx={{pl: 4}}
                                            key={input.text}
                                            onClick={() => navigate(input.url)}
                                            disabled={input.text === 'Admin Management' && window.sessionStorage.getItem('email') !== 'pseteamone@teco.edu'}>
                                <ListItemText primary={input.text} primaryTypographyProps={{
                                    fontWeight: 'medium', fontSize: 15
                                }}/>
                            </ListItemButton>
                        ))

                        }
                    < /List>

                </Collapse>
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
                <Fragment key={anchor}>
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
                </Fragment>
            ))}
        </div>
    );
}
