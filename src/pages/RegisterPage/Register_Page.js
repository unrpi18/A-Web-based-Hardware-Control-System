

import REGISTER_PAGE_FORM from "./components/Register_Page_Form";
import 'Register_Page_Style.css'
import REGISTER_PAGE_TEXT from "./components/Register_Page_Text";
import LOGO from "../logos/Logo";


const REGISTER_PAGE = () => {
    return <div>
        <REGISTER_PAGE_TEXT />
        <REGISTER_PAGE_FORM />
        <LOGO />
    </div>
}

export default REGISTER_PAGE