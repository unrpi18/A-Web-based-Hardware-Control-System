import {useNavigate} from "react-router";


const USER_MAIN_PAGE_FORM = () => {
    const navigate = useNavigate();


    const handleAppointment = (e) => {
        e.preventDefault();
        navigate('/user_appointment_page');

    }


    return <div>

        <button id='button_super' type="button" className="APPOINTMENT_ADMIN_MAIN_PAGE"
                onClick={handleAppointment}> Appointment
        </button>
        <button id='button_super' type="button" className="STOCK_AND_ORDER_ADMIN_MAIN_PAGE"
                onClick={() => navigate('/')}> Stock & Order
        </button>
        <button id='button_super' type="button" className="WEBCAM_ADMIN_MAIN_PAGE"
                onClick={() => navigate('/')}> Webcam
        </button>
    </div>
}


export default USER_MAIN_PAGE_FORM