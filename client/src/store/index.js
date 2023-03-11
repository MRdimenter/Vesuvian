import { /*applyMiddleware,*/ legacy_createStore as createStore } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';
//import thunk from 'redux-thunk';
import reduces from './reducers';

const store = createStore(reduces);

//const store = configureStore({ reduces });

export default store;