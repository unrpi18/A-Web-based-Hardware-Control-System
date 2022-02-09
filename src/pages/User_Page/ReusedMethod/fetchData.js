import {useEffect, useState} from "react";
import {baseUrl} from "../../../contexts/RegisterContext";

export const useFetchData = (type, loginUser, api) => {


    const [rows, setRows] = useState([]);


    let token = loginUser.token
    useEffect(() => {
        fetch(baseUrl + api, {
            method: type,
            headers: {"Authorization": token},
        }).then(response => response.json()).then(responseJson => {
            let message = responseJson.message;
            if (message === "SUCCESS") {

                setRows(rows => ({...rows, data: responseJson.data}))

            } else {
                alert(message);

            }

        }).catch(error => console.error(error))
    }, []);
    return {rows, setRows};


}
