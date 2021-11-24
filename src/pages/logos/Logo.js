import logo from "./Teco.png";
import Kit_logo from "./WechatIMG3096.png";

const Logo = () => {
    return <div>

        <img  src={logo} className="Logos"  alt="logo"/>
        <img src={Kit_logo} className="Kit_Logo" alt="kit_logo" />
    </div>
}

export default Logo