import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {ButtonGroup} from "@mui/material";


function isDateLegal(str) {
    const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const regExp = new RegExp(reg);
    return regExp.test(str);
}

const USER_APPOINTMENT_VIEW = () => {
    const [date, setDate] = useState('')
    const [open, setOpen] = useState(false)
    const [last_name, setLast_name] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [slot, setSlot] = useState('')
    const [email, setEmail] = useState('')

    function handleBook(day, ts_id) {
        const targetDate = new Date(start_date)
        targetDate.setDate(targetDate.getDate() + day)
        const result = `${targetDate.getFullYear()}-${('0' + (targetDate.getMonth() + 1)).slice(-2)}-${('0' + targetDate.getDate()).slice(-2)}`;
        setDate(result);
        setSlot(ts_id);
        handleOpen();

    }

    const handleOpen = () => {
        setEmail('');
        setFirst_name('');
        setLast_name('');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const last_nameOnchange = (event) => {
        setLast_name(event.target.value);
    }
    const first_nameOnchange = (event) => {
        setFirst_name(event.target.value);
    }
    const emailOnchange = (event) => {
        setEmail(event.target.value);
    }
    const handleConfirm = (e) => {
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

    function createData(ts_id, ts, Mon, Tue, Wed, Thu, Fri, Sat, Sun) {
        return {ts_id, ts, Mon, Tue, Wed, Thu, Fri, Sat, Sun};
    }

    const start_date = '2022-01-17';
    const rows = [
        createData(0, '08:00-10:00', 'Booked', 'Free', 'Booked', 'Free', 'N/A', 'N/A', 'N/A'),
        createData(1, '10:00-12:00', 'Booked', 'Free', 'Booked', 'Free', 'N/A', 'N/A', 'N/A'),
        createData(2, '12:00-14:00', 'Booked', 'Free', 'Booked', 'Free', 'N/A', 'N/A', 'N/A'),
        createData(3, '14:00-16:00', 'Free', 'Free', 'Booked', 'Free', 'N/A', 'N/A', 'N/A'),
        createData(4, '16:00-18:00', 'Booked', 'Free', 'Booked', 'Free', 'N/A', 'N/A', 'N/A'),
        createData(5, '18:00-20:00', 'Booked', 'Free', 'Booked', 'Free', 'N/A', 'N/A', 'N/A'),
    ];
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
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
                        value={last_name}
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
                        value={first_name}
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
                        value={email}
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
                    <Box sx={{mt: '2vh', minWidth: 120}}>
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <TableContainer>
                <Table sx={{maxWidth: '60vw', maxHeight: '25vh', border: 3, mx: 'auto', mt: '15vh'}}
                       aria-label="simple table" title="test">
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
                                <TableCell component="th" scope="row" align="center" sx={{minWidth: '5vw'}}>
                                    {row.ts}
                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Mon === 'Free' ? 'green' : 'red'
                                }}>
                                    <Stack>
                                        {row.Mon}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Mon !== 'Free'}
                                                    onClick={() => handleBook(0, row.ts_id)}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Mon !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Tue !== 'Free' ? 'red' : 'green'
                                }}>
                                    <Stack>
                                        {row.Tue}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Tue !== 'Free'}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Tue !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Wed !== 'Free' ? 'red' : 'green'
                                }}>
                                    <Stack>
                                        {row.Wed}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Wed !== 'Free'}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Wed !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Thu !== 'Free' ? 'red' : 'green'
                                }}>
                                    <Stack>
                                        {row.Thu}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Thu !== 'Free'}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Thu !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Fri !== 'Free' ? 'red' : 'green'
                                }}>
                                    <Stack>
                                        {row.Fri}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Fri !== 'Free'}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Fri !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Sat !== 'Free' ? 'red' : 'green'
                                }}>
                                    <Stack>
                                        {row.Sat}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Sat !== 'Free'}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Sat !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>

                                </TableCell>
                                <TableCell align="center" sx={{
                                    maxWidth: '6vw',
                                    bgcolor: rows[row.ts_id].Sun !== 'Free' ? 'red' : 'green'
                                }}>
                                    <Stack>
                                        {row.Sun}
                                        <ButtonGroup orientation="horizontal" size="small" variant="standard"
                                                     aria-label="outlined primary button group">
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Sun !== 'Free'}> Book </Button>
                                            <Button size="small" sx={{bgcolor: 'transparent', color: 'white'}}
                                                    disabled={rows[row.ts_id].Sun !== 'Booked'}> CXL </Button>
                                        </ButtonGroup>
                                    </Stack>


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )

}
export default USER_APPOINTMENT_VIEW;
