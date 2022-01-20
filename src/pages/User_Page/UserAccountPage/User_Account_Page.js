import USER_ACCOUNT_TEXT from "./components/User_Account_Text";
import LOGO from "../../../components/logos/Logo";
import User_Main_Page_Profile from "../ExportUserProfile/User_Main_Page_Profile";
import USER_ACCOUNT_FORM from "./components/User_Account_Form";

const USER_ACCOUNT_PAGE = () => {
    return (
        <div>
            <LOGO/>
            <USER_ACCOUNT_TEXT/>
            <USER_ACCOUNT_FORM/>
            <User_Main_Page_Profile/>
        </div>
    );
}

export default USER_ACCOUNT_PAGE;