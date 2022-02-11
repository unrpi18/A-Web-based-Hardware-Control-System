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
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {url} from "../Navi_base"
import FilterListIcon from "@mui/icons-material/FilterList";
import {useNavigate} from "react-router";
import tablePaginationActions from "../Component/Table_Control";

const loading = [createData(0, 'loading', 'loading', 'loading', 'loading')]
const no_data= [createData(0,'N/A', 'N/A', 'N/A', 'N/A')];


function createData(id, first_name, last_name, email, access) {
    return {id, first_name, last_name, email, access };
}


export default function USER_MANAGEMENT_TABLE() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [access, setAccess] = useState('');
    const [display_data, setDisplay_data] = useState(null);
    const [fetched_data, setFetched_data] = useState(no_data)
    const [filter_open, setFilter_open] = useState(false);
    const [filter_keyword, setFilter_keyword] = useState('');
    let rows = display_data;
    const navigate = useNavigate();

    const first_nameOnchange =(e)=>{
        setFirst_name(e.target.value);
    }
    const last_nameOnchange =(e)=>{
        setLast_name(e.target.value);
    }
    const accessOnchange =(e)=>{
        setAccess(e.target.value);
    }
    const filter_keywordOnchange =(e)=>{
        setFilter_keyword(e.target.value);
    }
    useEffect(() => {
        refreshPage();
    }, [])

    function refreshPage(){
        setDisplay_data(loading);
        setFetched_data(loading);
        fetch(url +'/users/getAllUsers', {
            method: 'GET',
            mode : 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            }
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token)
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createData(i, data[i].firstName, data[i].lastName, data[i].email, data[i].userAccountStatus);
                }
                setDisplay_data(standardisedData);
                setFetched_data(standardisedData);
            }
            else if(resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage);
            }else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }
        })
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
                if(fetched_data[i].first_name.toString().includes(keyword)
                    || fetched_data[i].last_name.toString().includes(keyword)
                    || fetched_data[i].email.toString().includes(keyword)){
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
    function handleFilter_open(){
        setFilter_open(true);
    }
    function handleFilter_close(){
        setFilter_open(false);
    }
    function handleOpen(first_name, last_name, email, access){
        setFirst_name(first_name);
        setLast_name(last_name);
        setEmail(email);
        setAccess(access)
        setOpen(true);
    }
    const handleClose =()=>{
        setOpen(false);
        setFirst_name('');
        setLast_name('');
        setEmail('');
    }

    const handleSave =() =>{
        const lastName = last_name;
        const firstName = first_name;
        const userStatus = access;
        const post = {email, lastName,firstName,userStatus};
        fetch(url + '/users/resetUserInfo', {
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
            if(resultCode === 200 || resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            }
            else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }
            refreshPage();
        })

        handleClose();

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
    function deleteDialog(){
        return(
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="ln"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        value ={last_name}
                        defaultValue={last_name}
                        onChange={last_nameOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="fn"
                        label="First Name"
                        fullWidth
                        variant="standard"
                        value ={first_name}
                        defaultValue={first_name}
                        onChange={first_nameOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        fullWidth
                        variant="standard"
                        disabled
                        defaultValue={email}
                    />
                    <Box sx={{ mt : '2vh' ,minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="time_slot_book_label">Access</InputLabel>
                            <Select
                                labelId="time_slot_book_select_label"
                                id="select_time_slot"
                                value={access}
                                label="Status"
                                onChange={accessOnchange}
                                placeholder={access}
                            >
                                <MenuItem value={'active'}>Active</MenuItem>
                                <MenuItem value={'inactive'}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function table(){
        if(display_data === null) {
            rows = no_data;
        }
        return (
        <TableContainer component={Paper} style={{height : "60vh", width : "40vw"}}>
            <Table  aria-label="custom pagination table" style={{height : "60vh", width : "40vw"}}>
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
                                {row.last_name}
                            </TableCell>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                {row.first_name}
                            </TableCell>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                {row.email}
                            </TableCell>
                            <TableCell style={{ width: "1vw", height : 53 }} align="center">
                                {display_data === no_data ? row.email :
                                (<IconButton aria-label="view"
                                            disabled={rows[0].last_name === 'N/A'}
                                            onClick={()=>handleOpen(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email, rows[row.id].access)}>
                                    <VisibilityIcon />
                                </IconButton>)}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={4} />
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
                            colSpan={4}
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

    const applyFilter=() => {
        filterData(filter_keyword);
        handleFilter_close();
    }
    const resetFilter=()=>{
        filterData('');
        handleFilter_close();
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
    const table_title = 'All Users'
    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h4" display="block" gutterBottom>
                    {table_title}
                </Typography>
                {table()}
            </Stack>
            {filterDialog()}
            {deleteDialog()}
            {}
        </div>

    );
}