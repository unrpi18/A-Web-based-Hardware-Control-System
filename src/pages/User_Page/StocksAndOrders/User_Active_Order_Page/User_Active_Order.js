import USER_ACTIVE_ORDER_VIEW from "./components/User_Active_Order_View";
import LOGO from "../../../../components/logos/Logo";
import USER_MAIN_PAGE_PROFILE from "../../ExportUserProfile/User_Main_Page_Profile";
import USER_NAVI_PANEL from "../../User_Navi/User_Navi_Panel";

const USER_ACTIVE_ORDER = () => {

    return <div>
        <LOGO/>
        <USER_MAIN_PAGE_PROFILE/>
        <USER_NAVI_PANEL/>
        <USER_ACTIVE_ORDER_VIEW/>
    </div>
}

export default USER_ACTIVE_ORDER