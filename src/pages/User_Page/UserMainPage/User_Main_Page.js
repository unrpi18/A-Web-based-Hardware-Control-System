import LOGO from "../../../components/logos/Logo";
import USER_MAIN_PAGE_TEXT from "./components/User_Main_Page_Text";
import USER_MAIN_PAGE_PROFILE from "../ExportUserProfile/User_Main_Page_Profile";
import USER_MAIN_PAGE_FORM from "./components/User_Main_Page_Form";

const USER_MAIN_PAGE = () => {
    return <div>
        <USER_MAIN_PAGE_TEXT/>
        <USER_MAIN_PAGE_FORM/>
        <USER_MAIN_PAGE_PROFILE/>
        <LOGO/>

    </div>
}

export default USER_MAIN_PAGE