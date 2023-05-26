import React, { useState } from 'react';
import { Button } from '../Button/Button';

import './loginButtons.scss';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { authenticationAction } from '../../store/actions/authenticationAction';

const REFRESH_TOKEN = 'refreshToken';


export const LoginButtons = () => {

  const dispatch = useDispatch();

  const [token, setToken] = useState();
  const isAuthenticated = useSelector((state) => state.isAuth);

  const action = () => {
    console.log('action onClick');
    // setToken((state) => !state) // тестовое действие
    window.location.assign('http://localhost:3000/login/'); // ерезагружка приложения - неверное действие
  }

  async function handleResponse(response) {
    return await response.json();
  }

  function postOAuthLogout(url, refresh_token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            //'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
          })
    };
    return fetch(url, requestOptions);
  }

  async function logout() {
    const refresh_token = getRefreshTokenFromCookie();
    
    const response = await postOAuthLogout('http://45.141.103.134:8282/realms/dev/protocol/openid-connect/logout', refresh_token); // нормальный ответ 204
    
    //console.log(response.status === 204); // TODO добавить логику для выхода пользователя при положительном ответе (ну там очистить всё нужно)

    clearCookies();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
  }

  function clearCookies() {
    Cookies.remove('refreshToken');
  }

  if (!token) return (
    <div className='loginButtons'>
      <div className= {!isAuthenticated ? 'auth' : 'notAuth'} >
        <Button btnStyle='link' label='Регистрироваться' link={'/dashboard'} />
        <Button btnStyle='link' label='Вход' link={'/login'} />
      </div>
      <div className= {isAuthenticated ? 'auth' : 'notAuth'}>
        <Button btnStyle='link' label='LogOut' link={'/'} action={() => logout() } />
      </div>
    </div>
  )

  return <h3>Приветствую пользователь</h3>
}

