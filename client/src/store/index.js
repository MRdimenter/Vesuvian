import { /*applyMiddleware,*/ applyMiddleware, legacy_createStore as createStore } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';
//import thunk from 'redux-thunk';
import reduces from './reducers';
import thunk from 'redux-thunk';

//const store = configureStore({ reduces });
//const store = createStore(reduces);

const store = createStore(reduces, applyMiddleware(thunk))


export default store;