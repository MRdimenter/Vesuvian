import { BASE_URL } from "../constants/urlConstants";

function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function post(path, body) {
    const requestOptions = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            /*
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'PostmanRuntime/7.32.2',
            'Host': 'http://localhost:3000/registrationForm',
            'Content-Length': '0'
            */
            'Content-Type': 'application/json',
            'Content-Length': String(new TextEncoder().encode(body).length),
            'Host': 'localhost:8090',
            'User-Agent': 'Mozilla/5.0',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify( {
            "firstName": "nbvcxz",
            "lastName": "nbvcxz",
            "email": "nbvcxz@test.com",
            "enabled": "true",
            "username": "nbvcxz",
            "password": "nbvcxz"
        })
    };
    const url = `${BASE_URL}/${path}`;

    return fetch(url, requestOptions)//.then(handleResponse);
}

function postOAuth2AccessTokenByRefreshToken(url, refresh_token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({
            'client_id': 'app-dev-client',
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
        })
    };

    return fetch('http://45.141.103.134:8090/api/v1/customers/create', requestOptions).then(handleResponse); // todo добавить обработчик ошибок
}



async function handleResponse(response) {
    return await response.json();
}

function postOAuth2RefreshToken(url, refresh_token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({
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
function getTestDataFromResourceServer(access_token) { //TODO for testing
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
    post,
    postOAuth2AccessTokenByRefreshToken,
    getTestDataFromResourceServer,
    postOAuth2RefreshToken,
};