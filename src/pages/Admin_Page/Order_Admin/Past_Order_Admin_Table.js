import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import TableHead from "@mui/material/TableHead";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import tablePaginationActions from "../Component/Table_Control";
import {url} from "../Navi_base"
import {useNavigate} from "react-router";
import {Dialog, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
const loading= [createData(0,'loading','loading', 'loading', 'loading','loading', 'loading'),];
const no_data= [createData(0,'','', '', '','', ''),];

function createData(id,order_id, item, amount, link, name, email) {
    return {id, order_id, item, amount, link, name, email};
}


export default function PAST_ORDER_ADMIN_TABLE() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter_keyword, setFilter_keyword] = useState('')
    const [filter_open, setFilter_open] = useState(false)
    const [fetched_data, setFetched_data] = useState(loading);
    const [display_data, setDisplay_data] = useState(loading);
    const navigate = useNavigate();

    const table_title = 'All Past Orders'
    let rows = display_data;

    useEffect(() => {
        refreshPage();
    }, [])

    function refreshPage() {
        fetch(url + '/orders/getAllPastOrders', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if (resultCode === 200) {
                window.sessionStorage.setItem('token', responseJson.token)
                let standardisedData = [];
                for (let i = 0; i < data.length; i++) {
                    standardisedData[i] = createData(i, data[i].orderId,data[i].itemName, data[i].amount, data[i].itemLink, data[i].userName, data[i].userEmail);
                }
                setDisplay_data(standardisedData);
                setFetched_data(standardisedData);
            } else if(resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage);
            } else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }

        }).catch(error =>{throw(error)})
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
                    || fetched_data[i].name.toString().includes(keyword))
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
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
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
                                colSpan={6}
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
            {filterDialog()}
        </div>

    )
}
