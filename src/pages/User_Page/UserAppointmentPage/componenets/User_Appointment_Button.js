import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {UserContext} from "../../../../contexts/RegisterContext";


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


export function USER_APPOINTMENT_BUTTON() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [time_slot_id, setTime_slot_id] = useState('')
    const [date, setDate] = useState('')
    const [rpt_wks, setRpt_wks] = useState('')
    const [status, setStatus] = useState('');
    const timeSlotOnchange = (event) => {
        setTime_slot_id(event.target.value);
    };

    const navigate = useNavigate();


    const {loginUser, setLoginUser} = useContext(UserContext)
    const initialRows = [{slot: '', timeSlotDate: ''}];

    const [rows, setRows] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setEmail('');
        setRpt_wks('');
        setDate('');
        setTime_slot_id('');
        setOpen(true);
    }
    const handleConfirm = () => {
        let pack = {email, date, rpt_wks, time_slot_id};
        console.log(pack);
        handleClose();
    }

    const dateOnchange = (event) => {
        setDate(event.target.value);
    }
    const rpt_wksOnchange = (event) => {
        setRpt_wks(event.target.value);
    }
    const statusOnchange = (event) => {
        setStatus(event.target.value);
    }


    return <div>
        <button id='button_super' type="button" className="ALL_APPOINTMENT_ADMIN"
                onClick={() => navigate('/my_appointment')}> My Appointment
        </button>

    </div>
}

export default USER_APPOINTMENT_BUTTON