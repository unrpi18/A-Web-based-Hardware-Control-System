import React from "react";
import {useNavigate} from "react-router";


const Item = () => {
    const navigate = useNavigate();

    return <div>
        <h1 className="Welcome">Welcome to
            <span id="KIT_Green"> TECO-LAB </span> management</h1>

        <div>
            <button type="button" className="Register" onClick={() => navigate('/register')}> Register</button>
        </div>
        <button type="button" className="Login">Login</button>

    </div>

}

export default Item