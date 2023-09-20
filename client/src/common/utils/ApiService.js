import { BASE_URL, CURRENT_CUSTOMER_COLLECTIONS_URL, CURRENT_CUSTOMER_URL, CUSTOMERS_URL, TEMP_BASE_PORT, TEMP_BASE_URL } from "../constants/urlConstants";
import { ServerError } from "./Errors/Errors";
import { getAccessToken } from "./useOAuth2";

/*
    Данный класс ApiService является службой для взаимодействия с API. 
    Он предоставляет методы для получения ресурсов с использованием аутентификации 
    и обрабатывает возможные ошибки, которые могут возникнуть при обращении к API.
*/

class ApiService {
  constructor(oauthService) {
    this.oauthService = oauthService;
    this.accessToken = null;
  }

  async getResourseByAuth(baseURL, path) {
    const url = `${baseURL}/${path}`;
        let accessToken = getAccessToken();

    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`,
      }
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      //throw new Error(`Could not fetch ${url}, received ${response}`);
      console.log('Boo', response.status); // воо
      if (response.status === 401) {
        console.log('if (response.status === 401)');
        //console.log('accessToken', accessToken);
        try {
          accessToken = await this.oauthService.updateAccessTokenByRefreshToken(); // Вызов метода обновления access token из OAuth2Service
          return this.getResourseByAuth(baseURL, path); // Повторный вызов метода getAllCustomers с обновленным access token    
        } catch (error) {
          console.log('updateAccessTokenByRefreshToken error: ', error);
          throw error;
        }

      } if (response.status === 403) {
        throw new ServerError(); // TODO добавить ошибку new ForbiddenError и варианты ее обработки
      } if (response.status === 409) {
        throw new ServerError(); // TODO добавить ошибку new ConflictError и варианты ее обработки
      } else {
        console.log('Throw error.statusCode:', response.status);
        throw new ServerError(response.status);
      }
    }
    return response.json();
    //return await fetch(url, requestOptions);
  }

  withPagesParams = (get, baseURL, path, page, size) => {
    const modifiedPath = `${path}?page=${page}&size=${size}`;
    return get(baseURL, modifiedPath);
  }

  async getAllCustomers(page = 1, size = 10) {
    try {
      const response = await this.withPagesParams(this.getResourseByAuth.bind(this), BASE_URL, CUSTOMERS_URL, page, size);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getAllCustomers', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
  }

  async getCurrentCustomer() {
    try {
      const response = this.getResourseByAuth(BASE_URL, CURRENT_CUSTOMER_URL);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCurrentCustomer', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async getCurrentCustomerCollections() {
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, CURRENT_CUSTOMER_COLLECTIONS_URL);
      console.log('response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCurrentCustomer', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async getCurrentCustomerCollections() {
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, CURRENT_CUSTOMER_COLLECTIONS_URL);
      console.log('response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCurrentCustomer', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }
}

export {
  ApiService
}

//TODO:
// 1. добавить параметр page для getAllCustomers
// 2. добавить страничку отображения пользователей: с кнопками пагинации и лоадером при загрузке данных