import {useContext} from "react";
import {UserContext} from "../../../../../contexts/RegisterContext";

const USER_ACCOUNT_TEXT = () => {
    const {loginUser, setLoginUser} = useContext(UserContext)
    return (
        <div className="Title_set_all">
            <h1 className="Title_Set" id="KIT_Green">Hi, {loginUser.firstName}! Here Is Your Account Information </h1>
        </div>
    )
}

export default USER_ACCOUNT_TEXT