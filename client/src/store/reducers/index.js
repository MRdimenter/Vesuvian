import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';
import { authenticationReducer } from './authenticationReducers';
import { appendCurrentCustomerDataReducer } from './appendCurrentCustomerDataReducer';
import { collectionReducer } from './collectionReducer';
import { collectionTagsReducer } from './collectionTagsReducer';


const reducers = combineReducers({
  DarkMode: darkModeReducer,
  isAuth: authenticationReducer,
  currentCustomerData: appendCurrentCustomerDataReducer,
  collectionData: collectionReducer,
  collectionTags: collectionTagsReducer,
})

export default reducers;

