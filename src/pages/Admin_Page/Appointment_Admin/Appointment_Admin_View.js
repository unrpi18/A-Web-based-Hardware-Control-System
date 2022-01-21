import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {ButtonGroup} from "@mui/material";
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
        default : return "18:00-20:00";
    }
}
function createData(ts_id, Mon, Tue, Wed, Thu, Fri, Sat, Sun) {
    return {ts_id, Mon, Tue, Wed, Thu, Fri, Sat, Sun };
}

const APPOINTMENT_ADMIN_VIEW = () => {
    const [book_open, setBook_open] = useState(false)
    const [cxl_open, setCxl_open] = useState(false)
    const [ts_open,setTs_open] = useState(false)
    const [current_view_start_date, setCurrent_view_start_date] = useState(moment().startOf("isoWeek").format('YYYY-MM-DD'))
    const [date, setDate] = useState('')
    const [slot, setSlot] = useState('')
    const [email, setEmail] = useState('')
    const [ts_status, setTs_status] = useState('')
    const [rpt_wks,setRpt_wks] = useState('')
    /**
     * Key function for fetching data about time slot availability of the week
     * @param start_date the monday date of the week
     * @param end_date the sunday date of the week
     * @returns {{Thu, ts_id, Tue, Wed, Sat, Fri, Mon, Sun}[]} the data for rendering the page
     */
    function refreshPage(start_date, end_date){
        const post = {start_date, end_date};
        console.log(post);
        fetch('192.168.1.1', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let slot_0_data_string = responseJson.ts_0;
            let slot_1_data_string = responseJson.ts_1;
            let slot_2_data_string = responseJson.ts_2;
            let slot_3_data_string = responseJson.ts_3;
            let slot_4_data_string = responseJson.ts_4;
            let slot_5_data_string = responseJson.ts_5;
            let slot_0_data = slot_0_data_string.split(',');
            let slot_1_data = slot_1_data_string.split(',');
            let slot_2_data = slot_2_data_string.split(',');
            let slot_3_data = slot_3_data_string.split(',');
            let slot_4_data = slot_4_data_string.split(',');
            let slot_5_data = slot_5_data_string.split(',');

            return [
                createData(0, slot_0_data[0], slot_0_data[1], slot_0_data[2], slot_0_data[3], slot_0_data[4], slot_0_data[5], slot_0_data[6]),
                createData(1, slot_1_data[0], slot_1_data[1], slot_1_data[2], slot_1_data[3], slot_1_data[4], slot_1_data[5], slot_1_data[6]),
                createData(2, slot_2_data[0], slot_2_data[1], slot_2_data[2], slot_2_data[3], slot_2_data[4], slot_2_data[5], slot_2_data[6]),
                createData(3, slot_3_data[0], slot_3_data[1], slot_3_data[2], slot_3_data[3], slot_3_data[4], slot_3_data[5], slot_3_data[6]),
                createData(4, slot_4_data[0], slot_4_data[1], slot_4_data[2], slot_4_data[3], slot_4_data[4], slot_4_data[5], slot_4_data[6]),
                createData(5, slot_5_data[0], slot_5_data[1], slot_5_data[2], slot_5_data[3], slot_5_data[4], slot_5_data[5], slot_5_data[6]),
            ];

        })

        return [
            createData(0, 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
            createData(1, 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
            createData(2, 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
            createData(3, 'Free', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
            createData(4, 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
            createData(5, 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
        ];
    }

    /*
    function for handle booking and canceling appointments in calendar view
     */
    function handleClick(av,day ,ts_id){
        if(av === "Booked"){
            handleBook(day, ts_id);
        }
        else {
            handleCxl(day, ts_id)
        }
    }
    function handleBook(day,ts_id){
        setDate(calculateEndDate(day));
        setSlot(ts_id);
        handleBookOpen();

    }
    function handleCxl(day,ts_id){
        setDate(calculateEndDate(day));
        setSlot(ts_id);
        handleCxlOpen();
    }

    /*
    Util function to calculate the end date of a week
     */
    function calculateEndDate(day){
        const targetDate = new Date(current_view_start_date)
        targetDate.setDate(targetDate.getDate() + day)
        return `${targetDate.getFullYear()}-${('0' + (targetDate.getMonth()+1)).slice(-2)}-${('0' + targetDate.getDate()).slice(-2)}`;
    }

    /*
    Util function to close and open the dialog
     */
    const handleCxlOpen = ()=>{
        setCxl_open(true);
    }
    const handleCxlClose = ()=>{
        setCxl_open(false);
    }
    const handleTimeSlotOpen =()=>{
        setDate('');
        setSlot('');
        setTs_status('');
        setTs_open(true);
    }

    const handleTimeSlotClose =()=>{
        setTs_open(false);
    }
    const handleBookOpen = () => {
        setEmail('');
        setBook_open(true);
    };
    const handleBookClose = () => {
        setBook_open(false);
    };

    const emailOnchange =(e)=>{
        setEmail(e.target.value);
    }
    const dateOnchange =(e)=>{
        setDate(e.target.value);
    }
    const timeSlotOnchange =(e)=>{
        setSlot(e.target.value);
    }
    const tsStatusOnchange =(e)=>{
        setTs_status(e.target.value);
    }
    const rpt_wksOnchange =(e)=>{
        setRpt_wks(e.target.value);
    }

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        let nullCheck = isDateLegal(date);
        if (nullCheck) {
            const post = {date, slot};
            fetch("url", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(post)
            }).then(() => {
                console.log('success');
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
            const post = {date, slot};
            fetch("url", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
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

    const handleConfirmTSChange = (e)=>{
        e.preventDefault();
        let nullCheck = isDateLegal(date);
        if (nullCheck) {
            const post = {date, slot, rpt_wks, ts_status};
            fetch("url", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
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
    let start_date = current_view_start_date;
    let end_date = calculateEndDate(6);
    let display_date = 'Time Slot Availability from ' + start_date + ' to ' +end_date;

    /*
    data for rendering the page
     */
    const rows = refreshPage('2022-01-17' ,'2022-01-13');



    return (
        <div>
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
                                value={slot}
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
                                defaultValue={0}
                            >
                                <MenuItem value={true}>available</MenuItem>
                                <MenuItem value={false}>unavailable</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTimeSlotClose}>Cancel</Button>
                    <Button onClick={handleConfirmTSChange}>Confirm</Button>
                </DialogActions>
            </Dialog>
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
                                defaultValue={slot}
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
                                defaultValue={slot}
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
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" >
                <ButtonGroup
                    orientation="vertical"
                    variant="contained"
                    aria-label="vertical outlined button group"
                    sx ={{my : "30vh", ml : 0, height : "10vh"}}
                >
                    <Button key = "appointment_admin" >Appointment Management</Button>
                    <Button key = "stock_admin" >Stocks & Orders</Button>
                    <Button key = "webcam_admin" >Webcam</Button>
                    <Button key = "User Group Management">User Group Management</Button>
                    <Button key = "t_and_c_update" >T&C Update</Button>
                </ButtonGroup>
                <Stack direction="column-reverse" spacing={1} justifyContent="flex-end" sx ={{mt : '15vh'}}>
                    <TableContainer>
                        <Table sx={{ maxWidth: '40vw', maxHeight : '25vh', border : 3, mx :'auto'}} aria-label="simple table">
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
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.ts_id}
                                    >
                                        <TableCell component="th" scope="row" align="center" sx ={{minWidth : '5vw'}}>
                                            {convertIdToTs(row.ts_id)}
                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Mon=== 'Free' ? 'green': 'red'}} >
                                            <Stack>
                                                {row.Mon}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Mon  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Mon,0, row.ts_id)} > {
                                                    (rows[row.ts_id].Mon  === 'Free') ? "Book ": ((rows[row.ts_id].Mon  === 'Booked')?"CXL":"") }
                                                </Button>

                                            </Stack>

                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Tue !== 'Free' ? 'red': 'green'}}>
                                            <Stack>
                                                {row.Tue}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Tue  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Tue,1, row.ts_id)} > {
                                                    (rows[row.ts_id].Tue  === 'Free') ? "Book ": ((rows[row.ts_id].Tue  === 'Booked')?"CXL":"") }
                                                </Button>

                                            </Stack>

                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Wed !== 'Free' ? 'red': 'green'}}>
                                            <Stack>
                                                {row.Wed}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Wed  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Wed, 2, row.ts_id)} > {
                                                    (rows[row.ts_id].Wed  === 'Free') ? "Book ": ((rows[row.ts_id].Wed  === 'Booked')?"CXL":"") }
                                                </Button>
                                            </Stack>

                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Thu !== 'Free' ? 'red': 'green'}}>
                                            <Stack>
                                                {row.Thu}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Thu  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Thu,3, row.ts_id)} > {
                                                    (rows[row.ts_id].Thu  === 'Free') ? "Book ": ((rows[row.ts_id].Thu  === 'Booked')?"CXL":"") }
                                                </Button>
                                            </Stack>

                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Fri !== 'Free' ? 'red': 'green'}}>
                                            <Stack>
                                                {row.Fri}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Fri  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Fri,4, row.ts_id)} > {
                                                    (rows[row.ts_id].Fri  === 'Free') ? "Book ": ((rows[row.ts_id].Fri  === 'Booked')?"CXL":"") }
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Sat !== 'Free' ? 'red': 'green'}}>
                                            <Stack>
                                                {row.Sat}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Sat  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Sat,5, row.ts_id)} > {
                                                    (rows[row.ts_id].Sat  === 'Free') ? "Book ": ((rows[row.ts_id].Sat  === 'Booked')?"CXL":"") }
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Sun !== 'Free' ? 'red': 'green'}}>
                                            <Stack>
                                                {row.Sun}
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}}
                                                        disabled ={rows[row.ts_id].Sun  === 'N/A' }
                                                        onClick = {() => handleClick(rows[row.ts_id].Sun, 6, row.ts_id)} > {
                                                    (rows[row.ts_id].Sun  === 'Free') ? "Book ": ((rows[row.ts_id].Sun  === 'Booked')?"CXL":"") }
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <Button variant="contained" onClick={prevWeek}> Prev. Week </Button>
                        <Typography variant="h6" display="block" gutterBottom>
                            {display_date}
                        </Typography>
                        <Button variant="contained" onClick={nextWeek}> Next Week </Button>
                    </Stack>
                </Stack>

                <ButtonGroup
                    orientation="vertical"
                    variant="contained"
                    aria-label="vertical outlined button group"
                    sx ={{my : "30vh", mr : 0, height : "6vh"}}
                >
                    <Button key = "all_appointment_admin" >All Appointments Management</Button>
                    <Button key = "time_slot_status" onClick={handleTimeSlotOpen} >Set Time Slots Status</Button>
                </ButtonGroup>
            </Stack>
        </div>

    )
}
export default APPOINTMENT_ADMIN_VIEW;
