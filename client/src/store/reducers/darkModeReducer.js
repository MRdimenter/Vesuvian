import { DARK_MODE_REDUCER } from '../constants';

const initialState = false;

export default function darkModeReducer(state = initialState, action) {
  switch (action.type) {
    case DARK_MODE_REDUCER.DARK_MODE:
      return !state;
    default:
      return state;
  }
}