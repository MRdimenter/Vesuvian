import Cookies from "js-cookie";

import { ACCESS_TOKEN, KEYCLOAK_URL, REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2AccessTokenByRefreshToken } from "./fetchWrapper";

/*
    Модуль содержит методы работы с refresh token и access token:
    обновление access token через keycloak
    работа с cookies и localstorage
*/

// TODO in class?
async function updateAccessTokenByRefreshToken() {      //TODO перенести в класс OAuth2Service?
    const refreshToken = getRefreshTokenFromCookie();

    if (refreshToken) {
        try {
            const response = await postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refreshToken);
            const {access_token: accessToken} = response;
            setAccessToken(accessToken);
            return accessToken;
        } catch (error) {
            console.log('postOAuth2AccessTokenByRefreshToken: ', error);
            return null;
        }
    }
}

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
    updateAccessTokenByRefreshToken,
    setRefreshToken,
    setAccessToken,
    getAccessToken,
    setWrongAccessToken,
}