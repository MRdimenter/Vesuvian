import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';
import { authenticationReducer } from './authenticationReducers';
import { appendCurrentCustomerDataReducer } from './appendCurrentCustomerDataReducer';


const reducers = combineReducers({
  DarkMode: darkModeReducer,
  isAuth: authenticationReducer,
  currentCustomerData: appendCurrentCustomerDataReducer,
})

export default reducers;

