import LOGO from "../../../components/logos/Logo";
import USER_APPOINTMENT_TEXT from "./componenets/User_Appointment_Text";
import USER_APPOINTMENT_VIEW from "./componenets/User_Appointment_View";
import USER_APPOINTMENT_BUTTON from "./componenets/User_Appointment_Button";
import USER_MAIN_PAGE_PROFILE from "../ExportUserProfile/User_Main_Page_Profile";

const USER_APPOINTMENT_PAGE = () => {
    return <div>
        <LOGO/>
        <USER_MAIN_PAGE_PROFILE/>
        <USER_APPOINTMENT_BUTTON/>
        <USER_APPOINTMENT_TEXT/>
        <USER_APPOINTMENT_VIEW/>


    </div>


}

export default USER_APPOINTMENT_PAGE