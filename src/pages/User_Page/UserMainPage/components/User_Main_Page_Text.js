import {useContext, useEffect} from "react";
import {UserContext} from "../../../../contexts/RegisterContext";
import {useRefreshControlGet, useRefreshControlSet} from "../../checkMethod/storeDataPersistance";

const USER_MAIN_PAGE_TEXT = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);
    useRefreshControlGet(setLoginUser);
    useRefreshControlSet(loginUser);
    return <div className="Title_set_all">
        <h1 className="Title_Set">WELCOME TO </h1>
        <h2 className="TECO_LAB_TEXT" id="KIT_Green">TECO-LAB
            <span> MANAGEMENT, {loginUser.firstName} </span></h2>

    </div>
}

export default USER_MAIN_PAGE_TEXT