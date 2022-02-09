export function isBlank(str) {
    return str.replace(/(^s*)|(s*$)/g, "").length !== 0;
}

export function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function validatePassword(password) {
    let pattern = new RegExp("^(?=(.*[a-zA-Z])+)(?=(.*[0-9]){2,}).{8}$");
    return (pattern.test(password))
}