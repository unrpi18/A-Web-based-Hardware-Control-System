import {isBlank} from "./checkInputFieldsIsBlank";
import {baseUrl} from "../../../contexts/RegisterContext";

export const handleVerificationCode = (email): void => {

    let nullCheck = isBlank(email)
    if (nullCheck) {
        const post2 = {email};
        fetch(baseUrl + "/users/sendVerificationCode", {

            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post2)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);

            let message = responseJson.message;
            let resultCode = responseJson.resultCode;

            console.log(message);

            if (resultCode !== 200) {
                alert(message);
            }
        })
    } else {
        alert("enter the email first!");
    }

}
