import {Link} from "@material-ui/core";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {DataGrid} from "@mui/x-data-grid";
import {useFetchData} from "../../../ReusedMethod/fetchData";

const USER_PAST_ORDER_VIEW = () => {
    const [loginUser, setLoginUser] = useState(() => {
        const saved = localStorage.getItem("user")
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })
    const pastOrderApi = "/orders/getUserPastOrders";
    const {rows, setRows} = useFetchData('GET', loginUser, pastOrderApi);

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