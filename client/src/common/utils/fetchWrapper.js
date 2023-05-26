import { KEYCLOAK_LOGOUT_URL, KEYCLOAK_URL } from "../constants/OAuth2Constants";

function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function postOAuth2Login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client', // TODO in process.env?
            'username': username,
            'password': password,
            'grant_type': 'password',
          })
    };

    /*
    fetch(url, requestOptions)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                let error = new Error(res.statusText);
                error.response = res;
                throw error
            }
        })
        .then((res) => {
            if (res.headers['content-type'] !== 'application/json') {
                let error = new Error('Некорректный ответ от сервера');
                error.response = res;
                throw error
            }
            return res;
        })
        .then(res => res.json())
        .then(data => console.log('+', data))
        .catch((e) => {
            console.log('Error: ' + e.message);
            console.log(e.response);
        });
    */
    return fetch(KEYCLOAK_URL, requestOptions).then(handleResponse);
}

function postOAuth2AccessTokenByRefreshToken(url, refresh_token) { // TODO перенести в useOath2.js (или того), туда импортировать констанут url и не использовать ее в аргументах 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({
            'client_id': 'app-dev-client',
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
        })
    };

    return fetch(url, requestOptions).then(handleResponse); // todo добавить обработчик ошибок
}

function postOAuth2Logout(refresh_token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            'refresh_token': refresh_token,
          })
    };
    return fetch(KEYCLOAK_LOGOUT_URL, requestOptions); 
  }



async function handleResponse(response) {
    return await response.json();
}

function postOAuth2RefreshToken(url, refresh_token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
          })
    };
    return fetch(url, requestOptions).then(handleResponse);
  }

/**
 * Функция для получения тестового набора данных от бекенд сервера по access_token 
 * 
 * https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
 */
function getTestDataFromResourceServer (access_token) { //TODO for testing
    const url = 'http://localhost:8090/user/test';
    const req = new XMLHttpRequest();

    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + access_token); // потом надо будет добавить keycloak.token
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                alert('Success');
                console.log(`received data from the server: ${req.response}`)
            } else if (req.status === 403) {
                alert('Forbidden');
                console.log(`received data from the server: not found`)
            }
        }
    }
    req.send();
  };

export {
    get,
    postOAuth2Login,
    postOAuth2AccessTokenByRefreshToken,
    postOAuth2Logout,
    getTestDataFromResourceServer,
    postOAuth2RefreshToken,
};