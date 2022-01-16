import {useNavigate} from "react-router";

const ADMIN_MAIN_PAGE_BUTTON = () => {
    const navigate = useNavigate();
    return <div>
        <button id = 'button_big' type = "button" className = "LOGOUT_ADMIN_MAIN_PAGE"
                onClick={()=> navigate('/')} > Logout
        </button>
        <button id = 'button_super' type = "button" className = "APPOINTMENT_ADMIN_MAIN_PAGE"
                onClick={()=> navigate('/')} > Appointment
        </button>
        <button id = 'button_super' type = "button" className = "STOCK_AND_ORDER_ADMIN_MAIN_PAGE"
                onClick={()=> navigate('/')} > Stock & Order
        </button>
        <button id = 'button_super' type = "button" className = "WEBCAM_ADMIN_MAIN_PAGE"
                onClick={()=> navigate('/')} > Webcam
        </button>
        <button id = 'button_super' type = "button" className = "USER_GROUP_MANAGEMENT_ADMIN_MAIN_PAGE"
                onClick={()=> navigate('/')} > User Group Management
        </button>
        <button id = 'button_super' type = "button" className = "T_AND_C_UPDATE_ADMIN_MAIN_PAGE"
                onClick={()=> navigate('/')} > T & C Update
        </button>
    </div>
}

export default ADMIN_MAIN_PAGE_BUTTON