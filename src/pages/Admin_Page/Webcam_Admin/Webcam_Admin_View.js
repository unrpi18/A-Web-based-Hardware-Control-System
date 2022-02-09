import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React, {useEffect, useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {url} from "../Navi_base";
import {useNavigate} from "react-router";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Dialog} from "@mui/material";

export default function WEBCAM_ADMIN_VIEW(){
    const [duration, setDuration] = useState(0);
    const [identification, setIdentification] = useState(true);
    const [resolution, setResolution] = useState(0)
    const navigate = useNavigate();
    const [resolution_open, setResolution_open]= useState(false);
    const [duration_open, setDuration_open] = useState(false)

    useEffect(() => {
        identification_process();
        fetchResolution();
        fetchDuration();
    }, [])
    const durationOnchange =(e)=>{
        setDuration(e.target.value);

    }
    const resolutionOnchange=(e)=>{
        setResolution(e.target.value);
    }

    function fetchResolution(){
        if(identification === false){
            alert('invalid access, you are being logged out.')
            navigate('/')
        }else {
            fetch('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/get_resolution', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                }
            }).then(response => response.json()).then(responseJson => {
                if(responseJson.code === 200){
                    setResolution(responseJson.current_resolution);
                } else{
                    alert('invalid access, you are being logged out.')
                    navigate('/');
                }
            })
        }
    }

    function fetchDuration(){
        if(identification === false){
            alert('invalid access, you are being logged out.')
            navigate('/')
        }else {
            fetch('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/get_max_download_time', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                }
            }).then(response => response.json()).then(responseJson => {

                if(responseJson.code === 200){
                    setDuration(responseJson.max_download_time);
                } else{
                    alert('invalid access, you are being logged out.')
                    navigate('/');
                }
            })
        }
    }

    function handleConfirm(command){
        identification_process();
        if(identification === false){
            alert('invalid access, you are being logged out.')
            navigate('/')
        }else {
            const post = (command === 'resolution') ? {resolution} : {duration};
            const ending = (command === 'resolution') ? 'change_resolution' : 'change_max_download_time';
            fetch('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/' + ending, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {

                if(responseJson.code === 200){
                    alert('Change has been saved');
                    fetchResolution()
                    fetchDuration();
                }else{
                    alert('invalid access, you are being logged out.')
                    navigate('/')
                }
            })
            handleResolutionClose();
            handleDurationClose();
        }
    }
    function resolution_dialog(){
        return(
            <Dialog open={resolution_open} onClose={handleResolutionClose}>
                <DialogTitle>Modify the resolution of recording and streaming</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="time_slot_book_label">Resolution*</InputLabel>
                        <Select
                            label="Resolution"
                            value={resolution}
                            onChange={resolutionOnchange}
                        >
                            <MenuItem disabled value={320}>320 x 240</MenuItem>
                            <MenuItem disabled value={480}>480 x 320</MenuItem>
                            <MenuItem value={640}>640 x 480</MenuItem>
                            <MenuItem disabled value={1280}>1280 x 720</MenuItem>
                            <MenuItem value={1920}>1920 x 1080</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleResolutionClose}>Close</Button>
                    <Button onClick={()=>handleConfirm('resolution')}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function handleResolutionOpen(){
        fetchResolution()
        setResolution_open(true);
    }
    function handleResolutionClose(){
        setResolution_open(false);
    }
    function handleDurationOpen(){
        fetchDuration()
        setDuration_open(true);
    }
    function handleDurationClose(){
        setDuration_open(false);
    }
    function duration_dialog(){
        return(
            <Dialog open={duration_open} onClose={handleResolutionClose}>
                <DialogTitle>Modify longest duration of download</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please give the longest duration of download, in min
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="dense"
                        id="rpt"
                        label="Max. Duration of Download"
                        type="number"
                        fullWidth
                        variant="standard"
                        value ={duration}
                        onChange={durationOnchange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDurationClose}>Close</Button>
                    <Button onClick={()=>handleConfirm('duration')}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
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
            setIdentification(responseJson.resultCode === 200);
        })
    }
    async function handleOpenStream() {
        window.open('http://f072-2a02-3038-410-ae52-2509-5e98-277e-19e1.ngrok.io/' + resolution);
    }
    return (
        <div>
            <Stack direction = "column" alignItems="center" spacing ={6}>
                <Button variant="contained" startIcon={<LiveTvIcon/>} onClick={handleOpenStream}>
                    View Stream
                </Button>
                <Typography variant ="h5">
                    Update download and recording configuration
                </Typography>
                {duration_dialog()}
                <Button variant="contained" component = "span" startIcon={<UpdateIcon />} onClick ={handleDurationOpen}>
                    Update Download Duration
                </Button>
                {resolution_dialog()}
                <Button variant="contained" component = "span" startIcon={<UpdateIcon />} onClick ={handleResolutionOpen}>
                    Update Resolution
                </Button>
            </Stack>

        </div>
    );
}