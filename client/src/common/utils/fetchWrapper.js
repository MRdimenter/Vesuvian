import { BASE_URL } from "../constants/urlConstants";

function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${BASE_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function postRegistration(path, body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': String(new TextEncoder().encode(body).length),
            'Host': 'localhost:8090',
            'User-Agent': 'Mozilla/5.0',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(body)
    };
    const url = `${BASE_URL}/${path}`;

    return fetch(url, requestOptions)//.then(handleResponse);
}

function postOAuth2AccessTokenByRefreshToken(url, refreshToken) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({
            'client_id': 'app-dev-client',
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
        })
    };

    return fetch(url, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    return await response.json();
}

/*
async function handleResponseString(response) {
    return await response.text();
}
*/

export {
    get,
    postRegistration,
    postOAuth2AccessTokenByRefreshToken,
};