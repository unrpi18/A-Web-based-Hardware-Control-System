import {DataGrid, GridColDef} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";

export function USER_ACTIVE_ORDER_VIEW() {

    const columns: GridColDef[] = [
        {field: 'timeSlotId', headerName: 'Article', width: 70, headerAlign: 'center'},
        {field: 'slot', headerName: 'Amount', width: 130, headerAlign: 'center'},
    ];
    const fakerDataTest = [{
        timeSlotId: 12, slot: 1
    }]


    const [fakerData, setDFakerData] = useState(fakerDataTest);

    const handleCancel = (user) => {
        console.log(user.id)
        setDFakerData(fakerData.filter((faker) => faker.timeSlotId !== user.id));
    }

    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
    };
//    const {rows, setRows} = useFetchData();

    //  console.log(rows3);
    console.log(fakerDataTest);
    return (
        <div style={{height: 400, width: '50%'}} className='view_position'>


            <Typography variant="h4" display="block" align='center' sx={{
                color: '#009682'
            }} gutterBottom>
                Below is a view of active orders for you.
            </Typography>
            <DataGrid rows={fakerData} columns={columns} pageSize={5}
                      id='timeSlotId'
                      sx={{

                          boxShadow: 2,
                          border: 2,
                          borderColor: '#009682',
                          '& .MuiDataGrid-cell:hover': {
                              color: 'primary.secondary',
                          },
                      }}
                      getRowId={row => row.timeSlotId}
            />

        </div>
    );
}

export default USER_ACTIVE_ORDER_VIEW