import Cookies from "js-cookie";

import { ACCESS_TOKEN, KEYCLOAK_URL, REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2AccessTokenByRefreshToken } from "./fetchWrapper";

/*
    Функция обновления access_token
    Устанавливает: в localStorage access_token
    Возвращает: access_token или null(если не удалось обновить)
*/

// TODO in class
async function updateAccessTokenByRefreshToken() {      //TODO перенести в класс OAuth2Service
    const refresh_token = getRefreshTokenFromCookie();

    if (refresh_token) {
        try {
            const response = await postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refresh_token);
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