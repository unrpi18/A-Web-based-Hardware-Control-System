import {useContext, useEffect, useState} from "react";
import {baseUrl, UserContext} from "../../../contexts/RegisterContext";

export const useFetchData = (type, loginUser, api) => {


    let email = loginUser.email
    const [rows, setRows] = useState([]);
    const post = {email}
    let token = loginUser.token
    console.log(token)
    console.log(post)
    useEffect(() => {
        fetch(baseUrl + api, {
            method: type,
            headers: {"Authorization": token},
            body: type === 'POST' ? JSON.stringify(post) : null
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson.data)
            let message = responseJson.message;
            if (message === "SUCCESS") {
                console.log(responseJson)
                console.log(responseJson.data)

                setRows(rows => ({...rows, data: responseJson.data}))
            } else {
                alert(message);

            }

        }).catch(error => console.error(error))
    }, []);
    return {rows, setRows};


}
