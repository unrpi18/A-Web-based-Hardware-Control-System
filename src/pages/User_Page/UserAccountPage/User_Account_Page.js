import USER_ACCOUNT_TEXT from "./components/User_Account_Text";
import LOGO from "../../../components/logos/Logo";
import User_Main_Page_Profile from "../ExportUserProfile/User_Main_Page_Profile";
import USER_ACCOUNT_READ_ONLY_FIELDS from "./components/User_Acoount_ReadOnlyFields";
import USER_NAVI_PANEL from "../User_Navi/User_Navi_Panel";

const USER_ACCOUNT_PAGE = () => {
    return (
        <div>
            <LOGO/>
            <USER_ACCOUNT_READ_ONLY_FIELDS/>
            <USER_ACCOUNT_TEXT/>
            <USER_NAVI_PANEL/>
            <User_Main_Page_Profile/>
        </div>
    );
}

export default USER_ACCOUNT_PAGE;