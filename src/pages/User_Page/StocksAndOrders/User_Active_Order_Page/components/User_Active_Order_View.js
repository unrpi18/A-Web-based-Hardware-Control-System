import {DataGrid} from "@mui/x-data-grid";
import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import '../User_Active_Order_Style.css'
import {Link} from "@material-ui/core";
import {useFetchData} from "../../../ReusedMethod/fetchData";

const USER_ACTIVE_ORDER_VIEW = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);
    const activeOrderApi = "/orders/getUserActiveOrders";
    const {rows, setRows} = useFetchData('GET', loginUser, activeOrderApi)

    const columns = [
        {field: 'orderId', headerName: 'id', width: 70, headerAlign: 'center'},
        {field: 'itemName', headerName: 'Article', width: 100, headerAlign: 'center'},
        {field: 'amount', headerName: 'Amount', width: 130, headerAlign: 'center'},
        {field: 'contactEmail', headerName: 'Contact', width: 300, headerAlign: 'center'},
        {
            field: 'itemLink', headerName: 'Link', width: 500, headerAlign: 'center', renderCell: (param) => (
                <>

                    <Link href={handleLink(param)} color="inherit">
                        {handleLink(param)}
                    </Link>
                </>),
        },
        {field: 'orderStatus', headerName: 'Status', width: 130, headerAlign: 'center'},
        {
            field: 'action', headerName: 'Action', sortable: false, renderCell: (param) => (<>
                <IconButton aria-label="view" sx={{
                    color: handleCancelButtonColor(param) ? 'black' : 'grey'
                }} onClick={() => handleCancel(param)}>
                    <DeleteIcon/>
                </IconButton>
            </>),
        },

    ];
    const handleCancel = (user) => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.orderId === user.id))
        let orderId = waitedCancelData[0].orderId

        const post = {orderId};
        let token = loginUser.token
        console.log(token)
        if (handleCancelButtonColor(user)) {
            fetch(baseUrl + "/orders/deleteOrder", {
                method: 'POST', headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }, body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {

                let message = responseJson.message;

                if (message === "SUCCESS") {
                    let newData = (rows.data.filter((rowData) => rowData.orderId !== user.id))
                    setRows(rows => ({...rows, data: newData}))


                } else {
                    alert(message);

                }

            })
        } else {
            alert("you can not delete the confirmed order")
        }


    }

    const handleCancelButtonColor = (user) => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.orderId === user.id))
        let status = waitedCancelData[0].orderStatus
        console.log(status)
        return status === 'PENDING';

    }

    const handleLink = (user) => {
        let waitedData = (rows.data.filter((rowData) => rowData.orderId === user.id))
        return waitedData[0].itemLink;
    }

    console.log(rows)

    return (
        <div style={{height: 500, width: '80%'}} className='form_active_order_page_position'>


            <Typography variant="h4" display="block" align='center' sx={{
                color: '#009682'
            }} gutterBottom>
                Below is a view of active orders for you.
            </Typography>
            <DataGrid rows={rows.data} columns={columns} pageSize={5} rowHeight={150}
                      id='orderId'
                      sx={{
                          boxShadow: 2,
                          border: 2,
                          borderColor: '#009682',
                          '& .MuiDataGrid-cell:hover': {
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
                      getRowId={row => row.orderId}
            />

        </div>
    );
}

export default USER_ACTIVE_ORDER_VIEW