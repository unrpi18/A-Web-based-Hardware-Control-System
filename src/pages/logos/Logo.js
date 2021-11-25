import logo from "./Teco.jpg";
import Kit_logo from "./WechatIMG3096.png";

const Logo = () => {
    return <div className="div_position">
        <img src={Kit_logo} className="Kit_Logo" alt="kit_logo" />
        <img  src={logo} className="Teco_Logo"  alt="logo"/>

    </div>
}

export default Logo