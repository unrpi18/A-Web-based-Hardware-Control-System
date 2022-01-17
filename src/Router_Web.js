import './Router_Web'
import './components/Components.css'
import { Route, Routes } from "react-router-dom";


import React from 'react';
import WELCOME_PAGE from "./pages/Mixed_Page/WelcomePage/Welcome_Page";
import REGISTER_PAGE from "./pages/Mixed_Page/RegisterPage/Register_Page";
import LOGIN_PAGE from "./pages/Mixed_Page/LoginPage/Login_Page";
import USER_LOGIN_PAGE from "./pages/Mixed_Page/UserLoginPage/User_Login_Page";
import ADMIN_MAIN_PAGE from "./pages/Admin_Page/Admin_Main_Page/Admin_Main_Page";
import APPOINTMENT_ADMIN from "./pages/Admin_Page/Appointment_Admin/Appointment_Admin";


function Router_Web() {
    return (

        <Routes>
            <Route exact path="/" element={<WELCOME_PAGE />} />
            <Route path="register" element={<REGISTER_PAGE />} />
            <Route path="login" element={<LOGIN_PAGE />} />
            <Route path='user' element={<USER_LOGIN_PAGE />} />
            <Route path='admin_main_page' element = {<ADMIN_MAIN_PAGE />} />
            <Route path='appointment_admin' element = {<APPOINTMENT_ADMIN />}/>
        </Routes>

    );
}

export default Router_Web