import './Router_Web'
import './components/Components.css'
import {Route, Routes} from "react-router-dom";


import React, {useState} from 'react';
import WELCOME_PAGE from "./pages/Mixed_Page/WelcomePage/Welcome_Page";
import REGISTER_PAGE from "./pages/Mixed_Page/RegisterPage/Register_Page";
import LOGIN_PAGE from "./pages/Mixed_Page/LoginPage/Login_Page";
import ADMIN_MAIN_PAGE from "./pages/Admin_Page/Admin_Main_Page/Admin_Main_Page";
import APPOINTMENT_ADMIN from "./pages/Admin_Page/Appointment_Admin/Appointment_Admin";
import USER_APPOINTMENT_PAGE from "./pages/User_Page/UserAppointmentPage/User_Appointment_Page";
import USER_MAIN_PAGE from "./pages/User_Page/UserMainPage/User_Main_Page";
import {UserContext} from "./contexts/RegisterContext";
import FORGET_PASSWORD_PAGE from "./pages/Mixed_Page/ForgetPasswordPage/Forget_Password_Page";
import USER_ACCOUNT_PAGE from "./pages/User_Page/UserAccountPage/User_Account_Page";
import New_User_Management from "./pages/Admin_Page/New_User_Management/New_User_Management";


function Router_Web() {
    const initialLoginUser = {token: '', firstName: '', lastName: '', email: ''};
    const [loginUser, setLoginUser] = useState(initialLoginUser);

    return (
        <UserContext.Provider value={{loginUser, setLoginUser}}>
            <Routes>
                <Route exact path="/" element={<WELCOME_PAGE/>}/>
                <Route path="register" element={<REGISTER_PAGE/>}/>
                <Route path="login" element={<LOGIN_PAGE/>}/>
                <Route path="forget_password" element={<FORGET_PASSWORD_PAGE/>}/>
                <Route path='user_main_page' element={<USER_MAIN_PAGE/>}/>
                <Route path='user_appointment_page' element={<USER_APPOINTMENT_PAGE/>}/>
                <Route path='user_account_info' element={<USER_ACCOUNT_PAGE/>}/>
                <Route path='admin_main_page' element={<ADMIN_MAIN_PAGE/>}/>
                <Route path='appointment_admin' element={<APPOINTMENT_ADMIN/>}/>
                <Route path='new_user_management' element = {<New_User_Management/>}/>
            </Routes>
        </UserContext.Provider>
    );
}

export default Router_Web