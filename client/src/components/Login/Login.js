import React, { useState } from 'react';
import './login.css';

import { KEYCLOAK_URL } from '../../common/constants/OAuth2Constants'
import { getTestDataFromResourceServer, postOAuth2 } from '../../common/utils/fetchWrapper';
import { setRefreshToken } from '../../common/utils/refreshToken';

//TODO - сообщение о неверном логине или пароле
console.log('login: ', window.location, '!');


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postOAuth2(KEYCLOAK_URL, username, password);
    const { refresh_token } = response;

    setRefreshToken(refresh_token);
    //getTestDataFromResourceServer(access_token);
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