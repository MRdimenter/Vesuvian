import React, { useState } from 'react';
import './login.css';

import {KEYCLOAK_URL} from '../../common/constants/OAuth2Constants'
import { postOAuth2 } from '../../common/utils/fetchWrapper';

//TODO - сообщение о неверном логине или пароле

async function loginUser({username, password}) {
     const response = await postOAuth2(KEYCLOAK_URL, username, password);
     console.log(response);
     const {access_token: token} = response;
     //console.log(token);
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    //setToken(token);

    //loginUser();
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