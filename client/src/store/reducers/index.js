import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
import authenticationReducer from './authenticationReducer';

const reducers = combineReducers({
  DarkMode: darkModeReducer,
  isAuth: authenticationReducer,
})

export default reducers;

