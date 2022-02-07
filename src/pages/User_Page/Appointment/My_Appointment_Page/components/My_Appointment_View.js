import Button from '@mui/material/Button';
import {DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext, useEffect, useState} from "react";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import {useNavigate} from "react-router";
import '../My_Appointment_Page_Style.css'
import Typography from "@mui/material/Typography";

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


const useFetchData = () => {
    const navigate = useNavigate();
    const {loginUser, setLoginUser} = useContext(UserContext);
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
            console.log(":go")
            let message = responseJson.message;

            if (message === "SUCCESS") {
                console.log(responseJson)
                console.log(responseJson.data)

                setRows(rows => ({...rows, data: responseJson.data}))
                console.log(responseJson.data.length)

            } else {
                alert(message);

            }

        }).catch(error => console.error(error))
    }, []);

    return {rows, setRows};
}


const MY_APPOINTMENT_VIEW = () => {

    const columns = [{
        field: 'timeSlotId',
        headerName: 'slot id',
        width: 70,
        headerAlign: 'center',
        hide: 'true'
    }, {field: 'slot', headerName: 'Time Slot', width: 130, headerAlign: 'center'}, {
        field: 'timeSlotDate',
        headerName: 'Date',
        width: 130,
        headerAlign: 'center'
    },

        {field: 'timeSlotStatus', headerName: 'Status', width: 130, headerAlign: 'center'}, {
            field: 'action', headerName: 'Action', sortable: false, renderCell: (param) => (<>

                <IconButton aria-label="view" sx={{
                    color: 'black',
                }} onClick={() => handleCancel(param)}>
                    <DeleteIcon/>
                </IconButton>
            </>),
        },

    ];


    const {rows, setRows} = useFetchData()

    const handleCancel = (user) => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.timeSlotId === user.id))
        let date = waitedCancelData[0].timeSlotDate
        let slot = waitedCancelData[0].slot

        const post = {date, slot};
        fetch(baseUrl + "/appointments/deleteAppointmentByDate", {
            method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            let message = responseJson.message;

            if (message === "SUCCESS") {
                let newData = (rows.data.filter((rowData) => rowData.timeSlotId !== user.id))
                setRows(rows => ({...rows, data: newData}))


            } else {
                alert(message);

            }

        })

    }


    return (<div style={{height: 400, width: '50%', textAlign: "center"}} className='view_position'>
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

                      },
                  }}

                  getRowId={row => row.timeSlotId}

        />
    </div>);
}

export default MY_APPOINTMENT_VIEW