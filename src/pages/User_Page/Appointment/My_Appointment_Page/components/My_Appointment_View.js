import Button from '@mui/material/Button';
import {DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext, useEffect, useState} from "react";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import {useNavigate} from "react-router";
import '../My_Appointment_Page_Style.css'
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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

function convertIDtoSlot(id) {
    switch (id) {
        case 0 :
            return '08:00-10:00';
        case 1 :
            return '10:00-12:00';
        case 2 :
            return '12:00-14:00';
        case 3 :
            return '14:00-16:00';
        case 4 :
            return '16:00-18:00';
        default :
            return '18:00-20:00';
    }
}

function convertSlotToId(slot) {
    switch (slot) {
        case '08:00-10:00':
            return 0;
        case '10:00-12:00':
            return 1;
        case '12:00-14:00' :
            return 2;
        case  '14:00-16:00' :
            return 3;
        case '16:00-18:00' :
            return 4;
        default :
            return 5;
    }
}


const MY_APPOINTMENT_VIEW = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [open, setOpen] = useState(false);
    const {loginUser, setLoginUser} = useContext(UserContext);

    const handleCancelButton = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCancel = (user) => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.timeSlotId === user.id))
        let date = waitedCancelData[0].timeSlotDate
        let slot = waitedCancelData[0].slot
        const post = {date, slot};
        let token = loginUser.token
        console.log(post)
        fetch(baseUrl + "/appointments/deleteAppointmentByDate", {
            method: 'POST', headers: {
                "Content-Type": "application/json", "Authorization": token
            }, body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            let message = responseJson.message;
            console.log("go")
            console.log(responseJson)
            if (message === "SUCCESS") {

                let newData = (rows.data.filter((rowData) => rowData.timeSlotId !== user.id))
                setRows(rows => ({...rows, data: newData}))
                handleClose()
                alert("successed!")

            } else {
                alert(message);

            }

        })

    }


    const columns = [{
        field: 'timeSlotId', headerName: 'timeSlot id', width: 70, headerAlign: 'center', hide: 'true'
    }, {field: 'slot', headerName: 'slot id', width: 130, headerAlign: 'center', hide: 'true'}, {
        field: 'timeSlotDate', headerName: 'Date', width: 150, headerAlign: 'center'
    },
        {
            field: 'slotTime', headerName: 'Time Slot', width: 150, headerAlign: 'center', valueGetter: (param) =>
                convertIDtoSlot(param.row.slot)
        },
        {field: 'timeSlotStatus', headerName: 'Status', width: 150, headerAlign: 'center'},
        {
            field: 'action', headerName: 'Action', headerAlign: 'center', sortable: false, renderCell: (param) => {
                let {date, slot} = getCancelCellInformation(param)
                let slotTime = convertIDtoSlot(slot);
                return (
                    <div>


                        <IconButton aria-label="view" sx={{
                            color: 'black',
                        }} onClick={handleCancelButton}>
                            <DeleteIcon/>
                        </IconButton>
                        <Dialog
                            onClose={handleClose}
                            open={open}>
                            <BootstrapDialogTitle color='#006356' onClose={handleClose}>
                                Cancel Information
                            </BootstrapDialogTitle>
                            <DialogContent>
                                <Typography color='red'>
                                    Do you really want to cancel your appointment during {slotTime} on the day {date} ?
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    No,thanks
                                </Button>
                                <Button autoFocus onClick={() => handleCancel(param)}>
                                    Confirm
                                </Button>


                            </DialogActions>
                        </Dialog>
                    </div>
                )
            },
        },

    ];

    const useFetchData = () => {
        const navigate = useNavigate();

        const [rows, setRows] = useState([]);
        let email = loginUser.email;
        const post = {email};
        let token = loginUser.token
        console.log(post)
        console.log(token)
        useEffect(() => {
            fetch(baseUrl + "/appointments/userGetUserAppointments", {
                method: 'GET', headers: {"Authorization": token}
            }).then(response => response.json()).then(responseJson => {
                let message = responseJson.message;

                if (message === "SUCCESS") {

                    setRows(rows => ({...rows, data: responseJson.data}))
                    setIsLoaded(true)
                } else {
                    alert(message);

                }

            }).catch(error => console.error(error))
        }, []);

        return {rows, setRows};
    }
    const {rows, setRows} = useFetchData()


    function getCancelCellInformation(user) {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.timeSlotId === user.id))
        let date = waitedCancelData[0].timeSlotDate
        let slot = (waitedCancelData[0].slot)

        return {date, slot};
    }

    function convertId() {
        if (isLoaded) {
            for (let i = 0; i < rows.data.length; i++) {
                console.log(rows.data[i].slot)
                console.log("=======test=======")

                let newSlot = convertIDtoSlot(rows.data[i].slot)
                rows.data[i].slot = newSlot

            }
        }
    }

    return (<div style={{height: 400, width: '30%', textAlign: "center"}} className='view_position'>
        <Typography variant="h4" display="block" align='center' sx={{
            color: '#009682'
        }} gutterBottom>
            My Appointment
        </Typography>
        <DataGrid rows={rows.data} columns={columns} pageSize={5}
                  id='timeSlotId'
                  sx={{

                      boxShadow: 2, border: 2, borderColor: '#009682', '& .MuiDataGrid-cell:hover': {
                          color: 'primary.secondary',

                      }, '& .MuiDataGrid-cell': {
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          lineHeight: 1,
                          height: 50,
                          zeroMinWidth: 500,
                          alignItems: 'center',
                          justifyContent: "center"
                      }
                  }}

                  getRowId={row => row.timeSlotId}
                  getRowClassName={slot => convertIDtoSlot(slot)}


        />
    </div>);
}

export default MY_APPOINTMENT_VIEW