import {useContext, useEffect, useState} from "react";
import {baseUrl, UserContext} from "../../../contexts/RegisterContext";

export const useFetchData = (type, loginUser, api) => {


    let email = loginUser.email
    const [rows, setRows] = useState([]);
    const post = {email}

    console.log(post)
    useEffect(() => {
        fetch(baseUrl + api, {
            method: type,
            headers: {"Content-Type": "application/json"},
            body: type === 'POST' ? JSON.stringify(post) : null
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson.data)
            let message = responseJson.message;
            if (message === "SUCCESS") {
                console.log(responseJson.data)

                setRows(rows => ({...rows, data: responseJson.data}))
            } else {
                alert(message);

            }

        }).catch(error => console.error(error))
    }, []);
    return {rows, setRows};


}
