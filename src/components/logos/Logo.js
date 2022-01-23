import logo from "./Teco.jpg";
import Kit_logo from "./Teco_logo.png";
import '../logos/Logo.css'
import Box from "@mui/material/Box";

const LOGO = () => {
    return <Box
        sx={{
            display: 'flex',
            '& > *': {
                m: 2,

            },
        }}
        className='form_logo_page'

    >

        <img src={Kit_logo} className="Kit_Logo" alt="kit_logo"/>
        <img src={logo} className="Teco_Logo" alt="logo"/>


    </Box>
}

export default LOGO