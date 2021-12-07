import './Welcome_Page_Style.css'
import WELCOME_PAGE_BUTTON from "./components/Welcome_Page_Button";
import WELCOME_PAGE_TEXT from "./components/Welcome_Page_Text";
import LOGO from "../../components/logos/Logo";
const WELCOME_PAGE = () => {
    return <div>
        <WELCOME_PAGE_BUTTON />
        <WELCOME_PAGE_TEXT />
        <LOGO />

    </div>
}

export default WELCOME_PAGE