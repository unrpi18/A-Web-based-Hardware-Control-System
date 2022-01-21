import './Admin_Main_Page.css'
import ADMIN_MAIN_PAGE_TEXT from "./Admin_Main_Page_Text";
import ADMIN_MAIN_PAGE_BUTTON from "./Admin_Main_Page_Button";
import LOGO from "../../../components/logos/Logo";
import ADMIN_MAIN_PAGE_SELECTION from "./Admin_Main_Page_Selection";


const ADMIN_MAIN_PAGE = () => {
    return <div>
        <LOGO />
        <ADMIN_MAIN_PAGE_TEXT />
        <ADMIN_MAIN_PAGE_BUTTON />
        <ADMIN_MAIN_PAGE_SELECTION />

    </div>
}

export default ADMIN_MAIN_PAGE