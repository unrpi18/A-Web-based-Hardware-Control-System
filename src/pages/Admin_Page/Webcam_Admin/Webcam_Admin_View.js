import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import {useState} from "react";
import {TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {url} from "../Navi_base";
import {useNavigate} from "react-router";

export default function WEBCAM_ADMIN_VIEW(){
    const [duration, setDuration] = useState('');

    const [resolution, setResolution] = useState([''][''])
    const navigate = useNavigate();
    const durationOnchange =(e)=>{
        setDuration(e.target.value);
    }
    const resolutionOnchange=(e)=>{
        setResolution(e.target.value);
    }

    function refreshPage(){
        fetch(url +'/users/getAllUsers', {
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
                window.sessionStorage.setItem('token', responseJson.token)

            }
            else if(resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage);
            }else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }
        })
    }

    return (
        <div>
            <Stack direction = "column" alignItems="center" spacing ={3}>
                <Button variant="contained" startIcon={<LiveTvIcon/>} onClick={()=> window.open('192.168.1.1')}>
                    View Stream
                </Button>
                <Typography variant ="h5">
                    Update download and recording configuration
                </Typography>
                <div>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="Maximum download"
                        label="maximum download duration"
                        fullWidth
                        variant="standard"
                        value={duration}
                        onChange={durationOnchange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="time_slot_book_label">Resolution*</InputLabel>
                        <Select
                            label="Resolution"
                            value={resolution}
                            onChange={resolutionOnchange}
                        >
                            <MenuItem value={['320']['240']}>320 x 240</MenuItem>
                            <MenuItem value={1}>480 x 320</MenuItem>
                            <MenuItem value={2}>640 x 480</MenuItem>
                            <MenuItem value={3}>1280 x 720</MenuItem>
                            <MenuItem value={4}>1920 x 1080</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button variant="contained" component = "span" startIcon={<UpdateIcon />} onClick ={onFileUpload}>
                    Update
                </Button>
            </Stack>

        </div>
    );
}