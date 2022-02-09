import {useContext, useEffect} from "react";
import {UserContext} from "../../../../contexts/RegisterContext";
import {useRefreshControlGet} from "../../ReusedMethod/storeDataPersistance";
import '../User_Main_Page_Style.css'
import backpic from "../components/backpic.jpg"

const USER_MAIN_PAGE_TEXT = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);

    useRefreshControlGet(setLoginUser);

    return <form className='"Title_set_all"'>

        <h1 className="Title_Set_Center_User_Main_Page"> Welcome to <span
            id='KIT_Green'> TECO-LAB User Management </span> , {loginUser.firstName}
            <p><img src={backpic} alt='logo' className='backpic_User_Main_Page'/></p></h1>

    </form>
}

export default USER_MAIN_PAGE_TEXT