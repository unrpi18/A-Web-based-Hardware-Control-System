import {Link} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {DataGrid} from "@mui/x-data-grid";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import {useNavigate} from "react-router";

const USER_PAST_ORDER_VIEW = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);


    const useFetch = () => {
        const navigate = useNavigate();

        let email = loginUser.email
        const [rows, setRows] = useState([]);
        const post = {email}

        console.log(post)
        useEffect(() => {
            fetch(baseUrl + "/orders/getUserPastOrders", {
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

    const {rows, setRows} = useFetch();

    const columns = [
        {field: 'orderId', headerName: 'id', width: 70, headerAlign: 'center', hide: 'true'},
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
        {field: 'orderStatus', headerName: 'Status', width: 300, headerAlign: 'center'},

    ];

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
                Below is a view of past orders for you.
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

export default USER_PAST_ORDER_VIEW