import {Component, useContext} from "react";
import {NavLink,Outlet} from "react-router-dom";
import {UserContext} from "../contexts/RegisterContext";
import {useNavigate} from "react-router";

export const ProtectedRoute = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);

    return loginUser.isLogged? <Outlet/> : <NavLink to='/' />
}

