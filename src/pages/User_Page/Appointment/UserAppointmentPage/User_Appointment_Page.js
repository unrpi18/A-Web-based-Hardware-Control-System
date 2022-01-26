import LOGO from "../../../../components/logos/Logo";
import USER_APPOINTMENT_TEXT from "./componenets/User_Appointment_Text";
import USER_APPOINTMENT_VIEW from "./componenets/User_Appointment_View";
import USER_MAIN_PAGE_PROFILE from "../../ExportUserProfile/User_Main_Page_Profile";
import USER_NAVI_PANEL from "../../User_Navi/User_Navi_Panel";

const USER_APPOINTMENT_PAGE = () => {
    return <div>
        <LOGO/>
        <USER_MAIN_PAGE_PROFILE/>
        <USER_APPOINTMENT_TEXT/>
        <USER_APPOINTMENT_VIEW/>
        <USER_NAVI_PANEL/>

    </div>


}

export default USER_APPOINTMENT_PAGE