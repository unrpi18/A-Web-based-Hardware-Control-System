
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(timeslot, mon, tue, wed, thu, fri, sat, sun) {
    return {timeslot, mon, tue, wed, thu, fri, sat, sun};
}

const APPOINTMENT_ADMIN_VIEW = () => {
    const row = [
        createData('08:00-10:00','Booked','Booked','occupied','Booked','Free','Booked','Free'),
        createData('10:00-12:00','Booked','Booked','occupied','Booked','Free','Booked','Free'),
        createData('12:00-14:00','N/A','Booked','Booked','occupied','Booked','Free','Free'),
        createData('14:00-16:00','Booked','Booked','occupied','Booked','Free','Booked','Free'),
        createData('16:00-18:00','Booked','Booked','occupied','Booked','Free','Booked','Free'),
    ];
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600, maxWidth : 1000, border : 2}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Time/Day</TableCell>
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
                    {row.map((row) => (
                        <TableRow
                            key={row.timeslot}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.timeslot}
                            </TableCell>
                            <TableCell align="center">{row.mon}</TableCell>
                            <TableCell align="center">{row.tue}</TableCell>
                            <TableCell align="center">{row.wed}</TableCell>
                            <TableCell align="center">{row.thu}</TableCell>
                            <TableCell align="center">{row.fri}</TableCell>
                            <TableCell align="center">{row.sat}</TableCell>
                            <TableCell align="center">{row.sun}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default APPOINTMENT_ADMIN_VIEW;
