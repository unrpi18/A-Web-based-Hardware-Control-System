import './App'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/WelcomePage/home";
import Register from "./pages/RegisterPage/register";
import Login from "./pages/LoginPage/login";
import React from 'react';


function App() {
    return (

        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="Login" element={<Login />} />
        </Routes>

    );
}

export default App