import Cookies from "js-cookie";
import { ACCESS_TOKEN, KEYCLOAK_URL, REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2Login, postOAuth2Logout } from "./OAuth2FetchWrapper";
import { setAccessToken, setRefreshToken } from "./useOAuth2";
import { BadRequestError, RefreshTokenMissingError } from "./Errors";

export class OAuth2Service {
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
            const { refresh_token, access_token } = response; //TODO rename refresh_token

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

    //postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refresh_token)
    async postOAuth2AccessTokenByRefreshToken(url, refresh_token) { //TODO refactor like ApiService
        //const url = KEYCLOAK_URL;   //TODO GPT: как в классе использовать константы (где объявлять их), как правильно получать свойства класса из куки?
        //const refresh_token = this._refresh_token;
        //refresh_token = 'asd'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: new URLSearchParams({
                'client_id': 'app-dev-client',
                'grant_type': 'refresh_token',
                'refresh_token': refresh_token,
            })
        };
    
        const response = await fetch(url, requestOptions);

        if (response.status === 400) {
            console.log('???', response.json());
            throw new BadRequestError('Invalid refresh token')
        }

        //return response.json();
        return fetch(url, requestOptions).then(this.handleResponse); // todo добавить обработчик ошибок
    }

    getRefreshTokenFromCookie() {
        return Cookies.get(REFRESH_TOKEN) || null;
    }


    //TODO сначала для пустокого refresh_token (новая ошибка "Не авторизован")
    //TODO затем не для пустого, но просроченного (новая ошибка "не удается авторизоваться")
    async updateAccessTokenByRefreshToken() {
        const refresh_token = this.getRefreshTokenFromCookie();
        //console.log('updateAccessTokenByRefreshToken refresh_token:', refresh_token);
        //const refresh_token = 'asd';

        let access_token = '';
    
        if (refresh_token) {
            try {
                const response = await this.postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refresh_token);
                //console.log('updateAccessTokenByRefreshToken response', response);
                if (response.status === 400) {
                    console.log('!!! Error');
                }
                access_token = await response.access_token;
            } catch (error) {
                console.log('Ошибка пришла', error);
                throw error;
            }
        } else {
            throw new RefreshTokenMissingError("Refresh token is missing."); // Генерация пользовательской ошибки
        }
        localStorage.setItem(ACCESS_TOKEN, access_token);
        return access_token;
    }

    async handleResponse(response) {
        return await response.json();
    }
}