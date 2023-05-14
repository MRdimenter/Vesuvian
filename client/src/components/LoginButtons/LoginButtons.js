import React, { useState } from 'react';
import { Button } from '../Button/Button';

import './loginButtons.scss';

export const LoginButtons = () => {

  const [token, setToken] = useState();

  const action = () => {
    console.log('action onClick');
    setToken((state) => !state)
  }

  async function handleResponse(response) {
    return await response.json();
  }

  function postOAuthLogout(url) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            //'grant_type': 'refresh_token',
            'refresh_token': 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0MjdlZThjOC04NTRjLTQ3MTYtOWI1MS0xMGI4ZTcyMzFhMWMifQ.eyJleHAiOjE2ODMyMjkxMTQsImlhdCI6MTY4MzIyNzMxNCwianRpIjoiNmRjMjdlMTQtZjlhOS00NDgyLThmYjAtZDQ4NWNhM2ZkMzcwIiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6Imh0dHA6Ly80NS4xNDEuMTAzLjEzNDo4MjgyL3JlYWxtcy9kZXYiLCJzdWIiOiI2YzJjOWZiNi0zMzAxLTQzNTUtYTVhMi1iN2U4OWUxMTZmNzciLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiYXBwLWRldi1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiYzU1YWU2MTYtZDc2Zi00OWQyLTgyYzQtY2Q3ZjE3MDFmMWJiIiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiYzU1YWU2MTYtZDc2Zi00OWQyLTgyYzQtY2Q3ZjE3MDFmMWJiIn0.mb-maakwaJKLcitaxKyDCGKvDlNecnq2lxN6TbMXQLo',
          })
    };
    return fetch(url, requestOptions).then(handleResponse);
  }

  async function logout() {
    const response = await postOAuthLogout('http://45.141.103.134:8282/realms/dev/protocol/openid-connect/logout'); // нормальный ответ 204
    /*
    console.log(response);
    let {access_token} = response;
    
    console.log('Hello access_token:', access_token);
    */
  }
  

  if (!token) return (
    <div className='loginButtons'>
      <Button btnStyle='link' label='Регистрироваться' link={'/dashboard'} />
      <Button label='Вход' link={'/login'} action={action} />
      <Button label='LogOut' action={() => logout()} />
    </div>
  )

  return <h3>Приветствую пользователь</h3>
}

