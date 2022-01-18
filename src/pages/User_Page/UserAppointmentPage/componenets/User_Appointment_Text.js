import {useContext} from "react";
import {UserContext} from "../../../../contexts/RegisterContext";

const USER_APPOINTMENT_TEXT = () => {
    const {value, setValue} = useContext(UserContext);
    return <div>
           <h2>{value}</h2>
    </div>
}

export default USER_APPOINTMENT_TEXT