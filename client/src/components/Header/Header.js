import './header.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { darkModeAction } from '../../store/actions/darkModeAction';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';


export const Header = () => {

  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(darkModeAction());
  }

  const runFetch = () => {
    fetch('https://swapi.dev/api/people/1')
      .then((response) => {
        console.log('Got Response', response.status);
        return response.json();
      })
      .then((body) => {
        console.log(body);
      })
  }

  /**
   * Получение Access Token c KeyCloak
   * grant type = PKCE
   */
  const runTestAuthorization = () => {
      console.log("WORK")
  }


  /**
   * Метод возвращает уникальную рандомную строку
   * необходим для сравнения с AuthServer
   * помогает понять что сервер прислал ответ именно на наш запрос
   * служит защитой от CSRF атак
   */
  const generateState = (length) => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const charLength = chars.length;
      let result = '';
      for ( var i = 0; i < length; i++ ) {
          result += chars.charAt(Math.floor(Math.random() * charLength));
      }
      return result;
  }

  return (
    <div className='header'>
      <Link to={'/'}>Main page</Link>
      <LoginButtons />
      <Button action={onChangeTheme} />
      <Button label='fetch' action={runFetch} />
      <Button label= 'test authorization' action={runTestAuthorization} />
    </div>
  )
}

