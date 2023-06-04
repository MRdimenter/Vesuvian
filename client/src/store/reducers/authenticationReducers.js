import { AUTHENTICATION_STATUS } from "../constants";

const initialState = {
  AUTH_STATUS: false,
  AUTH_REQUEST_STATUS: false,
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_STATUS.AUTH_STATUS:
      return {
        AUTH_STATUS: action.payload,
        AUTH_REQUEST_STATUS: true,
      }
    default:
      return state;
  }
}

export {
  authenticationReducer,
  
}