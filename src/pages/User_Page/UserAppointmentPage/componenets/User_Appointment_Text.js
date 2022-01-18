import {useContext} from "react";
import {UserContext} from "../../../../contexts/RegisterContext";

const USER_APPOINTMENT_TEXT = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);

    return <div>
           <h2>test</h2>
    </div>
}

export default USER_APPOINTMENT_TEXT