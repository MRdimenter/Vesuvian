import Cookies from "js-cookie";
import { KEYCLOAK_URL, REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2AccessTokenByRefreshToken, postOAuth2RefreshToken } from "./fetchWrapper";

async function updateAccessTokenByRefreshToken() {
    const refresh_token = getRefreshTokenFromCookie();
    let access_token = '';

    if (refresh_token) {
        try {
            const response = await postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refresh_token);
            access_token = await response.access_token;
        } catch (error) {
            console.log(error); // TODO подумать как обрабатывать ошибки (ну типа вывести страницу ошибок "Упс")
        }
    }
    localStorage.setItem('access_token', access_token);
    return access_token;
}


function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
}

/*
    TODO Description
*/
function setRefreshToken(refreshToken) {
    console.log('записываем в cookie refreshToken: ', refreshToken);
    Cookies.set(REFRESH_TOKEN, refreshToken);
}

function updateAccessToken() { // переименовать в updateAccessToken() (ну наконец-то разобрался в определении функциональности действия!)
    console.log('refreshToken in cookies', !!Cookies.get(REFRESH_TOKEN));
    return !!Cookies.get(REFRESH_TOKEN);
}

export {
    updateAccessTokenByRefreshToken,
    setRefreshToken,
    updateAccessToken,
}