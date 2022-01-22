import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {useNavigate} from "react-router";
import {useContext} from "react";
import {useState} from "react";
import {Fragment} from "react";
import {UserContext} from "../../../contexts/RegisterContext";
import Stack from "@mui/material/Stack";
import LOGO from "../../../components/logos/Logo";
import { InputLabel} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Admin_Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {loginUser, setLoginUser} = useContext(UserContext)
    const [notification_status, setNotification_status] = useState(false)
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleProfileNavigate = (url) => {
        navigate(url);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const notification_statusOnchange =(e)=>{
        setNotification_status(e.target.value);
        const user_token = loginUser.token;
        let post = {user_token, notification_status};
        console.log(post);
        fetch('192.168.1.1', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
        })
    }

    function fetchEmailNotificationStatus(){
        const user_token = loginUser.token;
        let post = {user_token};
        console.log(post);
        fetch('192.168.1.1', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            return responseJson.notification_status === 'true';
        })
        return false;
    }


    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <LOGO/>
            <Fragment>
                <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', mr : '0'}}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{mr: '0', mt : 0}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{width: 70, height: 70}}>{loginUser.firstName}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0, sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32, height: 32, ml: -0.5, mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >

                    <MenuItem>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Notification</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={notification_status}
                                label="Notification Status"
                                onChange={notification_statusOnchange}>
                                <MenuItem value={true}>On</MenuItem>
                                <MenuItem value={false}>Off</MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                    <Divider/>

                    <MenuItem onClick={() => handleProfileNavigate('/')}>
                        < ListItemIcon>
                            < Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Fragment>
        </Stack>
        );
}
export default Admin_Profile