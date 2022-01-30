import {useEffect} from "react";

export const useRefreshControlGet = (setLoginUser) => {
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("user"));
        setLoginUser(prev => ({...prev, ...users}))
    }, []);
}

export const useRefreshControlSet = (loginUser) => {
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(loginUser))
    }, [loginUser.token, loginUser.firstName, loginUser.lastName, loginUser.email]);

}