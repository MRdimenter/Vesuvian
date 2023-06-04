import { AUTHENTICATION_STATUS } from "../constants"

/*
  Description TODO
*/
const authenticationAction = (value) => {
  return {
    type: AUTHENTICATION_STATUS.authStatus,
    payload: value,
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