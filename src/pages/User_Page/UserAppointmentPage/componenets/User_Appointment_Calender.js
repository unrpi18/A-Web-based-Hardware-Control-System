import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';


import {useState} from "react";
import {DatePicker, DateTimePicker} from "@mui/lab";
import {Box} from "@mui/material";
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        position:"absolute",
        left: 300,
    },
});
const USER_APPOINTMENT_CALENDER = () => {
    const [value, setValue] = useState(new Date());
    const classes = useStyles();
    const [disableDate, setDisableDate] = useState(new Date());
    const [disableTime, setDisableTime] = useState('');
    const [disableYear, setDisableYear] = useState('2020');
    return (

        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns} className={useStyles().root}>

                <DateTimePicker
                    label="Appointment Book"
                    value={value}
                    shouldDisableDate={isWeekend}

                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

        </div>



    );
}
export default USER_APPOINTMENT_CALENDER
