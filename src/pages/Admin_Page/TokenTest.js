import {baseUrl} from '../../contexts/RegisterContext'


export function checkToken(token) {
    console.log(token)

    const headers = {
        "Authorization": token
    };
    fetch(baseUrl + "/users/getAllUsers", {
        headers
    }).then(response => response.json()).then(responseJson => {
        console.log(responseJson);

        let resultCode = responseJson.resultCode;
        if (resultCode !== 200) {
            alert(responseJson.message);
            return false;
        } else {
            return true;
        }
    });
    return false;
}