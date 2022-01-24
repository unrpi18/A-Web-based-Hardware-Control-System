import axios from 'axios';

import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import {styled} from "@mui/styles";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from "@mui/material/Stack"
import SaveIcon from '@mui/icons-material/Save';
export default function FILE_UPLOADER (){
    const Input = styled('input')({
        display: 'none',
    });
    const [selectedFile, setSelectedFile] = useState(null);


    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);

    };

    // On file upload (click the upload button)
    const onFileUpload = () => {
        const post = selectedFile;
        // Create an object of formData

        // Details of the uploaded file
        console.log(post);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", post);
    };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {

        if (selectedFile) {

            return (
                <div>
                    <Stack direction = "column" spacing ={2}>
                        <Typography variant = "h6">
                            File Details:
                        </Typography>
                        <Typography variant = "body">
                            File Name: {selectedFile.name}
                        </Typography>
                        <Typography variant = "body">
                            File Type: {selectedFile.type}
                        </Typography>
                        <Typography variant = "body">
                            Last Modified:{" "}
                            {selectedFile.lastModifiedDate.toDateString()}
                        </Typography>
                    </Stack>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };



    return (
        <div>
            <Stack direction = "column" alignItems="center" spacing ={3}>
                <Typography variant ="h5">
                    Upload Terms and Conditions File
                </Typography>
                <div>
                    <label htmlFor="contained-button-file">
                        <Input accept=".md" id="contained-button-file" type="file" onChange={onFileChange}/>
                        <Button variant="contained" component = "span" startIcon={<UploadFileIcon />}>
                            Upload
                        </Button>
                    </label>
                </div>
                {fileData()}
                <Button variant="contained" component = "span" startIcon={<SaveIcon />} onClick ={onFileUpload}>
                    Save
                </Button>
            </Stack>

        </div>
    );

}

