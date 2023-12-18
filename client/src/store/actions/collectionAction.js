import { ApiService } from '../../common/utils/ApiService';
import { BadRequestError, RefreshTokenMissingError } from '../../common/utils/Errors/Errors';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { COLLECTION_DATA } from '../constants';

const startLoadingCollection = () => ({
  type: COLLECTION_DATA.CARDS.START_LOADING_COLLECTION,
});

const finishLoadingCollection = () => ({
  type: COLLECTION_DATA.CARDS.FINISH_LOADING_COLLECTION,
});

const setErrorCollection = (error) => ({
  type: COLLECTION_DATA.CARDS.SET_ERROR_COLLECTION,
  error,
});

const startLoadingCollectionTags = () => ({
  type: COLLECTION_DATA.TAGS.START_LOADING_COLLECTION_TAGS,
});

const finishLoadingCollectionTags = () => ({
  type: COLLECTION_DATA.TAGS.FINISH_LOADING_COLLECTION_TAGS,
});

const setErrorCollectionTags = (error) => ({
  type: COLLECTION_DATA.TAGS.SET_ERROR_COLLECTION_TAGS,
  error,
});

const startDeletingCollectionInfo = () => ({
  type: COLLECTION_DATA.TAGS.START_LOADING_COLLECTION_TAGS,
});

const finishDeletingCollectionInfo = () => ({
  type: COLLECTION_DATA.TAGS.FINISH_LOADING_COLLECTION_TAGS,
});

const setDeletingCollectionInfo = (error) => ({
  type: COLLECTION_DATA.TAGS.SET_ERROR_COLLECTION_TAGS,
  error,
});

export const collectionAction = (collectionId) => {
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  return async (dispatch) => {
    try {
      // Начало загрузки данных, установка loading: true
      dispatch(startLoadingCollection());

      const response = await apiService.getCollectionById(collectionId);
      console.log('collectionAction response: ', response);
      const collectionDataWhithCollectionId = {
        collectionId: response.collection_id,
        collectionCards: response.cards
      }

      // Завершение загрузки данных, установка loading: false
      dispatch(finishLoadingCollection());

      dispatch({type: COLLECTION_DATA.CARDS.SET_COLLECTION_DATA, payload: collectionDataWhithCollectionId});
    } catch (error) {
      console.log('&&&&&&&&&&&&&&&777')
      console.error('An error occurred:', error);
      if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
        console.log('(((((99999999999999');
      }
      // для внешней (компонентом) обработки ошибки
      // dispatch(finishLoadingCollection());
      throw error;

      // Ошибка загрузки данных, установка loading: false и сохранение ошибки
      dispatch(finishLoadingCollection());
      dispatch(setErrorCollection(error));

      dispatch({type: COLLECTION_DATA.SET_ERROR_COLLECTION, payload: error});
    }
  }
}

// toto опечатка
export const delectecollectionAction = (collectionId) => {
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  return async (dispatch) => {
    try {
      // Начало загрузки данных, установка loading: true
      // dispatch(startLoadingCollection());
      const response = await apiService.deleteCollection(collectionId);
      

      console.log('!!!!!!!!!! delectecollectionAction response: ', response);

      // Завершение загрузки данных, установка loading: false
      // dispatch(finishLoadingCollection());

      dispatch({type: COLLECTION_DATA.INFO.DELETE_COLLECTION_INFO, payload: response});
    } catch (error) {
      console.log('&&&&&&&&&&&&&&&777')
      console.error('An error occurred:', error);
      if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
        console.log('(((((99999999999999');
        // TODO: общее состояние для RefreshTokenMissingError и BadRequestError
      }
      // для внешней (компонентом) обработки ошибки
      // dispatch(finishLoadingCollection());
      throw error;

      // Ошибка загрузки данных, установка loading: false и сохранение ошибки
      // dispatch(finishLoadingCollection());
      // dispatch(setErrorCollection(error));

      dispatch({type: COLLECTION_DATA.SET_ERROR_DELETE_COLLECTION_DATA, payload: error});
    }
  }
}

export const collectionTagsAction = (collectionId) => {
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  return async (dispatch) => {
    try {
      // Начало загрузки данных, установка loading: true
      dispatch(startLoadingCollectionTags());

      const response = await apiService.getCollectionTagsById(collectionId);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!! response: ', response);
      const collectionTagsWhithCollectionId = {
        collectionId,
        collectionTags: response
      }

      // Завершение загрузки данных, установка loading: false
      dispatch(finishLoadingCollectionTags());

      dispatch({type: COLLECTION_DATA.TAGS.SET_COLLECTION_TAGS_DATA, payload: collectionTagsWhithCollectionId});
    } catch (error) {
      // для внешней (компонентом) обработки ошибки
      throw error;

      // Ошибка загрузки данных, установка loading: false и сохранение ошибки
      dispatch(finishLoadingCollectionTags());
      dispatch(setErrorCollectionTags(error));

      dispatch({type: COLLECTION_DATA.SET_ERROR_COLLECTION, payload: error});
    }
  }
}

export const collectionInfoAction = (collectionId) => {
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  return async (dispatch) => {
    try {
      const response = await apiService.getCollectionInfoById(collectionId);
      
      console.log('!!!!!!!! response: ', response);

      dispatch({type: COLLECTION_DATA.INFO.SET_COLLECTION_INFO, payload: response});
    } catch (error) {
      // для внешней (компонентом) обработки ошибки
      throw error;
    }
  }
}