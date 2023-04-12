import React, { useEffect, useState } from 'react';
import './login.css';

import {KEYCLOAK_URL} from '../../common/constants/OAuth2Constants'
import { postOAuth2 } from '../../common/utils/fetchWrapper';


import Keycloak from "keycloak-js";

//TODO - сообщение о неверном логине или пароле
console.log('login: ', window.location, '!');



  /**
   * Функция для получения тестового набора данных от бекенд сервера по access_token 
   * 
   * https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
   */
  const getTestDataFromResourceServer = (access_token) => {
    const url = 'http://localhost:8090/user/test';

    
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + access_token); // потом надо будет добавить keycloak.token

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                alert('Success');
                console.log(`received data from the server: ${req.response}`)
            } else if (req.status == 403) {
                alert('Forbidden');
                console.log(`received data from the server: not found`)
            }
        }
    }

   
    req.send();
  
  };



async function loginUser({username, password}) {
     const response = await postOAuth2(KEYCLOAK_URL, username, password);
     console.log(response);
     const {access_token: token} = response;
     

     getTestDataFromResourceServer(token);
}

async function initKeycloak() {
  console.log('initKeycloak');
  const keycloak = new Keycloak({
    url: 'http://45.141.103.134:8282',
    realm: 'dev',
    clientId: 'app-dev-client',
  });



  /**
   * Необходимо инициализировать keycloak что бы он начал работать
   * Необходимо посмотреть в документации как можно это сделать с помощью ввода логина и пароля
   * Сейчас происходит редирект на Keycloak сервер для авторизации 
   * https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter
   * 
   * todo: надо будет раскоментировать и подумать как инициализировать его с помощью логина и пароля 
   */
//   keycloak.init({
//     onLoad: 'login-required'

// });

  //let auth = await keycloak.init({onLoad: "check-sso"});
  console.log("keycloak authenticated: ",keycloak.authenticated);

  /*
  keycloak.init().then(function(authenticated) {
      alert(authenticated ? 'authenticated' : 'not authenticated');
  }).catch(function() {
      alert('failed to initialize');
  });
  */

}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();

    initKeycloak();
    
    const token = await loginUser({
      username,
      password
    });
    
    //setToken(token);
    //loginUse
  }

  

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
       <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}