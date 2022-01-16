import {useNavigate} from "react-router";

const USER_MAIN_PAGE_FORM = () => {
    const navigate = useNavigate();

    return <div>

        <button id='button_big' type="button" className="Register_button_welcome_page"
                onClick={() => navigate('/register')}> Appointment Management
        </button>
        <button id='button_big' type="button" className="Login_button_welcome_page"
                onClick={() => navigate('/login')}> Login
        </button>

    </div>

}

export default USER_MAIN_PAGE_FORM