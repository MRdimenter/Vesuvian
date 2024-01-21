import { BASE_URL, COLLECTION_URL, COLLECTION_CARDS_URL_TAIL, CURRENT_CUSTOMER_COLLECTIONS_URL, CURRENT_CUSTOMER_URL, CUSTOMERS_URL, TEMP_BASE_PORT, TEMP_BASE_URL, COLLECTION_TAGS_URL, COLLECTION_TAGS_URL_TAIL, CREATE, METHOD } from "../constants/urlConstants";
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
    console.log('?????? url: ', url);
    let accessToken = getAccessToken();

    //TODO хороший способ оттестировать и починить рекурсию при неверном accessToken
    // accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0Nkx4LV9BM3hrd0lLQkIxUlBWOW9TZFFBWXVwZW5yQ0EyNHg4cDdNX2ljIn0.eyJleHAiOjE2OTkyODMzOTQsImlhdCI6MTY5OTI4MzA5NCwianRpIjoiNjEwNTZkMDQtYzk5Yi00ZmEzLTlmOTgtZTIzZDM3NWFiNmE2IiwiaXNzIjoiaHR0cDovLzIxMi4xMTMuMTIwLjE5ODo4MjgyL3JlYWxtcy9kZXYiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImJyb2tlciIsImFjY291bnQiXSwic3ViIjoiY2Q4OGY0MjItMDA1YS00YjUzLWIzMzgtMmMwNWFmZjM4NTk3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3dhZ2dlci11aSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1kZXYiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsIm1hbmFnZS1jb25zZW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjIxMy4yMzQuMjUyLjExMiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImFkbWluVGVzdCBhZG1pblRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImdpdmVuX25hbWUiOiJhZG1pblRlc3QiLCJmYW1pbHlfbmFtZSI6ImFkbWluVGVzdCIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIiwiZW1haWwiOiJhZG1pbnN3YWdnZXJAZ21haWwuY29tIn0.fF-5l3Edyebovlz6fkPfY3V9fP-THtCUv6QDd-BKt7-iZj_ooGRcDCDJ7WF65X2PggwR_p53OXjfRHx6ll7fMNAGWNE4z3bhxV-cFbeG-_p1gkrHWarBy-kVVEC8sqsnnsILstoIeRODGGBkbrQAlSmP2eeceek46tkse39RwZi7NJBc33AgpbfYJt-STwZJesDp8jr7wlwbjqVeKhxVnJ_CZK0snj1QYMyT53qRwZ43S9hTBKr4v0StJhIWplt9eZC25QPLHW7wWJYCAyY69RKKmdukM1lX1XeM_BbLSSxSSDMsPg_ulbrvaHmjJBCSt3IPijfT1bxfOMNV9rFfiQ'
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

  async fetchResourseByAuth(method, baseURL, path, data) {
    const url = `${baseURL}/${path}`;
    let accessToken = getAccessToken();

    const requestOptions = {
      method,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
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
    //TODO реакцию на успешное или неудачное создание коллекции
    console.log(response);
    return(response.ok)
    //return response.json();
    //return await fetch(url, requestOptions);
  }

  async deleteResourseByAuth(baseURL, path) {
    const url = `${baseURL}/${path}`;
    let accessToken = getAccessToken();

    //TODO хороший способ оттестировать и починить рекурсию при неверном accessToken
    // accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0Nkx4LV9BM3hrd0lLQkIxUlBWOW9TZFFBWXVwZW5yQ0EyNHg4cDdNX2ljIn0.eyJleHAiOjE2OTkyODMzOTQsImlhdCI6MTY5OTI4MzA5NCwianRpIjoiNjEwNTZkMDQtYzk5Yi00ZmEzLTlmOTgtZTIzZDM3NWFiNmE2IiwiaXNzIjoiaHR0cDovLzIxMi4xMTMuMTIwLjE5ODo4MjgyL3JlYWxtcy9kZXYiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImJyb2tlciIsImFjY291bnQiXSwic3ViIjoiY2Q4OGY0MjItMDA1YS00YjUzLWIzMzgtMmMwNWFmZjM4NTk3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic3dhZ2dlci11aSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1kZXYiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctYXBwbGljYXRpb25zIiwidmlldy1jb25zZW50Iiwidmlldy1ncm91cHMiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsIm1hbmFnZS1jb25zZW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiY2xpZW50SG9zdCI6IjIxMy4yMzQuMjUyLjExMiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImFkbWluVGVzdCBhZG1pblRlc3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImdpdmVuX25hbWUiOiJhZG1pblRlc3QiLCJmYW1pbHlfbmFtZSI6ImFkbWluVGVzdCIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIiwiZW1haWwiOiJhZG1pbnN3YWdnZXJAZ21haWwuY29tIn0.fF-5l3Edyebovlz6fkPfY3V9fP-THtCUv6QDd-BKt7-iZj_ooGRcDCDJ7WF65X2PggwR_p53OXjfRHx6ll7fMNAGWNE4z3bhxV-cFbeG-_p1gkrHWarBy-kVVEC8sqsnnsILstoIeRODGGBkbrQAlSmP2eeceek46tkse39RwZi7NJBc33AgpbfYJt-STwZJesDp8jr7wlwbjqVeKhxVnJ_CZK0snj1QYMyT53qRwZ43S9hTBKr4v0StJhIWplt9eZC25QPLHW7wWJYCAyY69RKKmdukM1lX1XeM_BbLSSxSSDMsPg_ulbrvaHmjJBCSt3IPijfT1bxfOMNV9rFfiQ'
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${accessToken}`,
      }
    };
    

    const response = await fetch(url, requestOptions);
    console.log('!!!! response: ', response);
    console.log('!!!! response.status: ', response.status);
    // todo оставлять ли? с 200 и 204? (пока что сервер может выдать один из вариантов)
    // if (response.status !== 200 || response.status !== 204) {
      if(!response.ok) {
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
    return true;
    //return await fetch(url, requestOptions);
  }

  withId = (request, baseURL, path, id) => {
    const modifiedPath = `${path}/${id}`;
    return request(baseURL, modifiedPath);
  }

  withIdAndItemId = (request, baseURL, path, collectionId, itemPath, itemId) => {
    const modifiedPath = `${path}/${collectionId}/${itemPath}/${itemId}`;
    return request(baseURL, modifiedPath);
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
    console.log('!!!!!!!! getCurrentCustomer');
    try {
      const response = this.getResourseByAuth(BASE_URL, CURRENT_CUSTOMER_URL);
      console.log('response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCurrentCustomer', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async getCustomerById(customerId) {
    try {
      const response = await this.withId(this.getResourseByAuth.bind(this), BASE_URL, CUSTOMERS_URL, customerId);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCustomerById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
  }

  async getCurrentCustomerCollections() {
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, CURRENT_CUSTOMER_COLLECTIONS_URL);
      return response;
    } catch (error) {
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async getCollectionDataById(colleciotId) {
    const fullCollectionURL = `${COLLECTION_URL}/${colleciotId}`;
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, fullCollectionURL);
      console.log('getCollectionById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async getCollectionInfoById(colleciotId) {
    const fullCollectionURL = `${COLLECTION_URL}/${colleciotId}`;
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, fullCollectionURL);
      console.log('getCollectionInfoById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  //TODO rename: по сути getCollectionById получает коллекцию карточек => getCollectionCardsById
  async getCollectionById(colleciotId) {
    const fullCollectionURL = `${COLLECTION_URL}/${colleciotId}/${COLLECTION_CARDS_URL_TAIL}`;
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, fullCollectionURL);
      console.log('getCollectionById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async getCollectionTagsById(colleciotId) {
    const fullCollectionURL = `${COLLECTION_TAGS_URL}/${colleciotId}/${COLLECTION_TAGS_URL_TAIL}`;
    try {
      const response = this.getResourseByAuth(TEMP_BASE_URL, fullCollectionURL);
      console.log('getCollectionTagsById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionTagsById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async postNewCollectionTagById(collectionData, colleciotId) {
    const fullCollectionURL = `${COLLECTION_TAGS_URL}/${colleciotId}/${COLLECTION_TAGS_URL_TAIL}`;
    
    try {
      const response = this.fetchResourseByAuth(METHOD.POST, TEMP_BASE_URL, fullCollectionURL, collectionData)
      console.log('getCollectionById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  async deleteCollectionTag(tagId, collectionId) {
    const fullCollectionURL = `${COLLECTION_TAGS_URL}`; // поменять на временный для тэгов
    
    try {
      const deleteResponse = await this.withIdAndItemId(
          this.deleteResourseByAuth.bind(this),
          TEMP_BASE_URL,
          fullCollectionURL,
          collectionId,
          COLLECTION_TAGS_URL_TAIL,
          tagId
        );
      console.log('deleteCollection deleteResponse: ', deleteResponse);
      return deleteResponse;
    } catch (error) {
      console.log('необработанная ошибка deleteCollection', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  //TODO пора бы разделять API на сущности: CustomerAPI, CollectionAPI etc.
  async postCreateCollection(collectionData) {
    const fullCollectionURL = `${COLLECTION_URL}/${CREATE}`;
    
    try {
      const response = this.fetchResourseByAuth(METHOD.POST, TEMP_BASE_URL, fullCollectionURL, collectionData)
      console.log('getCollectionById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  //TODO пора бы разделять API на сущности: CustomerAPI, CollectionAPI etc.
  async putCreateCollection(collectionData, collectionId) {
    const fullCollectionURL = `${COLLECTION_URL}/${collectionId}`;
    
    try {
      const response = this.fetchResourseByAuth(METHOD.PUT, TEMP_BASE_URL, fullCollectionURL, collectionData)
      console.log('getCollectionById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  //TODO пора бы разделять API на сущности: CustomerAPI, CollectionAPI etc.
  async deleteCollection(collectionId) {
    const fullCollectionURL = `${COLLECTION_URL}`;
    
    try {
      const deleteResponse = await this.withId(this.deleteResourseByAuth.bind(this), TEMP_BASE_URL, fullCollectionURL, collectionId);
      console.log('deleteCollection deleteResponse: ', deleteResponse);
      return deleteResponse;
    } catch (error) {
      console.log('необработанная ошибка deleteCollection', error);
      throw error; // Пробросываем ошибку для обработки её компонентом, вызывающим метод getAllCustomers
    }
    //return this.getResourseByAuth(CURRENT_CUSTOMER_URL);
  }

  //TODO пора бы разделять API на сущности: CustomerAPI, CollectionAPI etc.
  async postCreateCard(collectionId, cardData) {
    const fullCollectionURL = `${COLLECTION_URL}/${collectionId}/${COLLECTION_CARDS_URL_TAIL}`;
    
    try {
      const response = this.fetchResourseByAuth(METHOD.POST, TEMP_BASE_URL, fullCollectionURL, cardData)
      console.log('getCollectionById response: ', response);
      return response;
    } catch (error) {
      console.log('необработанная ошибка getCollectionById', error);
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