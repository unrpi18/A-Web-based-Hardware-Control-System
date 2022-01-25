import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {UserContext} from "../../../contexts/RegisterContext";

export const useFetchData = () => {
    const {loginUser, setLoginUser} = useContext(UserContext);
    const initialRows = {
            id: '1',
            data: [],
        }
    ;
    const [fetchData, setFetchData] = useState([]);
    const [rows, setRows] = useState(initialRows);
    let email = "SiyannLi@outlook.com";
    const post = {email};
    console.log(post)
    fetch("http://5e78-2a02-3038-409-64a-51b4-5d88-5c19-e137.ngrok.io/appointments/getUserAppointmentsWithEmail", {
        method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(post)
    }).then(response => response.json()).then(responseJson => {
        console.log(responseJson);

        let message = responseJson.message;
        console.log(message);

        if (message === "SUCCESS") {
            console.log("test")
            console.log(responseJson.data)
            setFetchData(responseJson.data);
            setRows(rows => ({...rows, data: fetchData}))
            console.log(rows.data);

        } else {
            alert(message);

        }

    })


    return {rows, setRows};
}