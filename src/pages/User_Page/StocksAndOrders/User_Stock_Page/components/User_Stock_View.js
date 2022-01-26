import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {baseUrl} from "../../../../../contexts/RegisterContext";


const useFetch = () => {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch(baseUrl + "/stocks/getAllItems", {
            method: 'GET', headers: {"Content-Type": "application/json"}
        }).then(response => response.json()).then(responseJson => {

            let message = responseJson.message;
            if (message === "SUCCESS") {
                console.log(responseJson.data)

                setRows(rows => ({...rows, data: responseJson.data}))
            } else {
                alert(message);

            }

        })
    }, []);

    return {rows, setRows};
}

export function USER_STOCK_VIEW() {
    const columns: GridColDef[] = [{
        field: 'itemName',
        headerName: 'Article',
        width: 70,
        headerAlign: 'center'
    },
        {field: 'amount', headerName: 'Amount', width: 130, headerAlign: 'center'},
        {
            field: 'link',
            headerName: 'Link',
            width: 130,
            headerAlign: 'center'
        },];

    const {rows, setRows} = useFetch();


    return (<div
        style={{
            height: 400, width: '40%',

        }} className='view_position'>
        <Typography variant="h4" display="block" align='center' sx={{
            color: '#009682'
        }} gutterBottom>
            Stock View
        </Typography>
        <DataGrid rows={rows.data} columns={columns} pageSize={5}
                  id='itemName'
                  sx={{

                      boxShadow: 2, border: 2, borderColor: '#009682', '& .MuiDataGrid-cell:hover': {
                          color: 'primary.secondary',
                      },
                  }}
                  getRowId={row => row.itemName}
        />

    </div>);
}

export default USER_STOCK_VIEW