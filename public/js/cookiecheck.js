/* ------------------------ General functions ------------------------ */
function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

function deleteCookie(name) {
    document.cookie = name + "=";
}

function getCookie(name) {
    return document.cookie
        .split(";")
        .find(cookie => cookie.includes(name));
}



