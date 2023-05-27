import { AUTHENTICATION_STATUS } from "../constants"

/*
  Description TODO
*/
export const authenticationAction = (value) => {
  return {
    type: AUTHENTICATION_STATUS, // TODO constant
    payload: value,
  }
}