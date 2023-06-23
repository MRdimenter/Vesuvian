import { BASE_URL, CURRENT_CUSTOMER_URL, CUSTOMERS_URL } from "../constants/urlConstants";
import { getAuth } from "./fetchWrapper";
import { getAccessToken, updateAccessTokenByRefreshToken } from "./useOAuth2";

async function handleResponse(response) {
    return await response.json();
}

class ApiService {
    constructor(oauthService) {
        this.oauthService = oauthService;
        this.accessToken = null;
    }

    async getResourseByAuth(path) {
        const url = `${BASE_URL}/${path}`;
        let accessToken = getAccessToken();
        //let accessToken = 'asd';

        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`,
            }
        };


        const response = await fetch(url, requestOptions);
        console.log('???:', response.status);

        /*
        TODO: 
        1. GPT узнать как лучше получать внешние (сторонние из localstorage) данные для переменных, которые понадобятся методам класса для работы
        2. возможно по этой же причине не работает this.oauthService.updateAccessTokenByRefreshToken()
        3. сдулать универсальным вызов this.getResourse(CUSTOMERS_URL, accessToken)
        */

        if (!response.ok) {
            //throw new Error(`Could not fetch ${url}, received ${response}`);
            console.log('Boo', response.status); // воо
            if (response.status === 401) {
                console.log('if (response.status === 401)');
                //console.log('accessToken', accessToken);
                try {
                    accessToken = await this.oauthService.updateAccessTokenByRefreshToken(); // Вызов метода обновления access token из OAuth2Service
                    return this.getResourseByAuth(path); // Повторный вызов метода getAllCustomers с обновленным access token    
                } catch (error) {
                    console.log('updateAccessTokenByRefreshToken error: ', error);
                    throw error;
                }

            } if (response.status === 403) {
                throw new Error(); // TODO добавить ошибку new ForbiddenError и варианты ее обработки
            } if (response.status === 409) {
                throw new Error(); // TODO добавить ошибку new ConflictError и варианты ее обработки
            } else {
                console.log('Throw error.statusCode:', response.status);
                throw new Error(); // Пробросить ошибку, если это не ошибка 401
            }
        }

        return response.json();

        //return await fetch(url, requestOptions);
    }

    withPage = async (get, path, page) => {
        const modifiedPath = page ? `${path}?page=${page}` : path;
        return get(modifiedPath);
    }

    async getAllCustomers(page) {
        console.log('page=', page);
        //page = 1;
        try {
            const response = await this.withPage(this.getResourseByAuth.bind(this), CUSTOMERS_URL, page)
            return response;
        } catch (error) {
            console.log('необработанная ошибка', error);
            throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
        }
    }


    getCurrentCustomer() {
        return this.getResourse(CURRENT_CUSTOMER_URL);
    }
}

export {
    ApiService
}

//TODO:
// 1. добавить параметр page для getAllCustomers
// 2. добавить страничку отображения пользователей: с кнопками пагинации и лоадером при загрузке данных