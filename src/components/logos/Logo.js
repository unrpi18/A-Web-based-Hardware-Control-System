import logo from "./Teco.jpg";
import Kit_logo from "./Teco_logo.png";
import '../logos/Logo.css'

const LOGO = () => {
    return  <div>

        <img src={Kit_logo} className="Kit_Logo" alt="kit_logo" />
        <img  src={logo} className="Teco_Logo"  alt="logo"/>


    </div>
}

export default LOGO