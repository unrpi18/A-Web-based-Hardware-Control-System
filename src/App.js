import './App'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/home";
import Register from "./pages/RegisterPage/register";
import React from "react";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="register" element={<Register/>}/>
            </Routes>
    );
}

export default App