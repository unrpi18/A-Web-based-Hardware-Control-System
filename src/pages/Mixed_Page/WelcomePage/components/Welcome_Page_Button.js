import {useNavigate} from "react-router";


const WELCOME_PAGE_BUTTON = () => {
    const navigate = useNavigate();

    return <div>

        <button id='button_big' type="button" className="Register_button_welcome_page"
                onClick={() => navigate('/register')}> Register
        </button>
        <button id='button_big' type="button" className="Login_button_welcome_page"
                onClick={() => navigate('/login')}> Login
        </button>

    </div>

}

export default WELCOME_PAGE_BUTTON