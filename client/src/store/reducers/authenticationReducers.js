import { AUTHENTICATION_STATUS } from "../constants";

const initialState = {
  AUTH_STATUS: false,
  AUTH_REQUEST_STATUS: true,
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_STATUS.AUTH_STATUS:
      return action.payload;
    default:
      return state;
  }
}

const authenticationRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_STATUS.AUTH_REQUEST_STATUS:
      return action.payload;
    default:
      return state;
  }
}

export {
  authenticationReducer,
  authenticationRequestReducer,
}