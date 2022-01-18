
import LOGO from "../../../components/logos/Logo";
import User_Main_Page_Form from "./components/User_Main_Page_Form";
import USER_MAIN_PAGE_TEXT from "./components/User_Main_Page_Text";

const USER_MAIN_PAGE = () => {
    return <div>
        <USER_MAIN_PAGE_TEXT/>
       <User_Main_Page_Form />
        <LOGO />

    </div>
}

export default USER_MAIN_PAGE