import {useContext, useEffect} from "react";
import {UserContext} from "../../../../contexts/RegisterContext";
import {useRefreshControlGet, useRefreshControlSet} from "../../checkMethod/storeDataPersistance";
import '../User_Main_Page_Style.css'

const USER_MAIN_PAGE_TEXT = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);
    useRefreshControlGet(setLoginUser);
    useRefreshControlSet(loginUser);
    return <form className='"Title_set_all"'>

        <h1 className="Title_Set_Center_User_Main_Page"> Welcome to <span
            id='KIT_Green'> TECO-LAB Management </span> , {loginUser.firstName}</h1>

    </form>
}

export default USER_MAIN_PAGE_TEXT