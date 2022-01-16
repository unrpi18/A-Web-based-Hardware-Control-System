import {useNavigate} from "react-router";
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";


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


const WELCOME_PAGE_BUTTON = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpenAboutUs = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    return <div>

        <button id='button_big' type="button" className="Register_button_welcome_page"
                onClick={() => navigate('/register')}> Register
        </button>
        <button id='button_big' type="button" className="Login_button_welcome_page"
                onClick={() => navigate('/login')}> Login
        </button>

        <div>

            <button id='button_big' type="button" className='About_Us_button_welcome_page'
                    onClick={handleOpenAboutUs}>About us
            </button>
            <Dialog
                onClose={handleClose}
                open={open}>
                <BootstrapDialogTitle onClose={handleClose}>
                    Introduction
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography>
                        This project aims to design and develop a management system based on web for HardwareLab at TECO
                        to manage the stocks of items in the lab as well as the appointment to the lab.
                        As TECO made more and more progresses, the large demand for laboratory and items in TECO lab
                        increase rapidly.
                        TECO requires more articles or items than ever before.Conventional Lab management system often
                        leads to delayed response to users’ demands and restocking, crowded labs due to lack of
                        appointment system. Those would significantly reduce the speed of research and often result in
                        chaos in management.
                        To solve those problems, a management system designed exclusively for TECO would be designed.

                    </Typography>

                    <Typography align="left" color='red'>

                        Contact Email: tecolabsystem@outlook.com</Typography>
                </DialogContent>
                <DialogActions>


                    <Button autoFocus onClick={handleClose}>
                        OK
                    </Button>


                </DialogActions>
            </Dialog>
        </div>
    </div>

}

export default WELCOME_PAGE_BUTTON