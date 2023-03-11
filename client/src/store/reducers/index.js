import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';

const reducers = combineReducers({
  DarkMode: darkModeReducer
})



export default reducers;

