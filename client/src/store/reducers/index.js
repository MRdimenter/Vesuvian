import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';
import { authenticationReducer, authenticationRequestReducer } from './authenticationReducers';


const reducers = combineReducers({
  DarkMode: darkModeReducer,
  isAuth: authenticationReducer,
  isAuthLoading: authenticationRequestReducer,
})

export default reducers;

