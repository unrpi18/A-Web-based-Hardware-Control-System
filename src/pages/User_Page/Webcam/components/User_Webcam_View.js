import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {LocalizationProvider, TimePicker} from "@mui/lab";
import '../User_Webcam_Page_Style.css'

const USER_WEBCAM_VIEW = () => {
    const [start_timeGlobal, setStartTime] = useState(new Date())
    const [end_timeGlobal, setEndTime] = useState(new Date())
    const [resolution, setResolution] = useState(640)
    const [loginUser, setLoginUser] = useState(() => {
        const saved = localStorage.getItem("user")
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })

    useEffect(() => {
        fetch('http://64a1-2a02-3038-40d-bbc8-5c83-3cef-eac0-855d.ngrok.io/get_resolution', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(responseJson => {
            if (responseJson.code === 200) {
                setResolution(responseJson.current_resolution);
            }
        })
    }, [])


    console.log(resolution)
    const handleConfirm = () => {
        const start_timeLocal = start_timeGlobal.toLocaleTimeString()
        const end_timeLocal = end_timeGlobal.toLocaleTimeString()


        if (checkStartTimeAndEndTime()) {
            let start_time = start_timeLocal.replaceAll(':', '_')
            let end_time = end_timeLocal.replaceAll(':', '_')
            const post = {start_time, end_time}
            console.log(post)
            window.open('http://64a1-2a02-3038-40d-bbc8-5c83-3cef-eac0-855d.ngrok.io/download?start_time=' + start_time + '&end_time=' + end_time);
        } else {
            alert("Please enter the correct start/end time")
        }


    }

    function checkStartTimeAndEndTime() {

        return (start_timeGlobal - end_timeGlobal < 0)

    }


    return (
        <form style={{height: 400, width: 300}}>
            <Stack direction="column" alignItems="center" spacing={4} className='User_Webcam_Page_Style'>
                <Button variant="contained" startIcon={<LiveTvIcon/>}
                        className='User_Webcam_View_Stream'
                        onClick={() => window.open('http://64a1-2a02-3038-40d-bbc8-5c83-3cef-eac0-855d.ngrok.io/' + resolution)}>
                    View Stream
                </Button>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label='Start Time'
                        value={start_timeGlobal}
                        onChange={(newValue) => {
                            setStartTime(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        height={400}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        ampm={false}
                        openTo="hours"
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        mask="__:__:__"
                        label='End Time'
                        value={end_timeGlobal}
                        onChange={(newValue) => {
                            setEndTime(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>


                <Button variant="contained" component="span" startIcon={<UpdateIcon/>}
                        onClick={() => handleConfirm()}>
                    Confirm
                </Button>
            </Stack>

        </form>
    );
}

export default USER_WEBCAM_VIEW