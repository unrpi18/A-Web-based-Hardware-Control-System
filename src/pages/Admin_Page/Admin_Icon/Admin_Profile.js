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
import {useState} from "react";
import {Fragment} from "react";
import Stack from "@mui/material/Stack";
import LOGO from "../../../components/logos/Logo";
import { InputLabel} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {url} from "../Navi_base";
import ADMIN_NAVI_PANEL from "../Admin_Navi/Admin_Navi_Panel";

const Admin_Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notification_status, setNotification_status] = useState(window.sessionStorage.getItem('receiveNotification') === 'true')
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
        const isReceiveBulkEmail = e.target.value;
        let post = {isReceiveBulkEmail};
        fetch(url + '/users/changeEmailSetting', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson)
            if(responseJson.resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                window.sessionStorage.setItem('receiveNotification', isReceiveBulkEmail);
                setNotification_status(window.sessionStorage.getItem('receiveNotification') === 'true');
            } else if(responseJson.resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                setNotification_status(window.sessionStorage.getItem('receiveNotification') === 'true');
                alert(responseJson.message)
            }else {
                window.sessionStorage.clear();
                alert(responseJson.message)
                navigate('/')
            }
        })
    }
    function forced_logout(){
        window.sessionStorage.clear();
        alert("session invalid, please log in again");
        navigate('/');
        return "invalid, you are being logged out";
    }
    function returned_component(){
        if(window.sessionStorage.getItem('first_name') === null ){
            return (
                forced_logout()
            )
        } else {
            return (
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <LOGO/>
                    <Fragment>
                        <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', mr: '0'}}>
                            <ADMIN_NAVI_PANEL/>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{mr: '0', mt: 0}}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{
                                        width: 70,
                                        height: 70
                                    }}>{window.sessionStorage.getItem('first_name').charAt(0).toUpperCase()}</Avatar>
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
                                        defaultValue={notification_status}
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

    }

    return (
        returned_component()
    )
}
export default Admin_Profile