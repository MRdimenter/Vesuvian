import { KEYCLOAK_LOGOUT_URL, KEYCLOAK_URL } from "../constants/OAuth2Constants";

function postOAuth2Login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            'username': username,
            'password': password,
            'grant_type': 'password',
          })
    };

    return fetch(KEYCLOAK_URL, requestOptions)
    .then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        } else if (res.status === 401) {
            throw new Error(res.status);
        } else if (res.status >= 500) {
            throw new Error(res.statusText);
        } else {
            throw new Error();
        }
    })
    //return fetch(KEYCLOAK_URL, requestOptions).then(handleResponse);
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

export {
    postOAuth2Login,
    postOAuth2Logout,
};