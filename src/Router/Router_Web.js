import './Router_Web'
import '../components/Components.css'
import {Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import WELCOME_PAGE from "../pages/Mixed_Page/WelcomePage/Welcome_Page";
import REGISTER_PAGE from "../pages/Mixed_Page/RegisterPage/Register_Page";
import LOGIN_PAGE from "../pages/Mixed_Page/LoginPage/Login_Page";
import ADMIN_MAIN_PAGE from "../pages/Admin_Page/Admin_Main_Page/Admin_Main_Page";
import APPOINTMENT_ADMIN from "../pages/Admin_Page/Appointment_Admin/Appointment_Admin";
import USER_APPOINTMENT_PAGE from "../pages/User_Page/Appointment/UserAppointmentPage/User_Appointment_Page";
import USER_MAIN_PAGE from "../pages/User_Page/UserMainPage/User_Main_Page";
import {UserContext} from "../contexts/RegisterContext";
import FORGET_PASSWORD_PAGE from "../pages/Mixed_Page/ForgetPasswordPage/Forget_Password_Page";
import USER_ACCOUNT_PAGE from "../pages/User_Page/UserAccountPage/User_Account_Page";
import New_User_Management from "../pages/Admin_Page/New_User_Management/New_User_Management";
import USER_MANAGEMENT from "../pages/Admin_Page/User_Management/User_Management";
import ADMINISTRATOR_MANAGEMENT from "../pages/Admin_Page/Administrator_Management/Administrator_Management";
import ALL_APPOINTMENT_ADMIN from "../pages/Admin_Page/All_Appointment_Admin/All_Appointment_Admin";
import TERMS_AND_CONDITIONS_UPDATE from "../pages/Admin_Page/Terms_And_Conditions_Update/Terms_And_Conditions_Update";
import STOCK_ADMIN from "../pages/Admin_Page/Stock_Admin/Stock_Admin";
import ACTIVE_ORDER_ADMIN from "../pages/Admin_Page/Order_Admin/Active_Order_Admin";
import PAST_ORDER_ADMIN from "../pages/Admin_Page/Order_Admin/Past_Order_Admin";
import MY_APPOINTMENT_PAGE from "../pages/User_Page/Appointment/My_Appointment_Page/My_Appointment_Page"
import USER_STOCK_PAGE from "../pages/User_Page/StocksAndOrders/User_Stock_Page/User_Stock_Page";
import USER_SUBMIT_PAGE from "../pages/User_Page/StocksAndOrders/User_Submit_Order_Page/User_Submit_Page";
import USER_ACTIVE_ORDER from "../pages/User_Page/StocksAndOrders/User_Active_Order_Page/User_Active_Order";
import USER_PAST_ORDER from "../pages/User_Page/StocksAndOrders/User_Past_Order_Page/User_Past_Order";
import WEBCAM_ADMIN from "../pages/Admin_Page/Webcam_Admin/Webcam_Admin";
import USER_WEBCAM_PAGE from "../pages/User_Page/Webcam/User_Webcam_Page";


function Router_Web() {
    const initialLoginUser = {
        token: '',
        firstName: '',
        lastName: '',
        email: '',
        isUserLogged: false,
        isAdminLogged: false,
        receiveNotification : true
    };
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
                <Route path='stock_view' element={<USER_STOCK_PAGE/>}/>
                <Route path='submit_order' element={<USER_SUBMIT_PAGE/>}/>
                <Route path='active_order' element={<USER_ACTIVE_ORDER/>}/>
                <Route path='past_order' element={<USER_PAST_ORDER/>}/>
                <Route path='webcam_user' element={<USER_WEBCAM_PAGE/>}/>
                <Route path='admin_main_page' element={<ADMIN_MAIN_PAGE/>}/>
                <Route path='appointment_admin' element={<APPOINTMENT_ADMIN/>}/>
                <Route path='new_user_management' element={<New_User_Management/>}/>
                <Route path='user_management' element={<USER_MANAGEMENT/>}/>
                <Route path='admin_management' element={<ADMINISTRATOR_MANAGEMENT/>}/>
                <Route path='all_appointment_admin' element={<ALL_APPOINTMENT_ADMIN/>}/>
                <Route path='past_order_admin' element={<PAST_ORDER_ADMIN/>}/>
                <Route path='t_and_c_update' element={<TERMS_AND_CONDITIONS_UPDATE/>}/>
                <Route path='stock_admin' element={<STOCK_ADMIN/>}/>
                <Route path='past_order_admin' element={<PAST_ORDER_ADMIN/>}/>
                <Route path='active_order_admin' element={<ACTIVE_ORDER_ADMIN/>}/>
                <Route path='webcam_admin' element ={<WEBCAM_ADMIN/>}/>
            </Routes>

        </UserContext.Provider>
    );
}

export default Router_Web