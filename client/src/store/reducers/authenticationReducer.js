//import { DARK_MODE_REDUCER } from '../constants'; todo add

const initialState = false;

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH':
      return true;
    default:
      return state;
  }
}