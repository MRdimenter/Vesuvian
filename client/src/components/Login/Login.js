import React, { useEffect, useState } from 'react';
import './login.css';

import {KEYCLOAK_URL} from '../../common/constants/OAuth2Constants'
import { postOAuth2 } from '../../common/utils/fetchWrapper';

import Keycloak from "keycloak-js";

//TODO - сообщение о неверном логине или пароле
console.log('login: ', window.location, '!');

async function loginUser({username, password}) {
     const response = await postOAuth2(KEYCLOAK_URL, username, password);
     console.log(response);
     const {access_token: token} = response;
     //console.log(token);
}

async function initKeycloak() {
  console.log('initKeycloak');
  const keycloak = new Keycloak({
    url: 'http://45.141.103.134:8282',
    //http://45.141.103.134:8282/realms/dev/protocol/openid-connect/token
    realm: 'dev',
    clientId: 'app-dev-client',
    username: 'test',
    password: 'test',
  });

  //let auth = await keycloak.init({onLoad: "check-sso"});
  console.log('asd', keycloak.subject);

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