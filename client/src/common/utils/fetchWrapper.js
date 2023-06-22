import { BASE_URL } from "../constants/urlConstants";

function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${BASE_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function getString(path, accessToken, auth=false) {
    //const authorization = auth ? `Authorization${:} Bearer ${accessToken}` 'Authorization': `Bearer ${accessToken}` //TODO
    accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUzZVLXFOVXFOZ1ZybnJTUGwzc0FJWko1NVliUUFRNHl2ekgzRTFyNmNNIn0.eyJleHAiOjE2ODc0MzA1MjAsImlhdCI6MTY4NzQzMDIyMCwianRpIjoiMDMyOTljZGItYzBmYS00NjhlLWFjMWQtMWRlYTYxYjVjM2U0IiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1ZDczMmM0Zi0xMzVlLTRmZGQtOTdlZS0xYjkzNDY2YzBiNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzd2FnZ2VyLXVpIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCB1c2VyIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMjEzLjIzNC4yNTIuMTEyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIn0.BRaasQNr4eMK-ZNBe__WBg1jgcgdwoE9HFCEMfxK6ZFdO_mHpPxJx3xTvUMot_BrJ_C4b5eB2CuI28vDaqiweD4rkd_7CJXNZ6ktf2Rh-Oy2YDteFxwL1jN46TdgMTNc_OcaYNxoB8-RwZ5zWtVuFrd0RrHbrwzA_-hfNw9Ea1qwxIN14COncBnJ7APpGxxkfQ0a3bKoaPQ9f0lUE16bq7Y-ZDf7zRq5_VA1-G8Fgmmudi0wAMspyuEfGs6H1Q-4HyIASLWq_LO3Ha4jFxc3y2Jl5TvxWvB8op_L-MsUribRem-E5DXFYJOPcjoffj0is_faRkBuUDfbQTsyXwXmyQ'
//    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUzZVLXFOVXFOZ1ZybnJTUGwzc0FJWko1NVliUUFRNHl2ekgzRTFyNmNNIn0.eyJleHAiOjE2ODc0MzA1MjAsImlhdCI6MTY4NzQzMDIyMCwianRpIjoiMDMyOTljZGItYzBmYS00NjhlLWFjMWQtMWRlYTYxYjVjM2U0IiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1ZDczMmM0Zi0xMzVlLTRmZGQtOTdlZS0xYjkzNDY2YzBiNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzd2FnZ2VyLXVpIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCB1c2VyIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMjEzLjIzNC4yNTIuMTEyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIn0.BRaasQNr4eMK-ZNBe__WBg1jgcgdwoE9HFCEMfxK6ZFdO_mHpPxJx3xTvUMot_BrJ_C4b5eB2CuI28vDaqiweD4rkd_7CJXNZ6ktf2Rh-Oy2YDteFxwL1jN46TdgMTNc_OcaYNxoB8-RwZ5zWtVuFrd0RrHbrwzA_-hfNw9Ea1qwxIN14COncBnJ7APpGxxkfQ0a3bKoaPQ9f0lUE16bq7Y-ZDf7zRq5_VA1-G8Fgmmudi0wAMspyuEfGs6H1Q-4HyIASLWq_LO3Ha4jFxc3y2Jl5TvxWvB8op_L-MsUribRem-E5DXFYJOPcjoffj0is_faRkBuUDfbQTsyXwXmyQ'
//-H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUzZVLXFOVXFOZ1ZybnJTUGwzc0FJWko1NVliUUFRNHl2ekgzRTFyNmNNIn0.eyJleHAiOjE2ODc0MzE2MDAsImlhdCI6MTY4NzQzMTMwMCwianRpIjoiMjZmODkzMTItZjcxMy00MzM4LThlMDItMGZlZjdkY2Q4MjhhIiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1ZDczMmM0Zi0xMzVlLTRmZGQtOTdlZS0xYjkzNDY2YzBiNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzd2FnZ2VyLXVpIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCB1c2VyIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMjEzLjIzNC4yNTIuMTEyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIn0.J-S7myTkifkIzf3rBT4quIbUhrg_AHfXbX8KIgXAtjYUhL1AHhmtPAUcXjgWg185wVmBqc3s8uOoJ8LPrj2yQdFPRlcHHHb1C7zK7FAfKjL8wyk3fWiewNEtb1gO1sxUyLDb_GM_QsfFNC64X_WRGuMuGTxdTCdbO8Gn3o_M4ZbtcBOy8caZD91UY_6wIhxKoTjgKqDfDsMjidQT0BdBXnY2fXvLhD9vwvtpow740uIILzdmQeZ8FCX2P7RBIuE8BbWoMOeZDFoeZ_7S22DIjk7mP9R6iG0AIYXydAM6J3GynHxLN7ZESZot6i3APDpOjMHsZWI1JVZbK7BV76n3Yg'

    const requestOptions = { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'localhost:8090',
            'User-Agent': 'Mozilla/5.0',
            'Origin': '*',
            'Accept': '/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUzZVLXFOVXFOZ1ZybnJTUGwzc0FJWko1NVliUUFRNHl2ekgzRTFyNmNNIn0.eyJleHAiOjE2ODc0MzE2MDAsImlhdCI6MTY4NzQzMTMwMCwianRpIjoiMjZmODkzMTItZjcxMy00MzM4LThlMDItMGZlZjdkY2Q4MjhhIiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1ZDczMmM0Zi0xMzVlLTRmZGQtOTdlZS0xYjkzNDY2YzBiNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzd2FnZ2VyLXVpIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCB1c2VyIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMjEzLjIzNC4yNTIuMTEyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIn0.J-S7myTkifkIzf3rBT4quIbUhrg_AHfXbX8KIgXAtjYUhL1AHhmtPAUcXjgWg185wVmBqc3s8uOoJ8LPrj2yQdFPRlcHHHb1C7zK7FAfKjL8wyk3fWiewNEtb1gO1sxUyLDb_GM_QsfFNC64X_WRGuMuGTxdTCdbO8Gn3o_M4ZbtcBOy8caZD91UY_6wIhxKoTjgKqDfDsMjidQT0BdBXnY2fXvLhD9vwvtpow740uIILzdmQeZ8FCX2P7RBIuE8BbWoMOeZDFoeZ_7S22DIjk7mP9R6iG0AIYXydAM6J3GynHxLN7ZESZot6i3APDpOjMHsZWI1JVZbK7BV76n3Yg`,
        }
    };
    //const url = `${BASE_URL}/${path}`;
    const url = 'http://45.141.103.134:8090/api/v1/customers/me'


    return fetch(url, requestOptions).then(handleResponseString).catch(e=> console.log(e));
}

function postRegistration(path, body) {
    const requestOptions = {
        method: 'POST',
        //mode: 'no-cors',
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

    return fetch(url, requestOptions).then(handleResponse); // todo добавить обработчик ошибок
}



async function handleResponse(response) {
    return await response.json();
}

async function handleResponseString(response) {
    return await response.text();
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
    const url = 'http://localhost:8090/api/v1/customers/me';
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
    getString,
    postRegistration,
    postOAuth2AccessTokenByRefreshToken,
    getTestDataFromResourceServer,
    postOAuth2RefreshToken,
};