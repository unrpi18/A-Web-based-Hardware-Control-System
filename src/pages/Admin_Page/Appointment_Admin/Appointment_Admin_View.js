import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from "moment";
import {url} from "../Navi_base"

//loading data
const loading = [
    createData(0, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(1, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(2, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(3, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(4, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(5, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading')
]


function isDateLegal(str) {
    const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const regExp = new RegExp(reg);
    return regExp.test(str);
}

function convertIdToTs(id){
    switch (id){
        case 0: return "08:00-10:00";
        case 1: return "10:00-12:00";
        case 2: return "12:00-14:00";
        case 3: return "14:00-16:00";
        case 4: return "16:00-18:00";
        case 5: return "18:00-20:00";
        default : return "N/A";
    }
}

function createData(ts_id, Mon, Tue, Wed, Thu, Fri, Sat, Sun) {
    return {ts_id, Mon, Tue, Wed, Thu, Fri, Sat, Sun };
}



// Util functions for standardizing data
function dataStandardisation(data){
    let standardisedData = [];
    for(let i=0; i < 7; i++){
        standardisedData[i] = [];
        for(let j = 0; j < 6; j++){
            switch(data[i][j].timeSlotStatus){
                case 'NA' : standardisedData[i][j] = 'N/A'; break;
                case 'FREE' : standardisedData[i][j] = 'Free'; break;
                default :  standardisedData[i][j] = 'Booked'; break;
            }
        }
    }
    let displayData = [];
    for(let i = 0; i < 6; i++){
        displayData[i] = [];
    }
    for(let j=0; j < 7; j++){
        for(let i = 0; i < 6; i++){
            displayData[i][j] = standardisedData[j][i];
        }
    }
    return displayData;
}

const APPOINTMENT_ADMIN_VIEW = () => {
    //global constant
    const [book_open, setBook_open] = useState(false)
    const [cxl_open, setCxl_open] = useState(false)
    const [ts_open,setTs_open] = useState(false)
    const [current_view_start_date, setCurrent_view_start_date] = useState(moment().startOf("isoWeek").format("YYYY-MM-DD"))
    const [date, setDate] = useState('')
    const [time_slot, setTimeSlot] = useState('')
    const [email, setEmail] = useState('')
    const [ts_status, setTs_status] = useState('')
    const [rpt_wks,setRpt_wks] = useState('')
    const [fetchedData, setFetchedData] = useState(loading);

    //Util function to calculate the end date of a week
    function calculateEndDate(day){
        const targetDate = new Date(current_view_start_date)
        targetDate.setDate(targetDate.getDate() + day)
        return `${targetDate.getFullYear()}-${('0' + (targetDate.getMonth()+1)).slice(-2)}-${('0' + targetDate.getDate()).slice(-2)}`;
    }

    // global var
    let start_date = current_view_start_date;
    let end_date = calculateEndDate(6);

    // on change methods
    const emailOnchange =(e)=>{
        setEmail(e.target.value);
    }
    const dateOnchange =(e)=>{
        setDate(e.target.value);
    }
    const timeSlotOnchange =(e)=>{
        setTimeSlot(e.target.value);
    }
    const tsStatusOnchange =(e)=>{
        setTs_status(e.target.value);
    }
    const rpt_wksOnchange =(e)=>{
        setRpt_wks(e.target.value);
    }

    //Global methods
    useEffect(() => {
        refreshPage(current_view_start_date);
    }, [])
    function refreshPage(start_date){

        const startDate = start_date;
        const post = {startDate};
        fetch(url + '/timeslots/timeSlotCalender', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            let result_code =responseJson.resultCode;
            let errorMessage = responseJson.message;
            if(result_code === 200){
                let standarisedData = dataStandardisation(responseJson.data);
                let displayData = [];
                for(let i = 0; i < 6; i++){
                    displayData[i] = createData(i, standarisedData[i][0],standarisedData[i][1],standarisedData[i][2],standarisedData[i][3],standarisedData[i][4],standarisedData[i][5],standarisedData[i][6],standarisedData[i][7]);
                }
                setFetchedData(displayData);

            }
            else{

                alert(errorMessage);
            }

        })

    }


    //function for handle booking and canceling appointments in calendar view
    function handleClick(av ,day ,ts_id){
        if(av === 'Free'){
            handleBook(day, ts_id);
        }
        else {
            handleCxl(day, ts_id)
        }
    }
    function handleBook(day,ts_id){
        setDate(calculateEndDate(day));
        setTimeSlot(ts_id);
        handleBookOpen();

    }
    function handleCxl(day,ts_id){
        setDate(calculateEndDate(day));
        setTimeSlot(ts_id);
        handleCxlOpen();
    }
    const handleCxlOpen = ()=>{
        setCxl_open(true);
    }
    const handleCxlClose = ()=>{
        setCxl_open(false);
    }
    const handleBookOpen = () => {
        setEmail('');
        setBook_open(true);
    };
    const handleBookClose = () => {
        setBook_open(false);
    };
    const handleConfirmBooking = (e) => {
        e.preventDefault();
        let nullCheck = isDateLegal(date);
        if (nullCheck) {
            const slot = time_slot
            const post = {email, date, slot};
            console.log(post);
            fetch(url + "/appointments/addAppointment", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + "001122"
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);
                refreshPage(start_date, end_date);
                handleBookClose()
            })
        } else {
            alert("please enter an valid date in yyyy-mm-dd");
        }
    }
    const handleConfirmCxl = (e) =>{
        e.preventDefault();
        let nullCheck = isDateLegal(date);
        if (nullCheck) {
            const slot = time_slot
            const post = {date, slot};
            fetch(url + "/appointments/deleteAppointment", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + "001122"
                },
                body: JSON.stringify(post)
            }).then(() => {
                console.log('success');
                refreshPage(start_date, end_date);
                handleCxlClose()
            })
        } else {
            alert("please enter an valid date in yyyy-mm-dd");
        }
    }
    function bookAppointmentDialog(){
        return(
            <Dialog open={book_open} onClose={handleBookClose}>
                <DialogTitle>Book an appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide the following information to book an appointment for another user
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value ={email}
                        onChange={emailOnchange}
                        placeholder={'john.doe@example.com'}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        defaultValue={date}
                        disabled
                    />
                    <Box sx={{ mt : '2vh' ,minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="time_slot_book_label">Time Slot*</InputLabel>
                            <Select
                                labelId="time_slot_book_select_label"
                                id="select_time_slot"
                                label="Time_Slot"
                                disabled
                                defaultValue={time_slot}
                            >
                                <MenuItem value={0}>08:00-10:00</MenuItem>
                                <MenuItem value={1}>10:00-12:00</MenuItem>
                                <MenuItem value={2}>12:00-14:00</MenuItem>
                                <MenuItem value={3}>14:00-16:00</MenuItem>
                                <MenuItem value={4}>16:00-18:00</MenuItem>
                                <MenuItem value={5}>18:00-20:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBookClose}>Cancel</Button>
                    <Button onClick={handleConfirmBooking}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function cxlAppointmentDialog(){
        return(
            <Dialog open={cxl_open} onClose={handleCxlClose}>
                <DialogTitle>Cancel an appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please confirm if you want to cancel this appointment:
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="date"
                        label="date"
                        type="date"
                        fullWidth
                        variant="standard"
                        defaultValue={date}
                        disabled
                    />
                    <Box sx={{ mt : '2vh' ,minWidth: "50vw" }}>
                        <FormControl fullWidth>
                            <InputLabel id="time_slot_book_label">Time Slot*</InputLabel>
                            <Select
                                labelId="time_slot_book_select_label"
                                id="select_time_slot"
                                label="Time_Slot"
                                disabled
                                defaultValue={time_slot}
                            >
                                <MenuItem value={0}>08:00-10:00</MenuItem>
                                <MenuItem value={1}>10:00-12:00</MenuItem>
                                <MenuItem value={2}>12:00-14:00</MenuItem>
                                <MenuItem value={3}>14:00-16:00</MenuItem>
                                <MenuItem value={4}>16:00-18:00</MenuItem>
                                <MenuItem value={5}>18:00-20:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCxlClose}>Cancel</Button>
                    <Button onClick={handleConfirmCxl}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }

    //functions of setting time slot
    const handleTimeSlotOpen =()=>{
        setDate('');
        setRpt_wks('');
        setTimeSlot('');
        setTs_status('');
        setTs_open(true);
    }
    const handleTimeSlotClose =()=>{
        setTs_open(false);
    }
    const handleConfirmTSChange = (e)=>{
        e.preventDefault();
        let nullCheck = isDateLegal(date);
        if (nullCheck) {
            const startDate = date;
            const slot = time_slot.toString();
            const endRepeatAfter = rpt_wks
            const status = ts_status
            const post = {startDate, slot, endRepeatAfter, status};
            console.log(post);
            fetch(url + "/timeslots/setPeriodTimeSlots", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + "001122"
                },
                body: JSON.stringify(post)
            }).then(() => {
                console.log('success');
                refreshPage(start_date, end_date);
                handleTimeSlotClose()
            })
        } else {
            alert("please enter an valid date in yyyy-mm-dd");
        }
    }
    function setTimeSlotDialog(){
        return(
            <Dialog open={ts_open} onClose={handleTimeSlotClose}>
                <DialogTitle>Set Time Slots</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide the following information to set the status of the time slot
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        value ={date}
                        onChange={dateOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        id="rpt"
                        label="Repeating"
                        type="number"
                        fullWidth
                        variant="standard"
                        value ={rpt_wks}
                        onChange={rpt_wksOnchange}
                        defaultValue={1}
                    />
                    <Box sx={{ mt : '2vh' ,minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="time_slot_book_label">Time Slot*</InputLabel>
                            <Select
                                labelId="time_slot_book_select_label"
                                id="select_time_slot"
                                value={time_slot}
                                label="Time_Slot"
                                onChange={timeSlotOnchange}
                                defaultValue={0}
                            >
                                <MenuItem value={0}>08:00-10:00</MenuItem>
                                <MenuItem value={1}>10:00-12:00</MenuItem>
                                <MenuItem value={2}>12:00-14:00</MenuItem>
                                <MenuItem value={3}>14:00-16:00</MenuItem>
                                <MenuItem value={4}>16:00-18:00</MenuItem>
                                <MenuItem value={5}>18:00-20:00</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ mt : '2vh' ,minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="new_status_label">Status*</InputLabel>
                            <Select
                                labelId="new_status_select_label"
                                id="select_status"
                                value={ts_status}
                                label="status"
                                onChange={tsStatusOnchange}
                                defaultValue={ts_status}
                            >
                                <MenuItem value={"FREE"}>available</MenuItem>
                                <MenuItem value={"NA"}>unavailable</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTimeSlotClose}>Cancel</Button>
                    <Button onClick={handleConfirmTSChange}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }

    // function for clicking prev and next week
    function prevWeek(){
        if(!moment(start_date).isBefore(moment().format('YYYY-MM-DD'))){
            refreshPage(calculateEndDate(-7), calculateEndDate(-1));
            setCurrent_view_start_date(calculateEndDate(-7));
        }
    }
    function nextWeek(){
        refreshPage(calculateEndDate(7), calculateEndDate(13));
        setCurrent_view_start_date(calculateEndDate(7));
    }

    // tables for holding data
    let display = 'nothing';
    let display_date = 'Time Slot Availability from ' + start_date + ' to ' +end_date;
    let today_date = 'Today is ' + moment().format('YYYY-MM-DD') + ', ' + moment().format('dddd');
    function table(){
        return(
            <TableContainer>
                <Table sx={{ minWidth : '60vw', maxWidth: '60vw', maxHeight : '25vh', minHeight : '40vh', border : 3, mx :'auto'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Time Slot/Day</TableCell>
                            <TableCell align="center">Monday</TableCell>
                            <TableCell align="center">Tuesday</TableCell>
                            <TableCell align="center">Wednesday</TableCell>
                            <TableCell align="center">Thursday</TableCell>
                            <TableCell align="center">Friday</TableCell>
                            <TableCell align="center">Saturday</TableCell>
                            <TableCell align="center">Sunday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchedData.map((row) => (
                            <TableRow
                                key={row.ts_id}
                            >
                                <TableCell component="th" scope="row" align="center" sx ={{minWidth : '5vw'}}>
                                    {convertIdToTs(row.ts_id)}
                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw',minHeight :'4vh', maxHeight : '4vh', bgcolor : fetchedData[row.ts_id].Mon=== 'Free' ? 'green': 'red'}} >
                                    <Stack>
                                        {row.Mon}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Mon  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Mon,0, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Mon  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Mon  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>

                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : fetchedData[row.ts_id].Tue !== 'Free' ? 'red': 'green'}}>
                                    <Stack>
                                        {row.Tue}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Tue  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Tue,1, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Tue  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Tue  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>

                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : fetchedData[row.ts_id].Wed !== 'Free' ? 'red': 'green'}}>
                                    <Stack>
                                        {row.Wed}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Wed  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Wed, 2, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Wed  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Wed  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : fetchedData[row.ts_id].Thu !== 'Free' ? 'red': 'green'}}>
                                    <Stack>
                                        {row.Thu}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Thu  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Thu,3, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Thu  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Thu  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : fetchedData[row.ts_id].Fri !== 'Free' ? 'red': 'green'}}>
                                    <Stack>
                                        {row.Fri}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Fri  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Fri,4, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Fri  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Fri  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : fetchedData[row.ts_id].Sat !== 'Free' ? 'red': 'green'}}>
                                    <Stack>
                                        {row.Sat}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Sat  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Sat,5, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Sat  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Sat  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : fetchedData[row.ts_id].Sun !== 'Free' ? 'red': 'green'}}>
                                    <Stack>
                                        {row.Sun}
                                        <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                disabled ={fetchedData[row.ts_id].Sun  === 'N/A' }
                                                onClick = {() => handleClick(fetchedData[row.ts_id].Sun, 6, row.ts_id)} > {
                                            (fetchedData[row.ts_id].Sun  === 'Free') ? "Book ": ((fetchedData[row.ts_id].Sun  === 'Booked')?"CANCEL":<Typography variant="caption" display="block" color='transparent' gutterBottom>
                                                {display}
                                            </Typography>) }
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <div>
            {setTimeSlotDialog()};
            {bookAppointmentDialog()};
            {cxlAppointmentDialog()};
            <Stack direction="column-reverse" spacing={3}  alignItems="center" sx ={{mx : 'auto'}}>
                <Button variant="contained" onClick={handleTimeSlotOpen} >Set Time Slots Status</Button>
                {table()}
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Button variant="contained" onClick={prevWeek}> Prev. Week </Button>
                    <Typography variant="h6" display="block" gutterBottom>
                        {display_date}
                    </Typography>
                    <Button variant="contained" onClick={nextWeek}> Next Week </Button>
                </Stack>
                <Typography variant="h4" display="block" gutterBottom>
                    {today_date}
                </Typography>
            </Stack>
        </div>

    )
}
export default APPOINTMENT_ADMIN_VIEW;
