import './Admin_Main_Page.css'
import ADMIN_MAIN_PAGE_TEXT from "./Admin_Main_Page_Text";
import ADMIN_MAIN_PAGE_BUTTON from "./Admin_Main_Page_Button";

import ADMIN_MAIN_PAGE_SELECTION from "./Admin_Main_Page_Selection";
import Admin_Profile from "../Admin_Icon/Admin_Profile";


const ADMIN_MAIN_PAGE = () => {
    return <div>
        <Admin_Profile/>
        <ADMIN_MAIN_PAGE_TEXT />
        <ADMIN_MAIN_PAGE_BUTTON />
        <ADMIN_MAIN_PAGE_SELECTION />

    </div>
}

export default ADMIN_MAIN_PAGE