import './header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { darkModeAction } from '../../store/actions/darkModeAction';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';



export const Header = () => {

  // FIXME: разобраться куда можно вынести локальный адрес
  // если сервер авторизации запускается не на локальной машине 
  // то использовать удаленный адрес 
  const KEYCLOAK_URL = 'http://45.141.103.134:8282/realms/dev/protocol/openid-connect';

  //адрес по которому auth server будет отправлять access token 
  const AUTH_CODE_REDIRECT_URL = 'http://localhost:3000/redirect';
  
  // название дожно совпадать с клиентом ищ KeyCloak
  const CLIENT_ID = 'app-dev-client';

  // для получения authorization code
  const RESPONSE_TYPE_CODE = 'code'; 

  // какие данные хотите получить помимо access token (refresh token, id token)
  const SCOPE = 'openid'; 
  
  // используется как параметр для метода шифрования 
  const SHA_256 = 'SHA_256';
  const S256 = 'S256';

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
   * TODO: Переписать на @react-keycloak/web 
   * Получение Access Token c KeyCloak
   * grant type = PKCE
   */
  const runTestAuthorization = async () => {
    // в будущем сохранять его где-то в глобальных переменных
    // должен создаваться автоматически в фоновом режиме при авторизации
    const state = generateState(30);
    const codeVerifier = generateCodeVerifier();
    let codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier).then((value) => {
      return value;
    });


    console.log(`unique string: ${state}`);
    console.log(`code verifier: ${codeVerifier}`);
    console.log(`code challenge: ${codeChallenge}`);

    requestAuthCode(state, codeChallenge);

  }

  /**
   * Запрос на получение auth code 
   * Который потом будет нужен для получения access token и других токенов 
   */
  const requestAuthCode = (state, codeChallenge) => {
    //let authURL = KEYCLOAK_URL + '/auth';
    let authURL = 'http://localhost:3000/login';
    
    authURL += '?response_type=' + RESPONSE_TYPE_CODE;
    authURL += '&client_id=' + CLIENT_ID; // берем из auth server
    authURL += '&state='  + state; // auth server сохранит это значение себе и отправит в следующем запросе
    authURL += '&scope='  + SCOPE; // какие данные хотите получить от auth server 
    authURL += '&code_challenge=' + codeChallenge;
    authURL += '&code_challenge_method=' + S256; // функция применяется к code_verifier 
    authURL += '&redirect_uri=' + AUTH_CODE_REDIRECT_URL; // куда auth server будет отправлять ответ

    window.open(authURL, '_self');
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
    for (var i = 0; i < length; i++) {
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
    let str = "";
    let bytes = new Uint8Array(a);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const generateCodeChallengeFromVerifier = async (v) => {
    let hashed = await sha256(v);
    let base64encoded = base64urlencode(hashed);
    return base64encoded;
  }


  return (
    <div className='header'>
      <Link className='Logo' to={'/'}>Vesuvian :)</Link>
      <LoginButtons />
      <Button label='DarkMode' action={onChangeTheme} />
      <Button label='fetch' action={runFetch} />
      <Button label='test auth 2' action={runTestAuthorization} />
    </div>
  )
}

