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

function isDateLegal(str) {
    const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const regExp = new RegExp(reg);
    return regExp.test(str);
}

const APPOINTMENT_ADMIN_VIEW = () => {
    const [date, setDate] = useState('')
    const [book_open, setBook_open] = useState(false)
    const [cxl_open, setCxl_open] = useState(false)
    const [last_name, setLast_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [slot, setSlot] = useState('')
    const [email, setEmail] = useState('')
    const [post, setPost] = useState('')


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
    function calculateEndDate(day){
        const targetDate = new Date(start_date)
        targetDate.setDate(targetDate.getDate() + day)
        return `${targetDate.getFullYear()}-${('0' + (targetDate.getMonth()+1)).slice(-2)}-${('0' + targetDate.getDate()).slice(-2)}`;
    }
    const handleCxlOpen = ()=>{
        setCxl_open(true);
    }
    const handleCxlClose = ()=>{
        setCxl_open(false);
    }
    const handleBookOpen = () => {
        setEmail('');
        setFirst_name('');
        setLast_name('');
        setBook_open(true);
    };
    const handleBookClose = () => {
        setBook_open(false);
    };
    const last_nameOnchange =(event)=>{
        setLast_name(event.target.value);
    }
    const first_nameOnchange =(event)=>{
        setFirst_name(event.target.value);
    }
    const emailOnchange =(event)=>{
        setEmail(event.target.value);
    }

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        let nullCheck = isDateLegal(date)
        if (nullCheck) {
            const post = {date};
            fetch("url", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(post)
            }).then(() => {
                console.log('success');
            })
        } else {
            alert("please enter an valid date in yyyy-mm-dd");
        }
    }

    const handleConfirmCxl =(e) =>{

    }
    function createData(ts_id, ts, Mon, Tue, Wed, Thu, Fri, Sat, Sun) {
        return {ts_id, ts, Mon, Tue, Wed, Thu, Fri, Sat, Sun };
    }
    const start_date = '2022-01-17';
    const end_date = calculateEndDate(6);

    let display_date = 'Time Slot Availability from ' + start_date + ' to ' +end_date;
    const rows = [
        createData(0,'08:00-10:00', 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
        createData(1,'10:00-12:00', 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
        createData(2,'12:00-14:00', 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
        createData(3,'14:00-16:00', 'Free', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
        createData(4,'16:00-18:00', 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
        createData(5,'18:00-20:00', 'Booked', 'Free', 'Booked', 'Free','N/A', 'N/A', 'N/A'),
    ];
    return (
        <div>
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
                        id="last_name"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        value ={last_name}
                        onChange={last_nameOnchange}
                        placeholder={'Doe'}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="first_name"
                        value ={first_name}
                        label="First Name"
                        fullWidth
                        variant="standard"
                        onChange={first_nameOnchange}
                        placeholder={'John'}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="email"
                        label="email"
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
                        label="date"
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
                    <Button onClick={handleCxlClose}>Cancel</Button>
                    <Button onClick={handleConfirmCxl}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Stack direction="column-reverse" spacing={1} justifyContent="flex-end" sx ={{mt : '15vh'}}>

                <TableContainer>
                    <Table sx={{ maxWidth: '60vw', maxHeight : '25vh', border : 3, mx :'auto'}} aria-label="simple table" title = "test">
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
                                        {row.ts}
                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Mon=== 'Free' ? 'green': 'red'}} >
                                        <Stack>
                                            {row.Mon}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group">
                                                <Button size = "small" sx ={{ bgcolor : 'transparent', color : 'white'}} disabled ={rows[row.ts_id].Mon  !== 'Free'} onClick = {() => handleBook(0, row.ts_id)}> Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Mon !== 'Booked' } onClick = {() => handleCxl(0, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>

                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Tue !== 'Free' ? 'red': 'green'}}>
                                        <Stack>
                                            {row.Tue}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group">
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Tue  !== 'Free' } onClick = {() => handleBook(1, row.ts_id)} > Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Tue !== 'Booked' } onClick = {() => handleCxl(1, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>

                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Wed !== 'Free' ? 'red': 'green'}}>
                                        <Stack>
                                            {row.Wed}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group" >
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Wed  !== 'Free' } onClick = {() => handleBook(2, row.ts_id)} > Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Wed !== 'Booked' } onClick = {() => handleCxl(2, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>

                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Thu !== 'Free' ? 'red': 'green'}}>
                                        <Stack>
                                            {row.Thu}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group">
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Thu  !== 'Free' } onClick = {() => handleBook(3, row.ts_id)} > Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Thu !== 'Booked' } onClick = {() => handleCxl(3, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>

                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Fri !== 'Free' ? 'red': 'green'}}>
                                        <Stack>
                                            {row.Fri}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group">
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Fri  !== 'Free' } onClick = {() => handleBook(4, row.ts_id)}> Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Fri !== 'Booked' } onClick = {() => handleCxl(4, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>

                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Sat !== 'Free' ? 'red': 'green'}}>
                                        <Stack>
                                            {row.Sat}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group">
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Sat  !== 'Free' } onClick = {() => handleBook(5, row.ts_id)} > Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Sat !== 'Booked' } onClick = {() => handleCxl(5, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>

                                    </TableCell>
                                    <TableCell align="center" sx ={{maxWidth : '6vw', bgcolor : rows[row.ts_id].Sun !== 'Free' ? 'red': 'green'}}>
                                        <Stack>
                                            {row.Sun}
                                            <ButtonGroup orientation="horizontal" size = "small"  variant="standard" aria-label="outlined primary button group">
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Sun  !== 'Free' } onClick = {() => handleBook(6, row.ts_id)} > Book </Button>
                                                <Button size = "small" sx ={{bgcolor : 'transparent',color : 'white'}} disabled ={rows[row.ts_id].Sun !== 'Booked' } onClick = {() => handleCxl(6, row.ts_id)}> CXL </Button>
                                            </ButtonGroup>
                                        </Stack>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Button variant="contained"> Prev. Week </Button>
                    <Typography variant="h6" display="block" gutterBottom>
                        {display_date}
                    </Typography>
                    <Button variant="contained" > Next Week </Button>
                </Stack>
            </Stack>

        </div>

    )
}
export default APPOINTMENT_ADMIN_VIEW;
