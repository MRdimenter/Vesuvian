import { BASE_HOSTNAME } from "./urlConstants";

const KEYCLOAK_PORT = '8282';

const BASE_KEYCLOAK_URL = `http://${BASE_HOSTNAME}:${KEYCLOAK_PORT}/realms/dev/protocol/openid-connect`;

const KEYCLOAK_URL = `${BASE_KEYCLOAK_URL}/token`;

const KEYCLOAK_LOGOUT_URL = `${BASE_KEYCLOAK_URL}/logout`;

//const KEYCLOAK_URL = 'http://45.141.103.134:8282/realms/dev/protocol/openid-connect/token';
//const KEYCLOAK_LOGOUT_URL = 'http://45.141.103.134:8282/realms/dev/protocol/openid-connect/logout';

const REFRESH_TOKEN = 'refreshToken';
const ACCESS_TOKEN = 'accessToken';


export {
    KEYCLOAK_URL,
    KEYCLOAK_LOGOUT_URL,
    REFRESH_TOKEN,
    ACCESS_TOKEN,
};