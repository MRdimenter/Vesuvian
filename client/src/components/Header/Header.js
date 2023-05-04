import './header.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { darkModeAction } from '../../store/actions/darkModeAction';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';

import {checkRefreshTokenExist} from '../../common/utils/refreshToken';
import { KEYCLOAK_URL } from '../../common/constants/OAuth2Constants';


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

  const  viewProfile = function() {
    window.location.assign('http://localhost:3000/login/');
    };

  
  async function getAccessTokenByRefreshToken() {
    const response = await postOAuth2RefreshToken(KEYCLOAK_URL);
    console.log(response);
    let {access_token} = response;
    
    console.log('Hello access_token:', access_token);
  }

  function postOAuth2RefreshToken(url) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body:  new URLSearchParams({
            'client_id': 'app-dev-client',
            'grant_type': 'refresh_token',
            'refresh_token': 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0MjdlZThjOC04NTRjLTQ3MTYtOWI1MS0xMGI4ZTcyMzFhMWMifQ.eyJleHAiOjE2ODMyMjkxMTQsImlhdCI6MTY4MzIyNzMxNCwianRpIjoiNmRjMjdlMTQtZjlhOS00NDgyLThmYjAtZDQ4NWNhM2ZkMzcwIiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6Imh0dHA6Ly80NS4xNDEuMTAzLjEzNDo4MjgyL3JlYWxtcy9kZXYiLCJzdWIiOiI2YzJjOWZiNi0zMzAxLTQzNTUtYTVhMi1iN2U4OWUxMTZmNzciLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiYXBwLWRldi1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiYzU1YWU2MTYtZDc2Zi00OWQyLTgyYzQtY2Q3ZjE3MDFmMWJiIiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiYzU1YWU2MTYtZDc2Zi00OWQyLTgyYzQtY2Q3ZjE3MDFmMWJiIn0.mb-maakwaJKLcitaxKyDCGKvDlNecnq2lxN6TbMXQLo',
          })
    };
    return fetch(url, requestOptions).then(handleResponse);
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


  return (
    <div className='header'>
      <Link className='Logo' to={'/'}>Vesuvian :)</Link>
      <LoginButtons />
      <Button label='DarkMode' action={onChangeTheme} />
      <Button label='fetch' action={runFetch} />
      <Button label='Login' action={viewProfile} />
      <Button label='getAccessTokenByRefreshToken' action={() => getAccessTokenByRefreshToken()} />
      <Button label='Check Refresh Token' action={() => checkRefreshTokenExist()} />  
      <Button label='LogOut' action={() => logout()} />
      
    </div>
  )
}

