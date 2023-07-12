import { OAuth2Service } from "../../common/utils/OAuth2Service";
import { AUTHENTICATION_STATUS } from "../constants"

/*
  Description TODO
*/

const authenticationAction = () => {
  console.log('try authenticationAction');
  const oAuth2Servise = new OAuth2Service();

  return async (dispatch) => {
    try {
      dispatch(authenticationStateAction(false));
      const accessToken = await oAuth2Servise.updateAccessTokenByRefreshToken(); // пока что есть проблемка: не ясно по какой причине нет accessToken (может сервер лежит), данные обработчики нужно добавить в обработку ошибок 
      if (accessToken) {
        dispatch({type: AUTHENTICATION_STATUS.AUTH_STATUS, payload: true});
      } else {
        dispatch({type: AUTHENTICATION_STATUS.AUTH_STATUS, payload: false});
      }
    } catch (error) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
      dispatch({type: AUTHENTICATION_STATUS.AUTH_STATUS, payload: false});
    } finally {
      dispatch(authenticationStateAction(true));
    }
  }
}

const authenticationStateAction = (value) => {
  return {
    type: AUTHENTICATION_STATUS.AUTH_STATE,
    payload: value,
  }
}

export {
  authenticationAction,
  authenticationStateAction,
}