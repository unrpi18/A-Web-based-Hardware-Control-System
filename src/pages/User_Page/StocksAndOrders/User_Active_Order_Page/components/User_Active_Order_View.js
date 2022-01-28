import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const useFetch = () => {
    const navigate = useNavigate();
    const {loginUser, setLoginUser} = useContext(UserContext);
    let email = loginUser.email
    const [rows, setRows] = useState([]);
    const post = {email}

    console.log(post)
    useEffect(() => {
        fetch(baseUrl + "/orders/getUserActiveOrders", {
            method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson.data)
            let message = responseJson.message;
            if (message === "SUCCESS") {
                console.log(responseJson.data)

                setRows(rows => ({...rows, data: responseJson.data}))
            } else {
                alert(message);

            }

        }).catch(error => console.error(error))
    }, []);

    return {rows, setRows};
}

export function USER_ACTIVE_ORDER_VIEW() {

    const columns = [
        {field: 'orderId', headerName: 'id', width: 70, headerAlign: 'center'},
        {field: 'itemName', headerName: 'Article', width: 70, headerAlign: 'center'},
        {field: 'amount', headerName: 'Amount', width: 130, headerAlign: 'center'},
        {field: 'contactEmail', headerName: 'Contact', width: 300, headerAlign: 'center'},
        {field: 'itemLink', headerName: 'Link', width: 800, headerAlign: 'center'},
        {field: 'orderStatus', headerName: 'Status', width: 130, headerAlign: 'center'},
        {
            field: 'action', headerName: 'Action', sortable: false, renderCell: (param) => (<>

                <IconButton aria-label="view" sx={{
                    color: 'black',
                }} onClick={() => handleCancel(param)}>
                    <DeleteIcon/>
                </IconButton>
            </>),
        },
    ];
    const handleCancel = (user) => {
        console.log(user.id)
    }


    const {rows, setRows} = useFetch();

    console.log(rows)
    return (
        <div style={{height: 500, width: '70%'}} className='view_position'>


            <Typography variant="h4" display="block" align='center' sx={{
                color: '#009682'
            }} gutterBottom>
                Below is a view of active orders for you.
            </Typography>
            <DataGrid rows={rows.data} columns={columns} pageSize={5}
                      id='orderId'
                      sx={{
                          boxShadow: 2,
                          border: 2,
                          borderColor: '#009682',
                          '& .MuiDataGrid-cell:hover': {
                              color: 'primary.secondary',
                          },
                          rowHeight:60,
                      }}
                      autoHeight={true}
            />

        </div>
    );
}

export default USER_ACTIVE_ORDER_VIEW