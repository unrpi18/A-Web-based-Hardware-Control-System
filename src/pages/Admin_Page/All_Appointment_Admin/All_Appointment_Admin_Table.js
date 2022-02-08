import FilterListIcon from '@mui/icons-material/FilterList';
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
import React, {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from "@mui/material/TextField";
import {url} from "../Navi_base"
import tablePaginationActions from "../Component/Table_Control";
import {useNavigate} from "react-router";

// default data for loading
const no_data =[
    createData(0, 'N/A','N/A','N/A','N/A',-999)
]

/**
 * convert time slot id to time slot
 * @param id id of time slot
 * @returns {string} detailed time slot in string, show N/A when time slot id is invalid
 */
function convertIDtoSlot(id){
    switch (id){
        case 0 : return '08:00-10:00';
        case 1 : return '10:00-12:00';
        case 2 : return '12:00-14:00';
        case 3 : return '14:00-16:00';
        case 4 : return '16:00-18:00';
        case 5 : return '18:00-20:00';
        default : return 'N/A';
    }
}

/**
 * function for creating entry of each appointment
 * @param id automatically generated ID
 * @param first_name the first name of the user who booked the appointment
 * @param last_name the last name of the user who booked the appointment
 * @param email the email of the user who booked the appointment
 * @param date the date the appointment
 * @param timeslot the time slot the appointment
 * @returns {{date, timeslot, last_name, id, first_name, email}} legal data containing required information
 */
function createData(id, first_name, last_name, email,date,timeslot) {
    return {id, first_name, last_name, email, date, timeslot};
}


export default function ALL_APPOINTMENT_ADMIN_TABLE() {
    //state var
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [delete_open, setDelete_open] = useState(false);
    const [filter_open, setFilter_open] = useState(false);
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name,setLast_name] = useState('');
    const [date, setDate] = useState('');
    const [time_slot, setTime_slot] = useState();
    const [display_data, setDisplay_data] = useState(no_data);
    const [filter_keyword, setFilter_keyword]= useState('');
    const [feteched_data, setFetched_data] = useState(no_data);
    const navigate = useNavigate();

    // Global methods
    useEffect(() => {
        refreshPage();
    }, [])

    function refreshPage(){
        fetch(url + '/timeslots/getBookedTimeSlot', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem("token")
            }
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            let standarisedData = [];
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                for(let i = 0; i < data.length; i++){
                    standarisedData[i] = createData(i, data[i].user.firstName,  data[i].user.lastName, data[i].user.email, data[i].timeSlotDate, data[i].slot)
                }
                if(standarisedData.length === 0){
                    setFetched_data(no_data);
                    setDisplay_data(no_data)
                }else{
                    setFetched_data(standarisedData);
                    setDisplay_data(standarisedData);
                }
            } else if(resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);
            } else {
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }

        })
    }


    //cancel appointment relevant methods
    const display_msg = 'Do you want to cancel the appointment of ' + first_name + ' ' + last_name + '[' + email + '] on ' + date +' during '+ convertIDtoSlot(time_slot) +'  ?';
    function handleDelete_open(first_name, last_name, email, date, time_slot){
        setFirst_name(first_name);
        setLast_name(last_name);
        setEmail(email);
        setDate(date);
        setTime_slot(time_slot);
        setDelete_open(true);
    }
    const handleDelete_close =()=>{
        setDelete_open(false);
        setFirst_name('');
        setLast_name('');
        setEmail('');
    }
    const handleConfirm =() =>{
        const slot = time_slot;
        const post = {date,slot};
        console.log(post);
        fetch(url +'/appointments/adminDeleteAppointment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem("token")
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            if(resultCode === 200 || resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage)
            } else {
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }
            refreshPage();
        })
        handleDelete_close();

    }
    function deleteDialog(){
        return(
            <Dialog open={delete_open} onClose={handleDelete_close}>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText> {display_msg} </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete_close}>Close</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
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
            for(let i = 0; i <feteched_data.length; i++){
                if(feteched_data[i].first_name.toString().includes(keyword)
                    || feteched_data[i].last_name.toString().includes(keyword)
                    || feteched_data[i].email.toString().includes(keyword)
                    || feteched_data[i].date.toString().includes(keyword)
                    || convertIDtoSlot(feteched_data[i].timeslot).toString().includes(keyword)) {
                    filteredData[count] = feteched_data[i];
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
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - display_data.length) : 0;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Table
    let rows = display_data;
    function table(){
        return(
            <TableContainer component={Paper} style={{height : "40vh", width : "50vw"}}>
                <Table style={{height : "40vh", width : "50vw"}} aria-label="custom pagination table">
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
                                    <IconButton aria-label="view"

                                                onClick={()=>handleDelete_open(rows[row.id].first_name, rows[row.id].last_name, rows[row.id].email, rows[row.id].date, rows[row.id].timeslot)}>
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
                            <IconButton disabled={false} onClick={()=>handleFilter_open()}>
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
    function table_title (){
        return(
            <Typography variant="h4" display="block" gutterBottom>
                All Appointments
            </Typography>
        )
    }

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                {table_title()}
                {table()}
            </Stack>
            {deleteDialog()}
            {filterDialog()}
        </div>

    );
}