import { combineReducers } from 'redux';
import { darkModeReducer } from './darkModeReducer';
import { authenticationReducer } from './authenticationReducers';
import { appendCurrentCustomerDataReducer } from './appendCurrentCustomerDataReducer';
import { collectionReducer } from './collectionReducer';
import { collectionTagsReducer } from './collectionTagsReducer';
import { customerReducer } from './customerReducer';
import { collectionInfoReducer } from './collectionInfoReducer';


const reducers = combineReducers({
  DarkMode: darkModeReducer,
  isAuth: authenticationReducer,
  currentCustomerData: appendCurrentCustomerDataReducer,
  collectionData: collectionReducer,
  collectionInfo: collectionInfoReducer,
  collectionTags: collectionTagsReducer,
  customerDataState: customerReducer,
})

export default reducers;

