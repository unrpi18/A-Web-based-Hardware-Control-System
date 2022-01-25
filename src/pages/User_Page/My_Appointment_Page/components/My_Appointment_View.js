import Button from '@mui/material/Button';
import {DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext, useState} from "react";
import {baseUrl, UserContext} from "../../../../contexts/RegisterContext";
import {useNavigate} from "react-router";


const handleCancel = () => {

}
const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'timeslot', headerName: 'Time Slot', width: 130},
    {field: 'date', headerName: 'Date', width: 130},
    {field: 'weekday', headerName: 'Weekday', width: 90,},
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

            return <IconButton aria-label="view" onClick={onClick}>
                <DeleteIcon/>
            </IconButton>
        },
    },
];

const rows2 = [
    {id: 1, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 2, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 3, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 4, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},
    {id: 5, timeslot: '08:00-10:00', date: '2022-10-22', weekday: 'wednesday'},

];

const MY_APPOINTMENT_VIEW = () => {
    const navigate = useNavigate();
    const {loginUser, setLoginUser} = useContext(UserContext);
    const initialRows = [{id: 1, timeslot: '', date: '', weekday: ''}];

    const [rows, setRows] = useState(initialRows);
    const fetchData = () => {
        const post = loginUser.email;
        fetch(baseUrl + "url", {
            method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(loginUser.email)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);

            let message = responseJson.message;
            console.log(message);

            if (message === "SUCCESS") {
                setRows([...rows], responseJson);
            } else {
                alert(message);
            }

        })
    }
    return (
        <div style={{height: 400, width: '40%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={5}/>
        </div>
    );
}
export default MY_APPOINTMENT_VIEW