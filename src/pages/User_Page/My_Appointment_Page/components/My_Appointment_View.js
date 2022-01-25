import Button from '@mui/material/Button';
import {DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext, useEffect, useState} from "react";
import {baseUrl, UserContext} from "../../../../contexts/RegisterContext";
import {useNavigate} from "react-router";
import {Label} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import '../My_Appointment_Page_Style.css'
import {TextField} from "@material-ui/core";
import Typography from "@mui/material/Typography";


const handleCancel = () => {

}
const columns: GridColDef[] = [
    {field: 'timeSlotId', headerName: 'ID', width: 70, headerAlign: 'center'},
    {field: 'slot', headerName: 'Time Slot', width: 130, headerAlign: 'center'},
    {field: 'timeSlotDate', headerName: 'Date', width: 130, headerAlign: 'center'},
    {field: 'timeSlotStatus', headerName: 'Status', width: 130, headerAlign: 'center'},
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
                api
                    .getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                    )
                return alert(JSON.stringify(thisRow, null, 4));
            };

            return <IconButton aria-label="view" sx={{
                color: 'red',

            }
            } onClick={onClick}>
                <DeleteIcon/>
            </IconButton>
        },
    },
];


const useFetchData = () => {
    const navigate = useNavigate();
    const {loginUser, setLoginUser} = useContext(UserContext);
    const initialRows = {
            data: [{
                id: '1',
                slot: '',
                timeSlotDate: '',
            }],
        }
    ;
    const [fetchData, setFetchData] = useState([]);
    const [rows, setRows] = useState(initialRows);
    let email = "SiyannLi@outlook.com";
    const post = {email};


    useEffect(() => {
        fetch("http://5e78-2a02-3038-409-64a-51b4-5d88-5c19-e137.ngrok.io/appointments/getUserAppointmentsWithEmail", {
            method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {


            let message = responseJson.message;
            console.log(message);

            if (message === "SUCCESS") {
                console.log("test")
                console.log(responseJson.data)
                setFetchData(responseJson.data);
                setRows(rows => ({...rows, data: fetchData}))


            } else {
                alert(message);

            }

        })
    }, [rows]);

    return {rows, setRows};
}
const faker = [
    {id: 1, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 2, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 3, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 4, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 5, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},

];


export function MY_APPOINTMENT_VIEW() {
    //  const {rows, setRows} = useFetchData();
    //  let rows3 = rows;
    //  console.log(rows3);
    console.log(faker);
    return (
        <div style={{height: 400, width: '40%'}} className='view_position'>


            <Typography variant="h4" display="block" align='center' sx={{
                color: '#009682'
            }} gutterBottom>
                My Appointment
            </Typography>
            <DataGrid rows={faker} columns={columns} pageSize={5}
                      id="timeSlotId"
                      sx={{

                          boxShadow: 2,
                          border: 2,
                          borderColor: '#009682',
                          '& .MuiDataGrid-cell:hover': {
                              color: 'primary.secondary',
                          },
                      }}
            />

        </div>
    );
}

export default MY_APPOINTMENT_VIEW