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
import {useNavigate} from "react-router";
import {Autocomplete} from "@mui/lab";

//loading data
const loading = [
    createData(0, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(1, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(2, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(3, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(4, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading'),
    createData(5, 'loading', 'loading', 'loading', 'loading','loading', 'loading', 'loading')
]
const user_no_data = [createUserData(0, 'N/A')]
function createUserData(id, entry){
    return {id, entry};
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

    const [user_data, setUser_data] = useState(user_no_data);
    const navigate = useNavigate();
    //Util function to calculate the end date of a week
    function calculateEndDate(day){
        const targetDate = new Date(current_view_start_date)
        targetDate.setDate(targetDate.getDate() + day)
        return `${targetDate.getFullYear()}-${('0' + (targetDate.getMonth()+1)).slice(-2)}-${('0' + targetDate.getDate()).slice(-2)}`;
    }

    // global var
    let start_date = current_view_start_date;
    let end_date = calculateEndDate(6);


    // onChange method
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
        setFetchedData(loading);
        fetch(url + '/timeslots/timeSlotCalender', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {

            let result_code =responseJson.resultCode;
            let errorMessage = responseJson.message;
            if(result_code === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                let standarisedData = dataStandardisation(responseJson.data);
                let displayData = [];
                for(let i = 0; i < 6; i++){
                    displayData[i] = createData(i, standarisedData[i][0],standarisedData[i][1],standarisedData[i][2],standarisedData[i][3],standarisedData[i][4],standarisedData[i][5],standarisedData[i][6],standarisedData[i][7]);
                }
                setFetchedData(displayData);

            } else if(result_code === 500){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(errorMessage);

            }else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }

        }).catch(error =>{throw(error)})

    }
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


    //function for handle booking and canceling appointments in calendar view
    function handleClick(av ,day ,ts_id){
        if(av === 'Free'){
            fetchUser();
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
    function handleConfirm(command){
        if(moment(moment().format('YYYY-MM-DD')).isAfter(date) === true){
            alert("You may not modify appointment in the past!")
            handleBookClose();
            handleCxlClose();
        }else{
            const prefix_url = command === 'Book' ? "/appointments/adminAddAppointment" : "/appointments/adminDeleteAppointment";
            const slot = time_slot
            const post = command === 'Book' ? {email, date, slot} : {date, slot};
            fetch(url + prefix_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(post)

            }).then(response => response.json()).then(responseJson => {
                if(responseJson.resultCode === 200 || responseJson.resultCode === 500){
                    window.sessionStorage.setItem('token', responseJson.token);
                    alert(responseJson.message);
                }else{
                    window.sessionStorage.clear();
                    alert(responseJson.message);
                    navigate('/');
                }

                refreshPage(start_date);
                handleBookClose()
                handleCxlClose();
            }).catch(error =>{throw(error)})
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
                    <Button onClick={()=>handleConfirm('Book')}>Yes</Button>
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
                    <Button onClick={()=>handleConfirm('Cancel')}>Yes</Button>
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
        if(moment(moment().format('YYYY-MM-DD')).isAfter(date) === true){
            alert("You may not modify appointment in the past!")
            handleBookClose();
            handleCxlClose();
        }else {
            const url_prefix = ts_status === 'FREE' ? '/timeslots/setPeriodTimeSlotsFREE' : '/timeslots/setPeriodTimeSlotsNA'
            e.preventDefault();
            const startDate = date;
            const slot = time_slot.toString();
            const endRepeatAfter = rpt_wks
            const status = ts_status
            const post = {startDate, slot, endRepeatAfter, status};
            fetch(url + url_prefix, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                if (responseJson.resultCode === 200 || responseJson.resultCode === 500) {
                    window.sessionStorage.setItem('token', responseJson.token);
                    alert(responseJson.message);
                } else {
                    window.sessionStorage.clear();
                    alert(responseJson.message);
                    navigate('/');
                }
                refreshPage(start_date);
                handleTimeSlotClose()
            }).catch(error =>{throw(error)})
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
                    <Button onClick={handleConfirmTSChange}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }

    // function for clicking prev and next week
    function prevWeek(){
        if(moment(start_date).isAfter(moment().format('YYYY-MM-DD'))){
            refreshPage(calculateEndDate(-7));
            setCurrent_view_start_date(calculateEndDate(-7));
        }
    }
    function nextWeek(){
        refreshPage(calculateEndDate(7));
        setCurrent_view_start_date(calculateEndDate(7));
    }

    // tables for holding data
    let display = 'nothing';
    let display_date = 'Time Slot Availability from ' + start_date + ' to ' +end_date;
    let today_date = 'Today is ' + moment().format('YYYY-MM-DD') + ', ' + moment().format('dddd');
    function table(){
        return(
            <TableContainer>
                <Table sx={{ minWidth : '80vw', maxWidth: '80vw', maxHeight : '25vh', minHeight : '40vh', border : 3, mx :'auto'}}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Time Slot/Date</TableCell>
                            <TableCell align="center">{current_view_start_date}/Mo</TableCell>
                            <TableCell align="center">{calculateEndDate(1)}/Tu</TableCell>
                            <TableCell align="center">{calculateEndDate(2)}/We</TableCell>
                            <TableCell align="center">{calculateEndDate(3)}/Th</TableCell>
                            <TableCell align="center">{calculateEndDate(4)}/Fr</TableCell>
                            <TableCell align="center">{calculateEndDate(5)}/Sa</TableCell>
                            <TableCell align="center">{calculateEndDate(6)}/Su</TableCell>
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
            {setTimeSlotDialog()}
            {bookAppointmentDialog()}
            {cxlAppointmentDialog()}
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
