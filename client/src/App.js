import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import './App.css';

import { Main } from './components/Main/Main';
import Login from './components/Login/Login';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {RedirectPage} from './components/RedirectPage/RedirectPage';
import OAuthPopup from './components/OAuthPopup/OAuthPopup';
import OAuth2Popup from './components/OAuthPopup/OAuth2Popup'
//import Preferences from './components/Preferences/Preferences';


export const App = () => {
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);

  return (

    <BrowserRouter>
      <div className={!isDarkModeEnabled ? 'wrapper' : 'theme-dark'}>
        <Header />
        <div className='main-wrapper'>
          <Routes>
            <Route path='/' element={<Main />} exact/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/redirect' element={<RedirectPage />}></Route>
            <Route element={<OAuth2Popup />} path="/callback" />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

