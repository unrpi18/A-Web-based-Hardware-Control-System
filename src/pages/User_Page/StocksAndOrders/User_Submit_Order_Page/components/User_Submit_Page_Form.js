import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {useNavigate} from "react-router";
import {isBlank, validateEmail} from "../../../ReusedMethod/checkInputFields";
import {baseUrl} from "../../../../../contexts/RegisterContext";
import '../User_Submit_Page_Style.css'
import Dialog from "@mui/material/Dialog";
import {BootstrapDialogTitle} from "../../../ReusedMethod/BootstrapDialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";

const USER_SUBMIT_PAGE_FORM = () => {
    const initialData = {itemName: '', amount: '', link: '', contact: ''}
    const [data, setData] = useState(initialData)
    const [loginUser, setLoginUser] = useState(() => {
        const saved = localStorage.getItem("user")
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSendApplicationDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBackToUserMainPage = () => {
        navigate('/active_order')
    }

    const handleConfirm = () => {
        navigate('/submit_order')
        window.location.reload()
        handleClose()
    }

    const handleSendApplication = () => {
        console.log(data)
        let nullCheck = isBlank(data.amount) && isBlank(data.itemName) && isBlank(data.link)
            && isBlank(data.contact)
        let email = loginUser.email;
        let itemName = data.itemName;
        let amount = data.amount;
        if (amount < 0) {
            alert("incorrect amount")
            return
        }
        let itemLink = data.link;
        let contactEmail = data.contact;
        let emailCheck = validateEmail(contactEmail)

        let token = loginUser.token
        if (nullCheck) {
            if (!emailCheck) {
                alert("Please enter the correct email-format: xxx@yyy.zzz.");
                return;
            }
            const post = {itemName, amount, itemLink, contactEmail, description, email}


            console.log(post);

            fetch(baseUrl + "/orders/submitOrder", {
                method: 'POST',
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let message = responseJson.message;
                console.log(message);

                if (message === "succeed") {
                    handleSendApplicationDialog()
                } else {
                    alert(message);
                }

            })


        } else {
            alert("Please fill the field(s) first!");
        }

    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value})
    }

    const {itemName, amount, link, contact, description} = data
    return (

        <Box
            component="form"
            sx={{

                '& .MuiTextField-root': {m: 1, width: '40ch'},

            }}
            noValidate
            autoComplete="off"
            className='form_submit_order_page_position'

        >
            <Stack direction="column" alignItems="center" spacing={4}>
                {[{
                    "text": 'ItemName',
                    "value": itemName,
                    "type": 'text'
                },
                    {
                        "text": 'Amount',
                        "value": amount,
                        'type': 'number'
                    },
                    {
                        "text": 'Link',
                        "value": link,
                        "type": "email"

                    },
                    {
                        "text": 'Contact',
                        "value": contact,
                        "type": "email",
                    },
                ].map((input) => (
                    <TextField
                        required
                        name={input.text.replace(input.text[0], input.text[0].toLowerCase())}
                        type={input.type}
                        value={input.value}
                        key={input.text}
                        id="outlined-required"
                        label={input.text}
                        inputProps={{
                            style: {
                                fontSize: 20,

                            }
                        }}
                        onChange={(e) => handleOnChange(e, input)}
                    />

                ))}

            </Stack>
            <Button className='sendApplicationButton_submit_Order_page' variant='contained' color='success'
                    onClick={() => handleSendApplication()}>
                Send Application
            </Button>
            <Dialog
                onClose={handleClose}
                open={open}>
                <BootstrapDialogTitle color='#006356' onClose={handleClose}>
                    Information
                </BootstrapDialogTitle>
                <DialogContent>
                    <Typography color='gray'>
                        You have successfully sent your order.
                      <br/>
                        Do you have any other order to submit?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleBackToUserMainPage()}>
                        No,thanks
                    </Button>
                    <Button autoFocus onClick={() => handleConfirm()}>
                        Yes
                    </Button>


                </DialogActions>
            </Dialog>
        </Box>

    )
}


export default USER_SUBMIT_PAGE_FORM