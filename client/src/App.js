import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { Main } from './components/Main/Main';
import Login from './components/Login/Login';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {RedirectPage} from './components/RedirectPage/RedirectPage';
import { TestPanel } from './components/TestPanel/TestPanel';
import { getAccessTokenByRefreshToken } from './common/utils/accessToken';
import { authenticationAction } from './store/actions/authenticationAction';
import Cookies from 'js-cookie';
//import Preferences from './components/Preferences/Preferences';


export const App = () => {
  console.log('App START');
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);
  //const isAuthenticated = useSelector((state) => state.isAuth);
  const [token, setToken] = useState();
  const [access_token, setAccess_token] = useState();

  // logout: очищает localStorage и меняет состояние на false

  /*
  Функция получает access_token, записывает его в localStorage, возвращает true/false. В дальнейшем если true можем обновить состояние приложения isAutentificated
  хм... при этом access_token может прийти в двух случаях: аутентификация через форму и через обновление.
  в обоих случаях в качестве аргумента мы получаем access_token и выполняем действие: сохранение в localStorage и обновляем состояние приложения
  */
  async function updateAccessToken(access_token) {


    
    localStorage.setItem('access_token', access_token);
    
  }

  useEffect(() => {

    let refresh_token = Cookies.get('refreshToken');
    console.log('refresh_token= ', refresh_token);

    let access_token = ''

    const fetchData = async () => {   //TODO rename и вынести возможно из useEffect
      console.log('start fetchData');
      access_token = await getAccessTokenByRefreshToken(); // пока что есть проблемка: не ясно по какой причине нет access_token (может сервер лежит, с другой стороны 
      //console.log('before setAccess_token', access_token);
      //setAccess_token(access_token);
      //console.log('end fetchData');

      //const access_token = localStorage.getItem('access_token');
      // в это случае при запросе будет сгенерировано событие об ошибке запроса, которое я еще не сделал)
      if (access_token) { // ошибочка вышла - или же по refresh_token проверять? но его тоже нужно проверять!
        console.log('access_token: ', access_token);
        updateAccessToken(access_token);
        dispatch(authenticationAction(true));
      } else {
        console.log('ELSE access_token: ', access_token);
      }
   }
 
   fetchData();
   
    
    
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={!isDarkModeEnabled ? 'wrapper' : 'theme-dark'}>
        <Header />
        <TestPanel/>
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

