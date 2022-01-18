import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function isDateLegal(str) {
    const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const regExp = new RegExp(reg);
    return regExp.test(str);
}

const USER_APPOINTMENT_VIEW = () => {
    const [date, setDate] = useState('')
    const handleConfirm = (e) => {
        e.preventDefault();
        let nullCheck = isDateLegal(date)
        if (nullCheck) {
            const post = {date};
            fetch("url", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(() => {
                console.log("success");
            })
        } else {
            alert("please enter an valid date in yyyy-mm-dd");
        }
    }
    function createData(ts, av, ) {
        return { ts, av};
    }

    const rows = [
        createData('08:00-10:00', 'Booked'),
        createData('10:00-12:00', 'N/A'),
        createData('12:00-14:00', 'N/A'),
        createData('14:00-16:00', 'Free'),
        createData('16:00-18:00', 'Free')
    ];
    return (
        <div>
            <form className="DATE_PICKER_FORM">
                <div className='DATE_PICKER'>
                    <label id='label-big'> Enter A Date</label>
                    <input id='input1' type="date"
                           required
                           value={date}
                           onChange={(e) => setDate(e.target.value)}/>
                    <button id='button_medium' className="CONFIRM_APPOINTMENT_ADMIN"
                            onClick={handleConfirm}>Confirm
                    </button>
                </div>
            </form>
            <TableContainer >
                <Table sx={{maxWidth : '35vw' , ml:'35vw', mt : '25vh' }} aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{  border: 2 }}>
                            <TableCell align="center">Time Slot</TableCell>
                            <TableCell align="center">Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.ts}
                                sx={{  border: 2 }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.ts}
                                </TableCell>
                                <TableCell align="center">{row.av}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )


}
export default USER_APPOINTMENT_VIEW;
