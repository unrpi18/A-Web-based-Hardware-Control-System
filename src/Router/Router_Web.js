import './Router_Web'
import '../components/Components.css'
import {Route, Routes} from "react-router-dom";
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
import USER_MANAGEMENT from "../pages/Admin_Page/User_Management/User_Management";
import ADMINISTRATOR_MANAGEMENT from "../pages/Admin_Page/Administrator_Management/Administrator_Management";
import ALL_APPOINTMENT_ADMIN from "../pages/Admin_Page/All_Appointment_Admin/All_Appointment_Admin";

import NotFound from "./NotFound";
import USER_GROUP_NAVI_PAGE from "../pages/Admin_Page/User_Group_Navi_Page/User_Group_Navi_Page";
import MY_APPOINTMENT_PAGE from "../pages/User_Page/My_Appointment_Page/My_Appointment_Page";
import TERMS_AND_CONDITIONS_UPDATE from "../pages/Admin_Page/Terms_And_Conditions_Update/Terms_And_Conditions_Update";
import STOCK_ADMIN from "../pages/Admin_Page/Stock_Admin/Stock_Admin";

import STOCK_ORDER_NAVI_PAGE from "../pages/Admin_Page/Stock_Order_Navi_Page_Admin/Stock_Order_Navi_Page";
import ACTIVE_ORDER_ADMIN from "../pages/Admin_Page/Order_Admin/Active_Order_Admin";


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
                <Route path='user_main_page' element={<USER_MAIN_PAGE/>}/>
                <Route path='user_appointment_page' element={<USER_APPOINTMENT_PAGE/>}/>
                <Route path='user_account_info' element={<USER_ACCOUNT_PAGE/>}/>
                <Route path='my_appointment' element={<MY_APPOINTMENT_PAGE/>}/>

                <Route path='admin_main_page' element={<ADMIN_MAIN_PAGE/>}/>
                <Route path='appointment_admin' element={<APPOINTMENT_ADMIN/>}/>
                <Route path='new_user_management' element={<New_User_Management/>}/>
                <Route path='user_management' element={<USER_MANAGEMENT/>}/>
                <Route path='admin_management' element={<ADMINISTRATOR_MANAGEMENT/>}/>
                <Route path='all_appointment_admin' element={<ALL_APPOINTMENT_ADMIN/>}/>
                <Route path='user_group_navi_page' element ={<USER_GROUP_NAVI_PAGE/>}/>
                <Route path='t_and_c_update' element ={<TERMS_AND_CONDITIONS_UPDATE/>}/>
                <Route path='stock_admin' element ={<STOCK_ADMIN/>}/>
                <Route path='stock_and_order_admin_navi' element ={<STOCK_ORDER_NAVI_PAGE/>}/>
                <Route path='active_order_admin' element = {<ACTIVE_ORDER_ADMIN/>}/>
                <Route path='user_group_navi_page' element={<USER_GROUP_NAVI_PAGE/>}/>
            </Routes>

        </UserContext.Provider>
    );
}

export default Router_Web