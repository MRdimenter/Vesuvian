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
      // в будущем сохранять его где-то в глобальных переменных
      // должен создаваться автоматически в фоновом режиме при авторизации
      const state = generateState(30)
      const codeVerifier = generateCodeVerifier();
      console.log(`unique string: ${state}`)
      console.log(`code verifier: ${codeVerifier}`)
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

    /**
     * Криптографический ключ для отправки на сервер авторизации для получения токена
     */
  const generateCodeVerifier = () => {
        const array = new Uint32Array(56 / 2);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec2hex).join("");
    }

  const dec2hex = (dec) => {
      return ("0" + dec.toString(16)).substr(-2);
    }




  const sha256 = (plain) => {
        // returns promise ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest("SHA-256", data);
    }


    const base64urlencode = (a) => {
        var str = "";
        var bytes = new Uint8Array(a);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return btoa(str)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    async function generateCodeChallengeFromVerifier(v) {
        var hashed = await sha256(v);
        var base64encoded = base64urlencode(hashed);
        return base64encoded;
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

