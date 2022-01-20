import React, {useContext} from "react";
import {UserContext} from "../../../../contexts/RegisterContext";
import '../User_Account_Page_Style.css'
import {useRefreshControlGet, useRefreshControlSet} from "../../checkMethod/storeDataPersistance";

const USER_ACCOUNT_FORM = () => {
    const {loginUser, setLoginUser} = useContext(UserContext)
    useRefreshControlGet(setLoginUser);
    useRefreshControlSet(loginUser);
    return (
        <form className='form_account_information_page'>

            <div className='email_account_information_page'>
                <label id='label_big'>E-mail </label>
                <input className='input_style_account_information_page' id='input_account_information_page'
                       type="email"
                       readOnly value={loginUser.email}/>
            </div>

            <div className='firstname_account_information_page'>
                <label id='label_big'>Firstname </label>
                <input className='input_style_account_information_page' id='input_account_information_page'
                       readOnly value={loginUser.firstName}/>
            </div>

            <div className='lastname_account_information_page'>
                <label id='label_big'>Lastname </label>
                <input className='input_style_account_information_page' id='input_account_information_page'
                       readOnly value={loginUser.lastName}/>
            </div>
        </form>
    )
}

export default USER_ACCOUNT_FORM