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
import {useContext, useState} from "react";
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

const fake_data = [
    createData(0,'Haotian1','Wu1','test1@example.com', 'active'),
    createData(1,'Haotian2','Wu2','test2@example.com', 'active'),
    createData(2,'Haotian3','Wu3','test3@example.com', 'active'),
    createData(3,'Haotian4','Wu4','test4@example.com', 'inactive'),
    createData(4,'Haotian5','Wu5','test5@example.com', 'active'),
    createData(5,'Haotian6','Wu6','test6@example.com', 'inactive'),
    createData(6,'Haotian7','Wu7','test7@example.com', 'active'),
    createData(7,'Haotian8','Wu8','test8@example.com', 'inactive'),
]


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


export default function USER_GROUP_MANAGEMENT_TABLE() {
    const {loginUser, setLoginUser} = useContext(UserContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [access, setAccess] = useState('');

    const rows = refreshPage();

    const first_nameOnchange =(e)=>{
        setFirst_name(e.target.value);
    }
    const last_nameOnchange =(e)=>{
        setLast_name(e.target.value);
    }
    const accessOnchange =(e)=>{
        setAccess(e.target.value);
    }
    function refreshPage(){

        const post = loginUser.token;
        console.log(post);
        fetch('192.168.1.1', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;

           //TODO

            return [ /* TODO*/ ];

        })

        return fake_data;
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
        const post = loginUser.token + {email, last_name, first_name, access};
        console.log(post);
        fetch('192.168.1.1', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
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
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: '40vw', maxWidth : '40vw', minHeight: '40vh', maxHeight : '40vh'}} aria-label="custom pagination table">
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
                                <TableCell align="center" component="th" scope="row">
                                    {row.first_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.last_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    <IconButton aria-label="view" onClick={()=>handleOpen(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email, rows[row.id].access)}>
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
                                defaultValue={access}
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