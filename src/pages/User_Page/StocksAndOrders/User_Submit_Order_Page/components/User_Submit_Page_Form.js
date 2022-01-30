import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {useNavigate} from "react-router";
import {isBlank} from "../../../ReusedMethod/checkInputFieldsIsBlank";
import {baseUrl, UserContext} from "../../../../../contexts/RegisterContext";
import '../User_Submit_Page_Style.css'

const USER_SUBMIT_PAGE_FORM = () => {
    const initialData = {itemName: '', amount: '', link: '', contact: ''}
    const [data, setData] = useState(initialData)
    const {loginUser} = useContext(UserContext);

    const handleSendApplication = (e) => {
        console.log(data)
        let nullCheck = isBlank(data.amount) && isBlank(data.itemName) && isBlank(data.link)
            && isBlank(data.contact)
        let email = loginUser.email;
        let itemName = data.itemName;
        let amount = data.amount;
        if (amount < 0) {
            alert("incorrect amount")
        }
        let itemLink = data.link;
        let contactEmail = data.contact;
        if (nullCheck) {
            const post = {itemName, amount, itemLink, contactEmail, description, email}


            console.log(post);

            fetch(baseUrl + "/orders/submitOrder", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                console.log(responseJson);

                let message = responseJson.message;
                console.log(message);

                if (message === "SUCCESS") {

                } else {
                    alert(message);
                }

            })


        } else {
            alert("Please fill the field(s) first!");
        }

    }
    const handleOnChange = (e, input) => {
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
            <div>
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
                    <p>


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
                    </p>
                ))}

            </div>
            <Button className='sendApplicationButton_submit_Order_page' variant='contained' color='success'
                    onClick={handleSendApplication}>
                Send Application
            </Button>
        </Box>

    )
}


export default USER_SUBMIT_PAGE_FORM