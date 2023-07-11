import Cookies from "js-cookie";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/OAuth2Constants";

/*
    Модуль содержит методы работы с refresh token и access token:
    обновление access token через keycloak
    работа с cookies и localstorage
*/

function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
}

function setRefreshToken(refreshToken) {
    Cookies.set(REFRESH_TOKEN, refreshToken);
}

function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken)
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN)
}

/*
    For to emulate an expired access token
*/
function setWrongAccessToken() {
    localStorage.setItem(ACCESS_TOKEN, 'wrongAccessToken')
}

export {
    getRefreshTokenFromCookie,
    setRefreshToken,
    setAccessToken,
    getAccessToken,
    setWrongAccessToken,
}