function get(path) {
    const requestOptions = { method: 'GET' };
    const url = `${process.env.REACT_APP_API_URL}/${path}`;

    return fetch(url, requestOptions).then(handleResponse);
}

function postOAuth2(url, username, password) {
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

    return fetch(url, requestOptions).then(handleResponse);
}

async function handleResponse(response) {
    return await response.json();
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
    postOAuth2,
    getTestDataFromResourceServer,
};