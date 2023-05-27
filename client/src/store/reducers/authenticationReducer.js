import { AUTHENTICATION_STATUS } from "../constants";

const initialState = false;

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_STATUS:
      return action.payload;
    default:
      return state;
  }
}