import './Router_Web'
import { Route, Routes } from "react-router-dom";


import React from 'react';

import WELCOME_PAGE from "./pages/WelcomePage/Welcome_Page";
import REGISTER_PAGE from "./pages/RegisterPage/Register_Page";
import LOGIN_PAGE from "./pages/LoginPage/Login_Page";



function Router_Web() {
    return (

        <Routes>
            <Route exact path="/" element={<WELCOME_PAGE />} />
            <Route path="register" element={<REGISTER_PAGE />} />
            <Route path="login" element={<LOGIN_PAGE />} />
        </Routes>

    );
}

export default Router_Web