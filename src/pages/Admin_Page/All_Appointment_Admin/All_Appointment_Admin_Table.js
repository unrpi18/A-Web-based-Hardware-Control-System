
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
import {Dialog} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {UserContext} from "../../../contexts/RegisterContext";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from '@mui/icons-material/Delete';
const loading = [
    createData(0,'loading','loading','loading','loading',-999)
]
function convertIDtoSlot(id){
    switch (id){
        case 0 : return '08:00-10:00';
        case 1 : return '10:00-12:00';
        case 2 : return '12:00-14:00';
        case 3 : return '14:00-16:00';
        case 4 : return '16:00-18:00';
        default : return '18:00-20:00';
    }
}



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

function createData(id, first_name, last_name, email,date,timeslot) {
    return {id, first_name, last_name, email, date, timeslot};
}


export default function ALL_APPOINTMENT_ADMIN_TABLE() {

    const {loginUser, setLoginUser} = useContext(UserContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [date, setDate] = useState('');
    const [time_slot, setTime_slot] = useState();
    const [display_data, setDisplay_data] = useState(loading);

    let rows = display_data;

    useEffect(() => {
        refreshPage();
    }, [])

    function refreshPage(){



        fetch('http://95ec-2a01-c23-7d85-f00-9891-c29-cfdf-50ad.ngrok.io/timeslots/getBookedTimeSlot', {
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
            let standarisedData = [];
            if(resultCode === 200){
                for(let i = 0; i < data.length; i++){
                    standarisedData[i] = createData(i, data[i].user.firstName,  data[i].user.lastName, data[i].user.email, data[i].timeSlotDate, data[i].slot)
                }
                setDisplay_data(standarisedData);
            }

        })
    }

    function handleOpen(first_name, last_name, email, date, time_slot){
        setFirst_name(first_name);
        setLast_name(last_name);
        setEmail(email);
        setDate(date);
        setTime_slot(time_slot);
        setOpen(true);
    }
    const handleClose =()=>{
        setOpen(false);
        setFirst_name('');
        setLast_name('');
        setEmail('');
    }

    const handleConfirm =() =>{
        const slot = time_slot;
        const post = {date,slot};
        console.log(post);
        fetch('http://95ec-2a01-c23-7d85-f00-9891-c29-cfdf-50ad.ngrok.io/appointments/deleteAppointment', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            //TODO
            refreshPage();
        })

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

    function table(){

        return(
            <TableContainer component={Paper}>
                <Table sx={{ minHeight: '40vh', maxHeight : '40vh'}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time Slot</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow  key={row.id}>
                                <TableCell style={{ width: 160 }} align="center" component="th" scope="row">
                                    {row.first_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.last_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="center">
                                    {row.date}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="center">
                                    {convertIDtoSlot(row.timeslot)}
                                </TableCell>
                                <TableCell style={{ width: 40 }} align="center">
                                    <IconButton aria-label="view" onClick={()=>handleOpen(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email, rows[row.id].date, rows[row.id].timeslot)}>
                                        <DeleteIcon />
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
                        <TableRow >
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
    const display_msg = 'Do you want to cancel the appointment of ' + first_name + ' ' + last_name + '[' + email + '] on ' + date +' during '+ convertIDtoSlot(time_slot) +'  ?';
    const table_title = 'All Appointments'
    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h4" display="block" gutterBottom>
                    {table_title}
                </Typography>
                {table()}
            </Stack>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText> {display_msg} </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}