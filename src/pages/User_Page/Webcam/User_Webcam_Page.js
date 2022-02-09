import USER_WEBCAM_VIEW from "./components/User_Webcam_View";
import USER_NAVI_PANEL from "../User_Navi/User_Navi_Panel";
import USER_MAIN_PAGE_PROFILE from "../ExportUserProfile/User_Main_Page_Profile";
import LOGO from "../../../components/logos/Logo";

const USER_WEBCAM_PAGE = () => {
    return (
        <div>
            <LOGO/>
            <USER_WEBCAM_VIEW/>
            <USER_NAVI_PANEL/>
            <USER_MAIN_PAGE_PROFILE/>

        </div>
    )
}

export default USER_WEBCAM_PAGE