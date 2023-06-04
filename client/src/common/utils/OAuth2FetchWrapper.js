import { KEYCLOAK_LOGOUT_URL } from "../constants/OAuth2Constants";

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
    postOAuth2Logout,
};