import MY_APPOINTMENT_VIEW from "./components/My_Appointment_View";
import LOGO from "../../../components/logos/Logo";
import USER_MAIN_PAGE_PROFILE from "../ExportUserProfile/User_Main_Page_Profile";
import USER_NAVI_PANEL from "../User_Navi/User_Navi_Panel";

const MY_APPOINTMENT_PAGE = () => {

    return <div>
        <LOGO/>
        <MY_APPOINTMENT_VIEW/>
        <USER_NAVI_PANEL/>
        <USER_MAIN_PAGE_PROFILE/>
    </div>


}

export default MY_APPOINTMENT_PAGE