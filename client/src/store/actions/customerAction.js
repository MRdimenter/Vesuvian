import { ApiService } from "../../common/utils/ApiService";
import { BadRequestError, RefreshTokenMissingError } from "../../common/utils/Errors/Errors";
import { OAuth2Service } from "../../common/utils/OAuth2Service";
import { CUSTOMER_DATA } from "../constants";

const startLoadingCustomerData = () => ({
  type: CUSTOMER_DATA.START_LOADING_CUSTOMER_DATA,
});

const finishLoadingCustomerData = () => ({
  type: CUSTOMER_DATA.FINISH_LOADING_CUSTOMER_DATA,
});

const setErrorCustomerData = (error) => ({
  type: CUSTOMER_DATA.CARDS.SET_ERROR_CUSTOMER_DATA,
  error,
});

export const customerDataAction = (customerUUID) => {
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  return async (dispatch) => {
    try {
      // Начало загрузки данных, установка loading: true
      dispatch(startLoadingCustomerData());

      const response = await apiService.getCustomerById(customerUUID);

      // Завершение загрузки данных, установка loading: false
      dispatch(finishLoadingCustomerData());

      dispatch({type: CUSTOMER_DATA.SET_CUSTOMER_DATA, payload: response});
    } catch (error) {
      console.log('&&&&&&&&&&&&&&&777')
      console.error('An error occurred:', error);
      if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
        console.log('(((((99999999999999');
        //TODO общее для приложения состояние "неавторизованности"
      }
      // для внешней (компонентом) обработки ошибки
      dispatch(setErrorCustomerData(error));
      throw error;
    }
  }
}