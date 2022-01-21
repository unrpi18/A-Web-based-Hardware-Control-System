import './Appointment_Admin.css'
import LOGO from "../../../components/logos/Logo";

import APPOINTMENT_ADMIN_TEXT from "./Appointment_Admin_Text";
import APPOINTMENT_ADMIN_VIEW from "./Appointment_Admin_View";


const APPOINTMENT_ADMIN = () => {
    return <div>
        <LOGO />
        <APPOINTMENT_ADMIN_TEXT/>
        <APPOINTMENT_ADMIN_VIEW/>
    </div>
}

export default APPOINTMENT_ADMIN