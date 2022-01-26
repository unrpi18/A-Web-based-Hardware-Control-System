import {useContext} from "react";
import {UserContext} from "../../../../../contexts/RegisterContext";

const USER_APPOINTMENT_TEXT = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);

    return <div className="Title_set_all">
        <h1>WELCOME TO APPOINTMENT MANAGEMENT SYSTEM, {loginUser.firstName} </h1>
    </div>
}

export default USER_APPOINTMENT_TEXT