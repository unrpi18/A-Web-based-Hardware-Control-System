import * as React from 'react';
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
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import {Dialog, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FlakyIcon from '@mui/icons-material/Flaky';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import tablePaginationActions from "../Component/Table_Control";
import {url} from "../Navi_base"
import {useNavigate} from "react-router";
import FilterListIcon from "@mui/icons-material/FilterList";
import LinkIcon from "@mui/icons-material/Link";
const loading= [createData(0,'loading','loading', 'loading', 'loading','loading', 'loading', 'loading'),];
const stocksLoading = [createItemsData(0,'loading','loading', 'loading')];
const no_data = [createData(0,'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A')]



function createData(id,order_id, item, amount, link, name, email, status) {
    return {id, order_id, item, amount, link, name, email, status};
}

function createItemsData (id, item, amount, link){
    return {id, item, amount, link};
}


export default function ACTIVE_ORDER_ADMIN_TABLE() {
    const [filter_keyword, setFilter_keyword] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [order_id, setOrder_id] = useState('');
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [fetched_data, setFetched_data] = useState(loading);
    const [display_data, setDisplay_data] = useState(loading);
    const [items_in_stock, setItems_In_stock] = useState('');
    const [filter_open, setFilter_open] = useState(false);
    const [audit_open, setAudit_open] = useState(false);
    const [instock_open, setInstock_open] = useState(false);
    const [all_stock_data, setAll_stock_data] = useState(stocksLoading);
    const navigate = useNavigate();
    const table_title = 'All Active Orders'
    let rows = display_data;

    useEffect(() => {
        refreshPage()
    }, [])

    function refreshPage() {
        fetch(url + '/orders/getAllActiveOrders', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if (resultCode === 200) {
                window.sessionStorage.setItem('token', responseJson.token);
                if(data === null){
                    setDisplay_data(no_data);
                } else {
                    let standardisedData = [];
                    for (let i = 0; i < data.length; i++) {
                        standardisedData[i] = createData(i, data[i].orderId, data[i].itemName, data[i].amount, data[i].itemLink, data[i].userName, data[i].userEmail, data[i].orderStatus);
                    }
                    setDisplay_data(standardisedData);
                    setFetched_data(standardisedData);
                    allStockDataFetch();
                }

            } else if(resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            } else{
                window.sessionStorage.clear();
                alert(errorMessage)
                navigate('/')
            }

        })
    }

    function allStockDataFetch(){
        fetch(url +'/stocks/adminGetAllItems', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createItemsData(i, data[i].itemName, data[i].amount, data[i].link);
                }
                setAll_stock_data(standardisedData);
            }
            else if (resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            } else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
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
        fetch(url + '/orders/inStock', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            if (resultCode === 200 || resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage)
            }
            else{
                window.sessionStorage.clear();
                alert(errorMessage)
                navigate('/');
            }
            refreshPage();
        })


        handleInStockClose();
    }
    function handleSubmit(result) {
        const url_postfix = result === "Approve" ? '/orders/confirmOrder' : '/orders/rejectOrder';
        const orderId = order_id;
        const post ={orderId};
        fetch(url + url_postfix, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            if (resultCode === 200 || resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage)
            }
            else{
                window.sessionStorage.clear();
                alert(errorMessage)
                navigate('/');
            }
            refreshPage();
        })
        refreshPage();
        handleAuditClose();
    }

    //filter relevant methods
    function handleFilter_open(){
        setFilter_open(true);
    }
    const handleFilter_close =()=>{
        setFilter_open(false);
    }
    const applyFilter=() => {
        filterData(filter_keyword);
        handleFilter_close();
    }
    const resetFilter=()=>{
        filterData('');
        handleFilter_close();
    }
    function filterDialog(){
        return(
            <Dialog open={filter_open} onClose={handleFilter_close}>
                <DialogTitle>Filtering</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}

                        margin="dense"
                        id="rpt"
                        label="Keywords"
                        fullWidth
                        variant="standard"
                        value ={filter_keyword}
                        onChange={filter_keywordOnchange}
                        placeholder={"eg : first name/last name/email/date"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilter_close}>Close</Button>
                    <Button onClick={resetFilter}>Reset Filter</Button>
                    <Button onClick={applyFilter}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function filterData (keyword){
        setPage(0);
        if(keyword === ''){
            setFilter_keyword('');
            refreshPage();
        }
        else {
            let filteredData =[];
            let count = 0;
            for(let i = 0; i <fetched_data.length; i++){
                if(fetched_data[i].order_id.toString().includes(keyword)
                    || fetched_data[i].item.toString().includes(keyword)
                    || fetched_data[i].amount.toString().includes(keyword)
                    || fetched_data[i].email.toString().includes(keyword)
                    || fetched_data[i].name.toString().includes(keyword)
                    || fetched_data[i].status.toString().includes(keyword))
                {
                    filteredData[count] = fetched_data[i];
                    filteredData[count].id = count;
                    count ++;
                }
            }
            if(filteredData.length === 0){
                setDisplay_data(no_data);
            }
            else{
                setDisplay_data(filteredData);
            }
        }

    }
    const filter_keywordOnchange =(e)=>{
        setFilter_keyword(e.target.value);
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
                    <Button onClick={()=>handleInStockSubmit()}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function order_audit_dialog(){
        const display_msg = 'Do you want to approve or reject order :' + order_id + ' ?'
        return (
            <Dialog open={audit_open} onClose={handleAuditClose}>
                <DialogTitle>Order Audition</DialogTitle>
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
                                    <IconButton
                                        onClick={()=>window.open(row.link)}>
                                        <LinkIcon/>
                                    </IconButton>
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
                                                disabled={rows[row.id].item === 'loading' || rows[row.id].item === 'N/A'}
                                                onClick={() => handleAuditOpen(rows[row.id].order_id)}>
                                        <FlakyIcon/>
                                    </IconButton>
                                    :<IconButton aria-label="view"
                                                 disabled={rows[row.id].item === 'loading' || rows[row.id].item === 'N/A'}
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
                            <IconButton
                                onClick={()=>handleFilter_open()}>
                                <FilterListIcon />
                            </IconButton>
                            <TablePagination
                                rowsPerPageOptions={5}
                                colSpan={8}
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
            {filterDialog()}
        </div>

    )
}
