function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function postOAuth2(url, username, password) {
    const AUTH_CODE_REDIRECT_URL = 'http://localhost:3000/redirect';
    const state = 'state123'
    console.log(`unique string: ${state}`);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, //TODO in constants?
        body:  new URLSearchParams({
            'client_id': 'app-dev-client', // TODO in process.env?
            'username': username,
            'password': password,
            'grant_type': 'password',
            'state': state
            //'redirect_uri': AUTH_CODE_REDIRECT_URL // куда auth server будет отправлять ответ (возможно передается от requestAuthCode из runTestAuthorization от "test auth 2")
          })
    };

    return fetch(url, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    return await response.json();
}

export {
    get,
    postOAuth2,
};