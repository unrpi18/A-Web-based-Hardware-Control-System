import {useNavigate} from "react-router";
const WELCOME_PAGE_BUTTON = () => {
    const navigate = useNavigate();

    return <div>


        <button id='button' type="button" className="Register" onClick={() => navigate('/register')}> Register</button>
        <button id='button' type="button" className="Login" onClick={() => navigate('/login')}> Login</button>

    </div>

}

export default WELCOME_PAGE_BUTTON