import { updateAccessTokenByRefreshToken } from "../../common/utils/useOAuth2"
import { AUTHENTICATION_STATUS } from "../constants"

/*
  Description TODO
*/

const authenticationAction = () => {
  return async (dispatch) => {
    try {
      const accessToken = await updateAccessTokenByRefreshToken(); // пока что есть проблемка: не ясно по какой причине нет accessToken (может сервер лежит), данные обработчики нужно добавить в обработку ошибок 
  
      if (accessToken) {
        dispatch({type: AUTHENTICATION_STATUS.authStatus, payload: true});
      } else {
        dispatch({type: AUTHENTICATION_STATUS.authStatus, payload: false});
      }
    } catch (error) {
      dispatch({type: AUTHENTICATION_STATUS.authStatus, payload: false});
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