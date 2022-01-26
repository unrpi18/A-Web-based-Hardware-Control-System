import USER_STOCK_VIEW from "./components/User_Stock_View";
import LOGO from "../../../../components/logos/Logo";
import USER_MAIN_PAGE_PROFILE from "../../ExportUserProfile/User_Main_Page_Profile";
import USER_NAVI_PANEL from "../../User_Navi/User_Navi_Panel";

const USER_STOCK_PAGE = () => {

    return <div>
        <LOGO/>
        <USER_MAIN_PAGE_PROFILE/>
        <USER_NAVI_PANEL/>
        <USER_STOCK_VIEW/>
    </div>
}
export default USER_STOCK_PAGE