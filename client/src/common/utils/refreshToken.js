import Cookies from "js-cookie";
import { KEYCLOAK_URL } from "../constants/OAuth2Constants";
import { postOAuth2RefreshToken } from "./fetchWrapper";
import { checkRefreshTokenExist } from "./accessToken";

const REFRESH_TOKEN = 'refreshToken';

/*
    TODO Description
*/
function setRefreshToken(refreshToken) {
    console.log('записываем в cookie refreshToken: ', refreshToken);
    Cookies.set(REFRESH_TOKEN, refreshToken);
}

/*
    Функция (временная) получает новый access_token (из refresh_token, иначе меняет состояния приложения на "не авторизован")
    и меняет состояния приложения на "авторизован"
*/
function updateAccessToken() { // переименовать в updateAccessToken() (ну наконец-то разобрался в определении функциональности действия!)
    console.log('refreshToken in cookies', !!Cookies.get(REFRESH_TOKEN));
    return !!Cookies.get(REFRESH_TOKEN);
}
// проверка на актуальность рефреш-токена

async function checkRefreshTokenValidity() {
    // а вот тут самое интересное:
    // нужно сделать запрос, и только после этого дать ответ.
    //т..е получается, что функция будет асинхронной

    // запрос на обновление access_token: читаем ответ
        // 1. если сервер лежит (тут мне пригодится часть fetch, которая читает ответ заголовка до чтения тела)
        // 2. если ответ неверный refresh_token
        // 3. если всё ОК записываем новый access_token в локал сторадж (это отдельная функция)
        // TODO да и вообще название функции изменить и раскидать на два-три - потому что делают они разные вещи
        // 4. (ах да): состояние приложения авторизован/не авторизован при этом нужно менять (но опять же какая функция должна это делать?)
        // TODO а не запихнуть ли всё это в отдельный модуль или класс по обработке всех этих ключей (в некую библиотеку методов)
    const refresh_token = checkRefreshTokenExist();

    if (refresh_token) {
        async function getAccessTokenByRefreshToken() {
            const response = await postOAuth2RefreshToken(KEYCLOAK_URL, refresh_token);
            console.log(response);
            let {access_token} = response;
            
            console.log('Hello new access_token:', access_token);
          }
    }

}

async function handleResponse(response) {
    return await response.json();
}

async function getAccessTokenValidity() { //TODO - вот опять неразбериха получаем access_token в refresh_token (нужно раскидать функции по модулям или в один общий)
    // а вот тут самое интересное:
    // нужно сделать запрос, и только после этого дать ответ.
    //т..е получается, что функция будет асинхронной

    // запрос на обновление access_token: читаем ответ
        // 1. если сервер лежит (тут мне пригодится часть fetch, которая читает ответ заголовка до чтения тела)
        // 2. если ответ неверный refresh_token
        // 3. если всё ОК записываем новый access_token в локал сторадж (это отдельная функция)
        // TODO да и вообще название функции изменить и раскидать на два-три - потому что делают они разные вещи
        // 4. (ах да): состояние приложения авторизован/не авторизован при этом нужно менять (но опять же какая функция должна это делать?)
        // TODO а не запихнуть ли всё это в отдельный модуль или класс по обработке всех этих ключей (в некую библиотеку методов)
    
    let access_token = '';
    const refresh_token = checkRefreshTokenExist();

    if (refresh_token) {
        async function getAccessTokenByRefreshToken() {
            const response = await postOAuth2RefreshToken(KEYCLOAK_URL, refresh_token);
            console.log(response);
            access_token = response.access_token;
            
            console.log('Hello new access_token:', access_token);
          }
    }
    return access_token;
}



export {updateAccessToken, setRefreshToken};