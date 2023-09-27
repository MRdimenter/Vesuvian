import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';
import { authenticationReducer } from './authenticationReducers';
import { appendCurrentCustomerDataReducer } from './appendCurrentCustomerDataReducer';
import { collectionReducer } from './collectionReducer';


const reducers = combineReducers({
  DarkMode: darkModeReducer,
  isAuth: authenticationReducer,
  currentCustomerData: appendCurrentCustomerDataReducer,
  collectionData: collectionReducer,
})

export default reducers;

