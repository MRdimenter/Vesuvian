import { DARK_MODE_REDUCER } from '../constants';

const initialState = true;

export const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE_REDUCER.DARK_MODE:
      return !state;
    default:
      return state;
  }
}