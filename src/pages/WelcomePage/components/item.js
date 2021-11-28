import {useNavigate} from "react-router";

const Item = () => {
    const navigate = useNavigate();

    return <div>
        <h1 className="Welcome">Welcome to
            <span id="KIT_Green"> TECO-LAB </span> management</h1>

        <button type="button" className="Register" onClick={() => navigate('/register')}> Register</button>
        <button type="button" className="Login" onClick={() => navigate('/login')}> Login</button>

    </div>

}

export default Item