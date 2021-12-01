import './RouterWeb'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/WelcomePage/home";
import Register from "./pages/RegisterPage/register";
import Login from "./pages/LoginPage/login";
import React from 'react';


function RouterWeb() {
    return (

        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="Login" element={<Login />} />
        </Routes>

    );
}

export default RouterWeb