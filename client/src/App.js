import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import './App.scss';

import { Main } from './components/Main/Main';
import Login from './components/Login/Login';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {RedirectPage} from './components/RedirectPage/RedirectPage';
//import Preferences from './components/Preferences/Preferences';


export const App = () => {
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);
  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <div className={!isDarkModeEnabled ? 'wrapper' : 'theme-dark'}>
        <Header />
        <div className='main-wrapper'>
          <Routes>
            <Route path='/' element={<Main />} exact/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login setToken={setToken}/>} />
            <Route path='/redirect' element={<RedirectPage />}></Route>
          </Routes>
        </div>

        
      </div>
      <Footer />
    </BrowserRouter>
  );
}

