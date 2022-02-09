import {DataGrid} from "@mui/x-data-grid";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {baseUrl} from "../../../../../contexts/RegisterContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import '../User_Active_Order_Style.css'
import {Link} from "@material-ui/core";
import {useFetchData} from "../../../ReusedMethod/fetchData";
import Dialog from "@mui/material/Dialog";
import {BootstrapDialogTitle} from "../../../ReusedMethod/BootstrapDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const USER_ACTIVE_ORDER_VIEW = () => {
    const [loginUser, setLoginUser] = useState(() => {
        const saved = localStorage.getItem("user")
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })
    const activeOrderApi = "/orders/getUserActiveOrders";
    const {rows, setRows} = useFetchData('GET', loginUser, activeOrderApi)
    const [open, setOpen] = useState(false);
    const [param, setParam] = useState();
    const [id, setId] = useState();
    const navigate = useNavigate()

    const handleCancelButton = (param) => {
        if (!handleCancelButtonColor(param)) {
            alert("you can not delete the confirmed order")
            return
        }
        setOpen(true);
        setParam(param)
        setId(param.id)

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        navigate('/active_order')
    }

    const handleCancel = () => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.orderId === id))
        let orderId = waitedCancelData[0].orderId

        const post = {orderId};
        let token = loginUser.token


        fetch(baseUrl + "/orders/deleteOrder", {
            method: 'POST', headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }, body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            let message = responseJson.message;

            if (message === "succeed") {
                let newData = (rows.data.filter((rowData) => rowData.orderId !== id))
                setRows(rows => ({...rows, data: newData}))
                handleConfirm()
                window.location.reload()
            } else {
                alert(message);

            }

        })


    }
    const handleCancelButtonColor = (param) => {
        let waitedCancelData = (rows.data.filter((rowData) => rowData.orderId === param.id))
        let status = waitedCancelData[0].orderStatus
        console.log(status)
        return status === 'PENDING';

    }

    const columns = [
        {field: 'orderId', headerName: 'id', width: 70, headerAlign: 'center'},
        {field: 'itemName', headerName: 'Article', width: 100, headerAlign: 'center'},
        {field: 'amount', headerName: 'Amount', width: 130, headerAlign: 'center'},
        {field: 'contactEmail', headerName: 'Contact', width: 300, headerAlign: 'center'},
        {
            field: 'itemLink', headerName: 'Link', width: 500, headerAlign: 'center', renderCell: (param) => (
                <>

                    <Link href={handleLink(param)} target="_blank" color="inherit">
                        {handleLink(param)}
                    </Link>
                </>),
        },
        {field: 'orderStatus', headerName: 'Status', width: 130, headerAlign: 'center'},
        {
            field: 'action', headerName: 'Action', sortable: false, renderCell: (param) => {
                return (
                    <div>


                        <IconButton aria-label="view" sx={{
                            color: handleCancelButtonColor(param) ? 'black' : 'grey'
                        }} onClick={() => handleCancelButton(param)}>
                            <DeleteIcon/>
                        </IconButton>
                        <Dialog
                            onClose={handleClose}
                            open={open}>
                            <BootstrapDialogTitle color='#006356' onClose={handleClose}>
                                Cancel Information
                            </BootstrapDialogTitle>
                            <DialogContent>
                                <Typography color='red'>
                                    Do you want to cancel the order {id} ?
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>
                                    No,thanks
                                </Button>
                                <Button onClick={handleCancel}>
                                    Confirm
                                </Button>


                            </DialogActions>
                        </Dialog>
                    </div>
                )
            },
        },

    ];


    const handleLink = (user) => {
        let waitedData = (rows.data.filter((rowData) => rowData.orderId === user.id))
        return waitedData[0].itemLink;
    }

    console.log(rows)

    return (


        <div style={{height: 800, width: '80%'}} className='form_active_order_page_position'>


            <Typography variant="h4" display="block" align='center' sx={{
                color: '#009682'
            }} gutterBottom>
                Below is a view of active orders for you.
            </Typography>
            <DataGrid rows={rows.data} columns={columns} pageSize={10} rowHeight={150}
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
    )
        ;
}

export default USER_ACTIVE_ORDER_VIEW