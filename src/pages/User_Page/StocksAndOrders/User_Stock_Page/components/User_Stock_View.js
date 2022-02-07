import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import {useFetchData} from "../../../ReusedMethod/fetchData";
import {useRefreshControlGet, useRefreshControlSet} from "../../../ReusedMethod/storeDataPersistance";

const USER_STOCK_VIEW = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);

    const stockViewApi = "/stocks/userGetAllItems"
    const {rows, setRows} = useFetchData('GET', loginUser, stockViewApi)


    const columns = [
        {
            field: 'itemName', headerName: 'Article', width: 150, headerAlign: 'center'
        },
        {
            field: 'amount', headerName: 'Amount', width: 130, headerAlign: 'center'
        },
        {
            field: 'description', headerName: 'Description', width: 500, headerAlign: 'center'
        },
    ];



    return (<div
        style={{
            height: 400, width: '45%',

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
                      '& .MuiDataGrid-cell': {
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          lineHeight: 1,
                          height: 50,
                          zeroMinWidth: 500,
                          alignItems: 'center',
                          justifyContent: "center"
                      }
                  }}
                  getRowId={row => row.itemName}
        />

    </div>);
}

export default USER_STOCK_VIEW