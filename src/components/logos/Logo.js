import logo from "./Teco.jpg";
import Kit_logo from "./Teco_logo.png";

const LOGO = () => {
    return <div className="div_position">
        <img src={Kit_logo} className="Kit_Logo" alt="kit_logo" />
        <img  src={logo} className="Teco_Logo"  alt="logo"/>

    </div>
}

export default LOGO