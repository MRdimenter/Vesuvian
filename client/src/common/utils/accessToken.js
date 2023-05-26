import Cookies from "js-cookie";
import { KEYCLOAK_URL } from "../constants/OAuth2Constants";
import { postOAuth2RefreshToken } from "./fetchWrapper";

const REFRESH_TOKEN = 'refreshToken';

/*
    TODO Description
*/
function setAccessToken(refreshToken) {
    Cookies.set('refreshToken', refreshToken);
    
}

async function getAccessTokenByRefreshToken() {
    console.log('start getAccessTokenByRefreshToken');
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

// далее где будет использоваться эта функция if (getAccessTokenByRefreshToken()) то меняем состояние на аутентифицирован

async function getAccessTokenByRefreshTokenLight(refresh_token) {
    const response = await postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refresh_token);
    let {access_token} = response;
    
    console.log('Hello new access_token:', access_token);
    return access_token;
  }

function postOAuth2AccessTokenByRefreshToken(url, refresh_token) { // TODO перенести в useOath2.js (или того), туда импортировать констанут url и не использовать ее в аргументах 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
          })
    };
    
    return fetch(url, requestOptions).then(handleResponse); // todo добавить обработчик ошибок
  }

  async function handleResponse(response) {
    return await response.json();
  }

function checkRefreshTokenExist() {
    return !!Cookies.get('refreshToken');
}

function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
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
    
        let access_token = '';
        const refresh_token = checkRefreshTokenExist();
    
        if (refresh_token) {
            async function getAccessTokenByRefreshToken() {
                const response = await postOAuth2RefreshToken(KEYCLOAK_URL);
                console.log(response);
                access_token = response.access_token;
                
                console.log('Hello new access_token:', access_token);
              }
        }
        return access_token;
}



export {checkRefreshTokenExist, getAccessTokenByRefreshToken};