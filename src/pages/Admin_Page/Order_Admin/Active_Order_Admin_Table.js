import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import {Dialog, Link, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {UserContext} from "../../../contexts/RegisterContext";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FlakyIcon from '@mui/icons-material/Flaky';
import MergeTypeIcon from '@mui/icons-material/MergeType';

const url = 'http://a604-2a02-8071-22d4-5c00-8ce3-a41a-5eb4-628d.ngrok.io';
const loading= [createData(0,'loading','loading', 'loading', 'loading','loading', 'loading', 'loading'),];
const stocksLoading = [createItemsData(0,'loading','loading', 'loading')];
const no_data = [createData(0,'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A')]

function tablePaginationActions(props){
    const theme = useTheme;
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(id,order_id, item, amount, link, name, email, status) {
    return {id, order_id, item, amount, link, name, email, status};
}

function createItemsData (id, item, amount, link){
    return {id, item, amount, link};
}


export default function ACTIVE_ORDER_ADMIN_TABLE() {
    const {loginUser, setLoginUser} = useContext(UserContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [order_id, setOrder_id] = useState('');
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [display_data, setDisplay_data] = useState(loading);
    const [items_in_stock, setItems_In_stock] = useState('');
    const [audit_open, setAudit_open] = useState(false);
    const [instock_open, setInstock_open] = useState(false);
    const [all_stock_data, setAll_stock_data] = useState(stocksLoading);

    const table_title = 'All Active Orders'
    let rows = display_data;

    useEffect(() => {
        refreshPage();
        allStockDataFetch();
    }, [])

    function refreshPage() {
        const token = "001122";

        fetch(url + '/orders/getAllActiveOrders', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "001122"
            },
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if (resultCode === 200) {
                if(data.length === 0){
                    setDisplay_data(no_data);
                } else {
                    let standardisedData = [];
                    for (let i = 0; i < data.length; i++) {
                        standardisedData[i] = createData(i, data[i].orderId, data[i].itemName, data[i].amount, data[i].itemLink, data[i].userName, data[i].userEmail, data[i].orderStatus);
                    }
                    setDisplay_data(standardisedData);
                    allStockDataFetch();
                }

            } else {
                alert(errorMessage);
            }

        })
    }

    function allStockDataFetch(){
        fetch(url +'/stocks/getAllItems', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "001122"
            },
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;

            if(resultCode === 200){
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createItemsData(i, data[i].itemName, data[i].amount, data[i].link);
                }
                setAll_stock_data(standardisedData);

            }
            else{
                alert(errorMessage);
            }


        })
    }
    const itemInStockOnchange =(e)=>{
        setItems_In_stock(e.target.value);
    }
    function handleAuditOpen(order_id) {
        setOrder_id(order_id);
        setAudit_open(true);
    }

    const handleAuditClose = () => {
        setAudit_open(false);
        setOrder_id('');
    }

    function handleInStockOpen(order_id, amount, item){
        setItem(item);
        setAmount(amount);
        setOrder_id(order_id);
        setInstock_open(true);
    }
    const handleInStockClose = () => {
        setInstock_open(false);
        setItem('');
        setAmount('');

    }
    function handleInStockSubmit(){
        const orderId = order_id;
        const itemName = items_in_stock;
        const post = {orderId, itemName};
        console.log(post);
        fetch(url + '/orders/inStock', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "001122"
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            if (resultCode === 200){
                //TODO process data
            }
            else if( resultCode === 500){
                //TODO Alert but stay
            }
            else{
                //TODO illegal access, alert and leave
            }
        })

        refreshPage();
        handleInStockClose();
    }
    function handleSubmit(result) {
        const url_postfix = result === "Approve" ? '/orders/confirmOrder' : '/orders/rejectOrder';
        const orderId = order_id;
        const post ={orderId};
        console.log(post);
        fetch(url + url_postfix, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "001122"
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            if (resultCode === 200){
                //TODO process data
            }
            else if( resultCode === 500){
                //TODO Alert but stay
            }
            else{
                //TODO illegal access, alert and leave
            }
        })

        refreshPage();
        handleAuditClose();
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    function emptyRows() {
        if (rows.length < rowsPerPage) {
            return rowsPerPage - rows.length;
        } else if ((1 + page) * rowsPerPage - rows.length > 0) {
            return (1 + page) * rowsPerPage - rows.length > 0
        } else {
            return 0;
        }
    }
    function in_stock_dialog(){
        return (
            <Dialog open={instock_open} onClose={handleInStockClose}>
                <DialogTitle>Check items into stock</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="item"
                        label="Item in order"
                        fullWidth
                        disabled
                        variant="standard"
                        defaultValue={item}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="item"
                        label="Amount"
                        fullWidth
                        disabled
                        variant="standard"
                        defaultValue={amount}
                    />
                    <DialogContentText>
                        Please fill in the following form to check the items into stock
                    </DialogContentText>
                    <Box sx={{ mt : '2vh' ,minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="time_slot_book_label">Items in Stock*</InputLabel>
                            <Select
                                value={items_in_stock}
                                label="Items in stock"
                                onChange={itemInStockOnchange}
                                required
                            >
                            {all_stock_data.map((row)=>(
                            <MenuItem value={row.item}>{row.item}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInStockClose}> Close</Button>
                    <Button onClick={()=>handleInStockSubmit()}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function order_audit_dialog(){
        const display_msg = 'Do you want to approve or reject order :' + order_id + ' ?'
        return (
            <Dialog open={audit_open} onClose={handleAuditClose}>
                <DialogTitle>Registration Request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body" display="block" gutterBottom>
                            {display_msg}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAuditClose}> Close</Button>
                    <Button onClick={()=>handleSubmit("Reject")}>Reject</Button>
                    <Button onClick={()=>handleSubmit("Approve")}>Approve</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function table() {
        if (display_data === null) {
            rows = loading;
        }
        return (
            <TableContainer component={Paper} style={{height: "60vh", width: "70vw"}}>
                <Table style={{height: "60vh", width: "70vw"}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Order ID</TableCell>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Link</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{width: "5vw", height: 53}} align="center" component="th" scope="row">
                                    {row.order_id}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.item}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.amount}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    <Link href={row.link}>Link</Link>
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{width: "3vw", height: 53}} align="center">
                                    {row.status}
                                </TableCell>
                                <TableCell style={{width: "1vw", height: 53}} align="center">
                                    {rows[row.id].status === "PENDING"
                                    ?<IconButton aria-label="view"
                                                disabled={rows[row.id].item === 'loading'}
                                                onClick={() => handleAuditOpen(rows[row.id].order_id)}>
                                        <FlakyIcon/>
                                    </IconButton>
                                    :<IconButton aria-label="view"
                                                 disabled={rows[row.id].item === 'loading'}
                                                 onClick={() => handleInStockOpen(rows[row.id].order_id, rows[row.id].item, rows[row.id].amount)}>
                                    <MergeTypeIcon/>
                                </IconButton>}
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={8}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={5}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={tablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    }



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h4" display="block" gutterBottom>
                    {table_title}
                </Typography>
                {table()}
            </Stack>
            {order_audit_dialog()}
            {in_stock_dialog()}
        </div>

    )
}
