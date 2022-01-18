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
    const [rpt_wks, setRpt_wks] = useState('')
    const handleChange = (event) => {
        setTime_slot_id(event.target.value);
    };
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
    const handleConfirm =(e)=>{
        let pack = {email, date, rpt_wks};
        console.log(pack);
        setEmail('');
        setRpt_wks('');
        setDate('');
        handleClose();
    }
    const emailOnchange =(event)=>{
        setEmail(event.target.value);
    }
    const dateOnchange =(event)=>{
        setDate(event.target.value);
    }
    const rpt_wksOnchange =(event)=>{
        setRpt_wks(event.target.value);
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
                    onClick={()=> handleOpen()} > Set Time Slots
            </button>

        </div>
        <div>
            <button id = 'button_super' type = "button" className = "BOOK_APPOINTMENT_ADMIN"
                    onClick={()=> handleOpen()} > Book Appointment
            </button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide the following information to book an appointment
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value ={email}
                        onChange ={emailOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="date"
                        label="date"
                        type="date"
                        fullWidth
                        variant="standard"
                        value ={date}
                        onChange={dateOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="rpt"
                        label="number of rpt"
                        type="number"
                        fullWidth
                        variant="standard"
                        value ={rpt_wks}
                        onChange={rpt_wksOnchange}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>


    </div>
}

export default APPOINTMENT_ADMIN_BUTTON