import { AUTHENTICATION_STATUS } from "../constants"

/*
  Description TODO
*/
const authenticationAction = (value) => {
  return {
    type: AUTHENTICATION_STATUS.AUTH_STATUS,
    payload: value,
  }
}

export {
  authenticationAction,
}