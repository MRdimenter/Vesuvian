import Cookies from "js-cookie";

import { KEYCLOAK_URL, REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2AccessTokenByRefreshToken } from "./fetchWrapper";

/*
    Функция обновления access_token
    Устанавливает: в localStorage access_token
    Возвращает: access_token или null(если не удалось обновить)
*/
async function updateAccessTokenByRefreshToken() {
    const refresh_token = getRefreshTokenFromCookie();
    let access_token = '';

    if (refresh_token) {
        try {
            const response = await postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refresh_token);
            access_token = await response.access_token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    localStorage.setItem('access_token', access_token);
    return access_token;
}


function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
}

function setRefreshToken(refreshToken) {
    Cookies.set(REFRESH_TOKEN, refreshToken);
}

function updateAccessToken() { // переименовать в updateAccessToken() (ну наконец-то разобрался в определении функциональности действия!)
    return !!Cookies.get(REFRESH_TOKEN);
}

export {
    updateAccessTokenByRefreshToken,
    setRefreshToken,
    updateAccessToken,
}