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
import {Dialog, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {UserContext} from "../../../contexts/RegisterContext";
import Typography from "@mui/material/Typography";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const loading= [createData(0,'loading', 'loading', 'loading', 'loading')];


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

function createData(id, first_name, last_name, email, access) {
    return {id, first_name, last_name, email, access };
}


export default function USER_MANAGEMENT_TABLE() {
    const {loginUser, setLoginUser} = useContext(UserContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [access, setAccess] = useState('');
    const [display_data, setDisplay_data] = useState(null);

    let rows = display_data;

    const first_nameOnchange =(e)=>{
        setFirst_name(e.target.value);
    }
    const last_nameOnchange =(e)=>{
        setLast_name(e.target.value);
    }
    const accessOnchange =(e)=>{
        setAccess(e.target.value);
    }
    useEffect(() => {
        refreshPage();
    }, [])

    function refreshPage(){

        const email = "SiyannLi@outlook.com";
        const post = {email};
        console.log(post);
        fetch('http://95ec-2a01-c23-7d85-f00-9891-c29-cfdf-50ad.ngrok.io/users/getAllUsers', {
            method: 'POST',
            mode : 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "001122"
            },
            body : JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if(resultCode === 200){
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createData(i, data[i].firstName, data[i].lastName, data[i].email, data[i].userAccountStatus);
                }
                setDisplay_data(standardisedData);
            }
            else{
                alert(errorMessage);
            }



        })
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
        console.log(post);
        fetch('http://95ec-2a01-c23-7d85-f00-9891-c29-cfdf-50ad.ngrok.io/users/resetUserInfo', {
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
            //TODO
        })
        refreshPage();
        handleClose();

    }

    function table(){
        if(display_data === null) {
            rows = loading;
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
                                {row.first_name}
                            </TableCell>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                {row.last_name}
                            </TableCell>
                            <TableCell style={{ width: "5vw" , height : 53}} align="center">
                                {row.email}
                            </TableCell>
                            <TableCell style={{ width: "1vw", height : 53 }} align="center">
                                <IconButton aria-label="view"
                                            disabled={rows[row.id].first_name === 'loading'}
                                            onClick={()=>handleOpen(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email, rows[row.id].access)}>
                                    <VisibilityIcon />
                                </IconButton>
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
        </div>

    );
}