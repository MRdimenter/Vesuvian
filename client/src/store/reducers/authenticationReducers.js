import { AUTHENTICATION_STATUS } from "../constants";

const initialState = {
  authStatus: false,
  authState: false, // todo rename auth_state: false
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_STATUS.AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload,
        authState: true,
      }
    case AUTHENTICATION_STATUS.AUTH_STATE:
      return {
        ...state,
        authState: action.payload,
      }
    default:
      return state;
  }
}

export {
  authenticationReducer, 
}