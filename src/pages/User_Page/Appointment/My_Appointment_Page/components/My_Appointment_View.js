import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {baseUrl} from "../../../../../contexts/RegisterContext";
import '../My_Appointment_Page_Style.css'
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {BootstrapDialogTitle} from "../../../ReusedMethod/BootstrapDialogTitle";
import {useFetchData} from "../../../ReusedMethod/fetchData";


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


const MY_APPOINTMENT_VIEW = () => {
    const [open, setOpen] = useState(false);
    const [loginUser, setLoginUser] = useState(() => {
        const saved = localStorage.getItem("user")
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })

    const [param, setParam] = useState()
    const [id, setId] = useState()
    const [timeSlotDate, setTimeSlotDate] = useState()
    const [slot, setSlot] = useState()

    const my_appointmentApi = "/appointments/userGetUserAppointments";
    const {rows, setRows} = useFetchData('GET', loginUser, my_appointmentApi)

    const handleCancelButton = (param) => {
        setOpen(true);
        setParam(param)
        let waitedCancelData = (rows.data.filter((rowData) => rowData.timeSlotId === param.id))
        console.log(waitedCancelData)
        let date = waitedCancelData[0].timeSlotDate
        let slot = convertIDtoSlot(waitedCancelData[0].slot)
        setId(param.id)
        setTimeSlotDate(date)
        setSlot(slot)


    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.timeSlotId === id))
        let date = waitedCancelData[0].timeSlotDate
        let slot = waitedCancelData[0].slot
        const post = {date, slot};
        let token = loginUser.token
        console.log(post)
        fetch(baseUrl + "/appointments/userDeleteAppointment", {
            method: 'POST', headers: {
                "Content-Type": "application/json", "Authorization": token
            }, body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            let message = responseJson.message;
            let resultCode =responseJson.resultCode
            console.log(responseJson)
            if (resultCode === 200) {
                let newData = (rows.data.filter((rowData) => rowData.timeSlotId !== id))
                setRows(rows => ({...rows, data: newData}))
                handleClose()


            } else {
                alert(message);

            }

        })

    }


    const columns = [{
            field: 'timeSlotId', headerName: 'timeSlot id', width: 70, headerAlign: 'center', hide: 'true'
        }, {field: 'slot', headerName: 'slot id', width: 130, headerAlign: 'center', hide: 'true'}, {
            field: 'timeSlotDate', headerName: 'Date', width: 120, headerAlign: 'center'
        },
            {
                field: 'slotTime', headerName: 'Time Slot', width: 120, headerAlign: 'center', valueGetter: (param) =>
                    convertIDtoSlot(param.row.slot)
            },
            {field: 'timeSlotStatus', headerName: 'Status', width: 120, headerAlign: 'center'},
            {
                field: 'action', headerName: 'Action', headerAlign: 'center', sortable: false, renderCell: (param) => {

                    return (
                        <div>
                            <IconButton aria-label="view" sx={{
                                color: 'black',
                            }} onClick={() => handleCancelButton(param)}>
                                <DeleteIcon/>
                            </IconButton>
                            <Dialog
                                onClose={handleClose}
                                open={open}>
                                <BootstrapDialogTitle color='#006356' onClose={handleClose}>
                                    Cancel Information
                                </BootstrapDialogTitle>
                                <DialogContent>
                                    <Typography color='gray'>
                                        Do you really want to cancel your appointment during {slot} on {timeSlotDate}?
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        No,thanks
                                    </Button>
                                    <Button onClick={handleCancel}>
                                        YES
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )

                }
            },


        ]
    ;


    return (<div style={{height: 400, width: 500, textAlign: "center"}} className='My_Appointment_View_Position'>
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