import {useNavigate} from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import Select from "react-select/base";
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {FormHelperText} from "@mui/material";

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const APPOINTMENT_ADMIN_BUTTON = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [time_slot_id, setTime_slot_id] =useState('')
    const [date, setDate] = useState('')
    function navigate(String){
        fetch("url",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify('session_state')
        }).then(() => { console.log("success")});
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () =>{
        setOpen(true)
    }
    return <div>
        <button id = 'button_big' type = "button" className = "LOGOUT_APPOINTMENT_ADMIN"
                onClick={()=> navigate('/')} > Logout
        </button>
        <button id = 'button_super' type = "button" className = "ALL_APPOINTMENT_ADMIN"
                onClick={()=> navigate('/')} > All Appointments
        </button>
        <div>
            <button id = 'button_super' type = "button" className = "SET_TIME_SLOTS_STATUS_ADMIN"
                    onClick={()=> handleOpen} > Set Time Slots
            </button>

        </div>
        <div>
            <button id = 'button_super' type = "button" className = "BOOK_APPOINTMENT_ADMIN"
                    onClick={()=> handleOpen()} > Book Appointment
            </button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Please enter the following information to book appointments for other u
                        </DialogContentText>
                    </div>
                    <div>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            placeholder ="john.doe@example.com"
                            type="email"
                            value ={email}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            margin="dense"
                            id="date"
                            label="date"
                            type="date"
                            value = {date}
                            fullWidth
                            variant="standard"
                        />
                    </div>
                    <div>
                        <FormControl  fullWidth>
                            <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                            <Select
                                value={time_slot_id}
                                label="Time Slot *"
                            >
                                <MenuItem value="1">08:00-10:00</MenuItem>
                                <MenuItem value="2">10:00-12:00</MenuItem>
                                <MenuItem value="3">12:00-14:00</MenuItem>
                                <MenuItem value="4">14:00-16:00</MenuItem>
                                <MenuItem value="5">16:00-18:00</MenuItem>
                                <MenuItem value="6">18:00-20:00</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>


    </div>
}

export default APPOINTMENT_ADMIN_BUTTON