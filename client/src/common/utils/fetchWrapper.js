function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function postOAuth2(url, username, password) {
    const AUTH_CODE_REDIRECT_URL = 'http://localhost:3000/redirect';
    const state = 'state123'
    console.log(`unique string: ${state}`);
    console.log(window.location);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, //TODO in constants?
        body:  new URLSearchParams({
            'client_id': 'app-dev-client', // TODO in process.env?
            'username': username,
            'password': password,
            'grant_type': 'password',
            //'state': state
            //'redirect_uri': AUTH_CODE_REDIRECT_URL // куда auth server будет отправлять ответ (возможно передается от requestAuthCode из runTestAuthorization от "test auth 2")
          })
    };
    //http://45.141.103.134:8282/realms/dev/protocol/openid-connect/auth?response_type=code&client_id=app-dev-client&state=state12333&scope=openid&code_challenge=ClMhdo9Zhg6BxKfzUGXSWmPKQcM_GWYH6pLU0MZ5igY&code_challenge_method=S256&redirect_uri=http://localhost:3000/redirect
    //http://localhost:3000/redirect?state=state12333&session_state=4753f5cb-2889-4da3-a215-2536ad3e1394&code=b62eaca2-4ec5-42af-86a3-78cef9338148.4753f5cb-2889-4da3-a215-2536ad3e1394.b23b4507-b151-4d19-89f7-4c8a918fb707
    return fetch(url, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    return await response.json();
}

export {
    get,
    postOAuth2,
};