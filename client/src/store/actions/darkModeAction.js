import { DARK_MODE_REDUCER } from '../constants';

export const darkModeAction = () => {
  return {
    type: DARK_MODE_REDUCER.DARK_MODE,
    payload: {},
  }
}