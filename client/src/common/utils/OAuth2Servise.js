import Cookies from "js-cookie";
import { REFRESH_TOKEN } from "../constants/OAuth2Constants";
import { postOAuth2Logout } from "./OAuth2FetchWrapper";

export class OAuth2Servise {
    _refresh_token = Cookies.get(REFRESH_TOKEN) || null;

    async OAuth2LogOut() {
        const response = await postOAuth2Logout(this._refresh_token); // нормальный ответ 204

        if (response.status === 204) {
        console.log('response from postOAuth2Logout is ok'); // TODO решил пока что оставить, пока не решу как обрабатывать ошибки
        }
        Cookies.remove(REFRESH_TOKEN);
    }
}