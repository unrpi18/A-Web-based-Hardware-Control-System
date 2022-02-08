import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React, {useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {url} from "../Navi_base";
import {useNavigate} from "react-router";
import TextField from "@mui/material/TextField";

export default function WEBCAM_ADMIN_VIEW(){
    const [duration, setDuration] = useState();
    const [identification, setIdentification] = useState(false);
    const [resolution, setResolution] = useState()
    const navigate = useNavigate();
    const durationOnchange =(e)=>{
        setDuration(e.target.value);

    }
    const resolutionOnchange=(e)=>{
        setResolution(e.target.value);

    }
    function duration_change (){
        identification_process();
        if(identification === false){
            console.log('fail!')
        }else {
            const max_download_time = duration;
            const post = {max_download_time};
            fetch('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/change_max_download_time', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);
            })
        }
    }
    function identification_process(){
        fetch(url + '/webcam/adminWebcamAccess', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            setIdentification(responseJson.resultCode === 200);
        })
    }
    function setting_update(){
        identification_process();
        if(identification === false){
            console.log('fail!')
        }else {
            const post = {resolution};
            fetch('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/change_resolution', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);
            })
        }
    }
    function download_test(){
        const start_time = '00_00_00';
        const end_time = '00_01_00';
        window.open('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/download?start_time='+start_time+'&end_time='+end_time);
    }
    return (
        <div>
            <Stack direction = "column" alignItems="center" spacing ={3}>
                <Button variant="contained" startIcon={<LiveTvIcon/>} onClick={()=> window.open('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/640')}>
                    View Stream
                </Button>
                <Typography variant ="h5">
                    Update download and recording configuration
                </Typography>
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="time_slot_book_label">Resolution*</InputLabel>
                        <Select
                            label="Resolution"
                            value={resolution}
                            onChange={resolutionOnchange}
                            fullWidth
                        >
                            <MenuItem disabled value={320}>320 x 240</MenuItem>
                            <MenuItem disabled value={480}>480 x 320</MenuItem>
                            <MenuItem value={640}>640 x 480</MenuItem>
                            <MenuItem disabled value={1280}>1280 x 720</MenuItem>
                            <MenuItem value={1920}>1920 x 1080</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button variant="contained" component = "span" startIcon={<UpdateIcon />} onClick ={setting_update}>
                    Update
                </Button>
                <div>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        id="rpt"
                        label="Max. Duration of Downloading"
                        type="number"
                        fullWidth
                        variant="standard"
                        value ={duration}
                        onChange={durationOnchange}
                    />
                </div>
                <Button variant="contained" component = "span" startIcon={<UpdateIcon />} onClick ={duration_change}>
                    Update
                </Button>
            </Stack>

        </div>
    );
}