import Cookies from "js-cookie";
import { REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2Login, postOAuth2Logout } from "./OAuth2FetchWrapper";
import { setAccessToken, setRefreshToken } from "./useOAuth2";

export class OAuth2Servise {
    _refreshToken = Cookies.get(REFRESH_TOKEN) || null;

    async handleResponse(response) {
        return await response.json();
    }

    async OAuth2LogOut() {
        const response = await postOAuth2Logout(this._refreshToken); // нормальный ответ 204

        if (response.status === 204) {
            console.log('response from postOAuth2Logout is ok'); // TODO решил пока что оставить, пока не решу как обрабатывать ошибки
        }

        Cookies.remove(REFRESH_TOKEN);
    }

    async OAuth2Login(username, password) {
        try {
            const response = await postOAuth2Login(username, password);
            const { refresh_token, access_token } = response;

            if (refresh_token && access_token) {
                setRefreshToken(refresh_token);
                setAccessToken(access_token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            if (error.message === '401') {
                throw new Error(error.message);
            } else {
                throw new Error();
            }
        }
    }
}