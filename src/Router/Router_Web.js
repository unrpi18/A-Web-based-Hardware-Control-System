import './Router_Web'
import '../components/Components.css'
import {NavLink, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import WELCOME_PAGE from "../pages/Mixed_Page/WelcomePage/Welcome_Page";
import REGISTER_PAGE from "../pages/Mixed_Page/RegisterPage/Register_Page";
import LOGIN_PAGE from "../pages/Mixed_Page/LoginPage/Login_Page";
import ADMIN_MAIN_PAGE from "../pages/Admin_Page/Admin_Main_Page/Admin_Main_Page";
import APPOINTMENT_ADMIN from "../pages/Admin_Page/Appointment_Admin/Appointment_Admin";
import USER_APPOINTMENT_PAGE from "../pages/User_Page/UserAppointmentPage/User_Appointment_Page";
import USER_MAIN_PAGE from "../pages/User_Page/UserMainPage/User_Main_Page";
import {UserContext} from "../contexts/RegisterContext";
import FORGET_PASSWORD_PAGE from "../pages/Mixed_Page/ForgetPasswordPage/Forget_Password_Page";
import USER_ACCOUNT_PAGE from "../pages/User_Page/UserAccountPage/User_Account_Page";
import New_User_Management from "../pages/Admin_Page/New_User_Management/New_User_Management";
import User_Group_Management from "../pages/Admin_Page/User_Group_Management/User_Group_Management";
import ADMINISTRATOR_MANAGEMENT from "../pages/Admin_Page/Administrator_Management/Administrator_Management";
import ALL_APPOINTMENT_ADMIN from "../pages/Admin_Page/All_Appointment_Admin/All_Appointment_Admin";

import NotFound from "./NotFound";


function Router_Web() {
    const initialLoginUser = {token: '', firstName: '', lastName: '', email: '', isLogged: false};
    const [loginUser, setLoginUser] = useState(initialLoginUser);

    return (
        <UserContext.Provider value={{loginUser, setLoginUser}}>


            <Routes>
                <Route exact path="/" element={<WELCOME_PAGE/>}/>
                <Route path="register" element={<REGISTER_PAGE/>}/>
                <Route path="login" element={<LOGIN_PAGE/>}/>
                <Route path="forget_password" element={<FORGET_PASSWORD_PAGE/>}/>
                <Route path='user_main_page' element={loginUser.isLogged ? <USER_MAIN_PAGE/> : <NotFound/>}/>
                <Route path='user_appointment_page' element={<USER_APPOINTMENT_PAGE/>}/>
                <Route path='user_account_info' element={<USER_ACCOUNT_PAGE/>}/>
                <Route path='admin_main_page' element={<ADMIN_MAIN_PAGE/>}/>
                <Route path='appointment_admin' element={<APPOINTMENT_ADMIN/>}/>
                <Route path='new_user_management' element={<New_User_Management/>}/>
                <Route path='user_group_management' element={<User_Group_Management/>}/>
                <Route path='admin_management' element={<ADMINISTRATOR_MANAGEMENT/>}/>
                <Route path='all_appointment_admin' element={<ALL_APPOINTMENT_ADMIN/>}/>
            </Routes>

        </UserContext.Provider>
    );
}

export default Router_Web