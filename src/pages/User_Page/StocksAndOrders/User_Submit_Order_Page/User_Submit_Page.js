import LOGO from "../../../../components/logos/Logo";
import USER_MAIN_PAGE_PROFILE from "../../ExportUserProfile/User_Main_Page_Profile";
import USER_NAVI_PANEL from "../../User_Navi/User_Navi_Panel";
import USER_SUBMIT_PAGE_FORM from "./components/User_Submit_Page_Form";
import USER_SUBMIT_PAGE_TEXT from "./components/User_Submit_Page_Text";

const USER_SUBMIT_PAGE = () => {

    return <div>
        <LOGO/>
        <USER_SUBMIT_PAGE_TEXT/>
        <USER_MAIN_PAGE_PROFILE/>
        <USER_NAVI_PANEL/>
        <USER_SUBMIT_PAGE_FORM/>
    </div>
}

export default USER_SUBMIT_PAGE