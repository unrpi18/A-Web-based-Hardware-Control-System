import {DataGrid} from "@mui/x-data-grid";
import React, { useState} from "react";
import Typography from "@mui/material/Typography";
import {useFetchData} from "../../../ReusedMethod/fetchData";
import '../User_Stock_Page_Style.css'

const USER_STOCK_VIEW = () => {
    const [loginUser, setLoginUser] = useState(() => {
        const saved = localStorage.getItem("user")
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })

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
            field: 'description', headerName: 'Description', width: 600, headerAlign: 'center'
        },
    ];



    return (<div
        style={{
            height: 400, width: '60%',

        }} className='User_Stock_View_Position'>
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