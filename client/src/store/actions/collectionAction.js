import { ApiService } from '../../common/utils/ApiService';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { COLLECTION_DATA } from '../constants';

const startLoadingCollection = () => ({
  type: COLLECTION_DATA.START_LOADING_COLLECTION,
});

const finishLoadingCollection = () => ({
  type: COLLECTION_DATA.FINISH_LOADING_COLLECTION,
});

const setErrorCollection = (error) => ({
  type: COLLECTION_DATA.SET_ERROR_COLLECTION,
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

      // Завершение загрузки данных, установка loading: false
      dispatch(finishLoadingCollection());

      dispatch({type: COLLECTION_DATA.SET_COLLECTION_DATA, payload: response});  
    } catch (error) {
      console.error('An error occurred:', error);

      // Ошибка загрузки данных, установка loading: false и сохранение ошибки
      dispatch(finishLoadingCollection());
      dispatch(setErrorCollection(error));

      dispatch({type: COLLECTION_DATA.SET_ERROR_COLLECTION, payload: error});
    }
  }
}

// collectionAction.js


// // Это асинхронное действие с использованием Redux Thunk
// export const fetchCollectionData = () => {
//   return async (dispatch) => {
//     try {
//       // Начало загрузки данных, установка loading: true
//       dispatch(startLoadingCollection());

//       // Здесь вы можете выполнить асинхронную операцию, например, загрузку данных из сети
//       const response = await fetchDataFromServer();

//       // Завершение загрузки данных, установка loading: false
//       dispatch(finishLoadingCollection());

//       // Далее вы можете отправить данные в Redux хранилище, если это необходимо
//       dispatch({ type: 'SET_COLLECTION_DATA', data: response.data });
//     } catch (error) {
//       // Обработка ошибок, если необходимо
//       console.error('An error occurred:', error);

//       // Ошибка загрузки данных, установка loading: false и сохранение ошибки
//       dispatch(finishLoadingCollection());
//       dispatch(setErrorCollection(error));
//     }
//   };
// };
