'use strict';

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


/* ------------------------ App-specific ------------------------ */
// DOM Elements
const acceptCookieButton = document.getElementById("accept-cookie-button");
const refuseCookieButton = document.getElementById("refuse-cookie-button");
const cookieBanner = document.getElementById("cookie-banner");

function acceptAbaloCookie() {
    deleteCookie("abalo_cookie");
    setCookie("abalo_cookie", "true");
    cookieBanner.style.display = "none";
}

acceptCookieButton.addEventListener("click", acceptAbaloCookie);
refuseCookieButton.addEventListener("click", () => cookieBanner.style.display = "none");

let cookie = getCookie("abalo_cookie");
if (cookie.includes("true")) {
    cookieBanner.style.display = "none";
} else {
    cookieBanner.style.display = "block";
}
