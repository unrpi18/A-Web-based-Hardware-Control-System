

import LOGIN_PAGE_FORM from "./components/Login_Page_Form";
import 'Login_Page_Style.css'
import LOGIN_PAGE_TEXT from "./components/Login_Page_Text";
import LOGO from "../../components/logos/Logo";

const LOGIN_PAGE = () => {
  return <div>
      <LOGIN_PAGE_TEXT/>
      <LOGIN_PAGE_FORM/>
      <LOGO/>
  </div>
}

export default LOGIN_PAGE