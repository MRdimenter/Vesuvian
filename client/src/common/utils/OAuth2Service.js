import Cookies from "js-cookie";
import { KEYCLOAK_URL, REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2Login, postOAuth2Logout } from "./OAuth2FetchWrapper";
import { setAccessToken, setRefreshToken } from "./useOAuth2";
import { BadRequestError, RefreshTokenMissingError } from "./Errors/Errors";

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
      console.log('OAuth2Login:', response);
      const { refresh_token: refreshToken, access_token: accessToken } = response;

      if (refreshToken && accessToken) {
        setRefreshToken(refreshToken);
        setAccessToken(accessToken);
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

  async postOAuth2AccessTokenByRefreshToken(url, refreshToken) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams({
        'client_id': 'app-dev-client',
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
      })
    };

    const response = await fetch(url, requestOptions);
    if (response.status === 400) {
      throw new BadRequestError('Invalid refresh token')
    }

    //return response.json();
    return fetch(url, requestOptions).then(this.handleResponse); // todo добавить обработчик ошибок
  }

  getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
  }

  async updateAccessTokenByRefreshToken() {
    const refreshToken = this.getRefreshTokenFromCookie();

    if (refreshToken) {
      try {
        const response = await this.postOAuth2AccessTokenByRefreshToken(KEYCLOAK_URL, refreshToken);
        if (response.status === 400) {
          throw new Error('postOAuth2AccessTokenByRefreshToken: ', response.status);
        }
        const {access_token: accessToken} = response;
        setAccessToken(accessToken);
        return accessToken;
      } catch (error) {
        console.log('postOAuth2AccessTokenByRefreshToken: ', error);
        return null;
      }
    } else {
      throw new RefreshTokenMissingError("Refresh token is missing.");
    }
  }
}