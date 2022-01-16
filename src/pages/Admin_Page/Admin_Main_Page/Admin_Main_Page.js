import './Admin_Main_Page.css'
import ADMIN_MAIN_PAGE_TEXT from "./Admin_Main_Page_Text";
import ADMIN_MAIN_PAGE_BUTTON from "./Admin_Main_Page_Button";
import LOGO from "../../../components/logos/Logo";


const ADMIN_MAIN_PAGE = () => {
    return <div>
        <ADMIN_MAIN_PAGE_BUTTON />
        <ADMIN_MAIN_PAGE_TEXT />
        <LOGO />

    </div>
}

export default ADMIN_MAIN_PAGE