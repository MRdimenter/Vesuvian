import { DARK_MODE_REDUCER } from '../constants';

export const darkModeAction = () => { // TODO передавать payload через предыдущее состояние: (state) =>
  return {
    type: DARK_MODE_REDUCER.DARK_MODE,
    payload: {},
  }
}