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
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import {Dialog} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {url} from "../Navi_base"
import DialogActions from "@mui/material/DialogActions";
import {UserContext} from "../../../contexts/RegisterContext";
import Typography from "@mui/material/Typography";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from "@mui/material/Stack";
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField";
import tablePaginationActions from "../Component/Table_Control";
import {useNavigate} from "react-router";

const no_data = [createData(0, 'N/A', 'N/A', 'N/A')];
const loading= [createData(0,'loading', 'loading', 'loading')];



function createData(id, first_name, last_name, email) {
    return {id, first_name, last_name, email };
}


export default function NEW_USER_MANAGEMENT_TABLE() {
    const {loginUser, setLoginUser} = useContext(UserContext);
    const [token, setToken] = useState((loginUser === null)? null : loginUser.token );
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [display_data, setDisplay_data] = useState(no_data);
    const [fetched_data, setFetched_data] = useState(no_data)
    const [filter_open, setFilter_open] = useState(false);
    const [filter_keyword, setFilter_keyword] = useState('');
    const navigate = useNavigate();



    // global methods
    useEffect(() => {
        refreshPage();
    }, [])
    function refreshPage(){
        fetch(url + '/users/getAllAccountToBeConfirmed', {
            mode : 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token)
                if(data.length === 0){
                    setDisplay_data(no_data);
                }else{
                    let standardisedData = [];
                    for(let i = 0; i < data.length; i++){
                        standardisedData[i] = createData(i, data[i].firstName, data[i].lastName, data[i].email);
                    }
                    setFetched_data(standardisedData);
                    setDisplay_data(standardisedData);
                }
            }
            else if(resultCode === 500){
                window.sessionStorage.clear();
                alert(errorMessage);
            }
            else {
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage);
                navigate('/');
            }

        })
    }

    // methods and functions for filtering
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
                if(fetched_data[i].first_name.toString().includes(keyword)
                    || fetched_data[i].last_name.toString().includes(keyword)
                    || fetched_data[i].email.toString().includes(keyword)){
                    filteredData[count] = fetched_data[i];
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
    function handleFilter_open(){
        setFilter_open(true);
    }
    function handleFilter_close(){
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
                        placeholder={"eg : name/email"}
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
    const filter_keywordOnchange =(e)=>{
        setFilter_keyword(e.target.value);
    }

    // functions for auditing registration requests
    function handleOpen(first_name, last_name, email){
        setFirst_name(first_name);
        setLast_name(last_name);
        setEmail(email);
        setOpen(true);
    }
    const handleClose =()=>{
        setOpen(false);
        setFirst_name('');
        setLast_name('');
        setEmail('');
    }
    function handleAudit(command){
        const post = {email};
        const prefix_url = command === 'approve' ? '/users/confirmUserRegistration' : '/users/rejectUserRegistration'
        console.log(post);
        fetch(url + prefix_url, {
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
            if(resultCode === 200|| resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage)
            }
            else {
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage);
                navigate('/');
            }
            refreshPage();
        })

        handleClose();
    }

    function audit_dialog(){
        return(
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Registration Request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body" display="block" gutterBottom>
                            {display_msg}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Close</Button>
                    <Button onClick={()=>handleAudit('reject')}>Reject</Button>
                    <Button onClick={()=>handleAudit('approve')}>Approve</Button>
                </DialogActions>
            </Dialog>
        )
    }


    // Avoid a layout jump when reaching the last page with empty rows.
    function emptyRows(){
        if(rows.length < rowsPerPage){
            return rowsPerPage-rows.length;
        }
        else if((1 + page) * rowsPerPage - rows.length > 0){
            return (1 + page) * rowsPerPage - rows.length > 0
        }
        else {
            return 0;
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // table for data
    let rows = display_data;
    const display_msg = 'Do you want to approve or reject the registration request of ' + first_name + ' ' + last_name + '[' + email + '] ?'
    const table_title = 'All Registration Requests'
    function table(){
        if(display_data === null) {
            rows = loading;
        }
        return(
        <TableContainer component={Paper} style={{height : "60vh", width : "40vw"}}>
            <Table style={{height : "60vh", width : "40vw"}} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((row) => (
                        <TableRow  key={row.id}>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center" component="th" scope="row">
                                {row.first_name}
                            </TableCell>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                {row.last_name}
                            </TableCell>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                {row.email}
                            </TableCell>
                            <TableCell style={{ width: "1vw" , height : 53}} align="center">
                                <IconButton aria-label="view"
                                            disabled={rows[row.id].first_name === 'N/A' || rows[row.id].first_name === 'loading'}
                                            onClick={()=>handleOpen(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
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

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h4" display="block" gutterBottom>
                    {table_title}
                </Typography>
                {table()}
            </Stack>
            {filterDialog}
            {audit_dialog()}
        </div>

    );
}