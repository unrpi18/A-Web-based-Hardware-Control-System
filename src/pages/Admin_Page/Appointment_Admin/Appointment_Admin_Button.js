import {useNavigate} from "react-router";

const APPOINTMENT_ADMIN_BUTTON = () => {
    function navigate(String){
        fetch("url",{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify('session_state')
        }).then(() => { console.log("success")});
    }

    return <div>
        <button id = 'button_big' type = "button" className = "LOGOUT_APPOINTMENT_ADMIN"
                onClick={()=> navigate('/')} > Logout
        </button>
        <button id = 'button_super' type = "button" className = "ALL_APPOINTMENT_ADMIN"
                onClick={()=> navigate('/')} > All Appointments
        </button>
        <button id = 'button_super' type = "button" className = "SET_TIME_SLOTS_STATUS_ADMIN"
                onClick={()=> navigate('/')} > Set Time Slots
        </button>
        <button id = 'button_super' type = "button" className = "BOOK_APPOINTMENT_ADMIN"
                onClick={()=> navigate('/')} > Book Appointment
        </button>

    </div>
}

export default APPOINTMENT_ADMIN_BUTTON