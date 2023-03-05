import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import { Main } from './components/Main/Main';
import Login from './components/Login/Login';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
//import Preferences from './components/Preferences/Preferences';


export const App = () => {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <div className='main-wrapper'>
          <Routes>
            <Route path='/main' element={<Main />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

