import resetPasswordLogo from './icons8-forget password.png'
import '../Forget_Password_Page_Style.css'

const FORGET_PASSWORD_PAGE_TEXT = () => {
    return <form className='"Title_set_all"'>

        <h1 className="Title_set_forget_password_page">
            <img src={resetPasswordLogo} alt='logo' id='icon_forget_password_page'/> Reset Your <span
            id='KIT_Green'> TECO-Lab Account </span> Password</h1>

    </form>
}

export default FORGET_PASSWORD_PAGE_TEXT