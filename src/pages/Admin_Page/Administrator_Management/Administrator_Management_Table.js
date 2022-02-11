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
import React, {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Stack from "@mui/material/Stack";
import DialogContentText from "@mui/material/DialogContentText";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {url} from "../Navi_base"
import {Autocomplete} from "@mui/lab";
import FilterListIcon from "@mui/icons-material/FilterList";
import tablePaginationActions from "../Component/Table_Control";
import {useNavigate} from "react-router";

// default data by loading / no admins
const no_data = [createData(0, '', '', '')];
const loading = [createData(0, 'loading', 'loading', 'loading')]
const user_no_data = [createUserData(0, 'N/A')]

/**
 * generate a datum which contains the profile of an administrator
 * @param id automatic generated ID
 * @param first_name first name of the admin
 * @param last_name last name of the admin
 * @param email email of the admin
 * @returns {{last_name, id, first_name, email}} datum which contains the profile of an admin
 */
function createData(id, first_name, last_name, email) {
    return {id, first_name, last_name, email };
}

/**
 * method for converting fetched user data into options in autocomplete when adding new admin
 * @param id automatic generated ID
 * @param entry email of a user
 * @returns {{entry, id}} options containing the email of a user
 */
function createUserData(id, entry){
    return {id, entry};
}

export default function ADMINISTRATOR_MANAGEMENT_TABLE() {
    //state var
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [add_open, setAdd_open] = useState(false);
    const [display_data, setDisplay_data] = useState(no_data);
    const [fetched_data, setFetched_data] = useState(no_data)
    const [filter_open, setFilter_open] = useState(false);
    const [filter_keyword, setFilter_keyword] = useState('');
    const [user_data, setUser_data] = useState(user_no_data);
    const navigate = useNavigate();

    //Global functions
    useEffect(() => {
        refreshPage();
    }, [])

    function fetchUser(){
        fetch(url + '/users/getAllUsers', {
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
                window.sessionStorage.setItem('token', responseJson.token);
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createUserData(i, data[i].email);
                }
                setUser_data(standardisedData);
            }
            else if(resultCode === 402){
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/')
            } else {
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            }

        }).catch(error =>{throw(error)})
    }
    function refreshPage(){
        setDisplay_data(loading);
        setFetched_data(loading);
        fetch(url + '/users/getAllAdministrator', {
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
                window.sessionStorage.setItem('token', responseJson.token);
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createData(i, data[i].firstName, data[i].lastName, data[i].email);
                }
                setFetched_data(standardisedData);
                setDisplay_data(standardisedData);
            }
            else if(resultCode === 402){
                window.sessionStorage.clear();
                alert(errorMessage);
            } else {
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage)
            }
        }).then(fetchUser).catch(error =>{throw(error)})

    }

    // Remove Admin relevant methods
    const display_msg = 'Do you want to remove the administrator access of ' + first_name + ' ' + last_name + '[' + email + '] ?'
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
    function deleteDialog(){
        return(
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Remove Administrator</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {display_msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleConfirm}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }
    const handleConfirm =() =>{
        const post = {email};
        fetch(url + '/users/revokeAdmin', {
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
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            }
            else if(resultCode === 402){
                window.sessionStorage.clear();
                alert(errorMessage);
            } else {
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage)
            }
            refreshPage();
        }).catch(error =>{throw(error)})

        handleClose();

    }

    //Add Admin relevant methods
    function handleAddOpen(){
        setAdd_open(true);
    }
    function handleAddClose(){
        setAdd_open(false);
    }
    function handleAdd(){
        const post = {email};
        fetch(url + '/users/insertAdmin', {
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
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            }
            else if(resultCode === 402){
                window.sessionStorage.clear();
                alert(errorMessage);
            } else {
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage)
            }
            refreshPage();
        }).catch(error =>{throw(error)})

        handleAddClose();
    }
    function addDialog(){
        return(
            <Dialog open={add_open} onClose={handleAddClose} fullWidth>
                <DialogTitle>Add Administrator</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={user_data.map((option) => option.entry)}
                        renderInput={(params) => <TextField {...params} label="Email" />}
                        value={email}
                        onChange={(event, newEmail) => {
                            setEmail(newEmail);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Close</Button>
                    <Button onClick={handleAdd}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }

    // Filter function relevant methods
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

    // Page Settings
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

    //Table which serve as the vessel of data display
    function table_title(){
        return(
            <Typography variant="h4" display="block" gutterBottom>
                All Administrators
            </Typography>
            )
    }
    let rows = display_data;
    function table(){
        if(display_data === null){
            rows = no_data;
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
                                    {row.last_name}
                                </TableCell>
                                <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                    {row.first_name}
                                </TableCell>
                                <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{ width: "1vw", height : 53 }} align="center">
                                    {display_data === no_data ? row.email:
                                    (<IconButton aria-label="view"
                                                disabled={rows[row.id].first_name === 'N/A' || rows[row.id].email === 'teco@teco.com'}
                                                onClick={()=>handleOpen(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email)}>
                                        <PersonRemoveIcon />
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
                        <TableRow >
                            <IconButton aria-label="view" size="large" onClick={handleAddOpen}>
                                <PersonAddIcon />
                            </IconButton>
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


    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                {table_title()}
                {table()}
            </Stack>
            {deleteDialog()}
            {addDialog()}
            {filterDialog()}
        </div>

    );
}