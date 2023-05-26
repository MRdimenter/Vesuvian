import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeAction';
import { authenticationAction } from '../../store/actions/authenticationAction';
import { updateAccessToken } from '../../common/utils/useOAuth2';
import { KEYCLOAK_URL, REFRESH_TOKEN } from '../../common/constants/OAuth2Constants';

import './testPanel.scss';

import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';


export const TestPanel = () => {

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
    
    console.log('Hello new access_token:', access_token);
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

  function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
  }

  async function logout() {
    const refresh_token = getRefreshTokenFromCookie();
    const response = await postOAuthLogout('http://45.141.103.134:8282/realms/dev/protocol/openid-connect/logout', refresh_token); // нормальный ответ 204
    console.log(response.status === 204); // TODO добавить логику для выхода пользователя при положительном ответе (ну там очистить всё нужно)
    clearCookies();
    localStorage.clear(); // удалить всё.

    /*
    console.log(response);
    let {access_token} = response;
    
    console.log('Hello access_token:', access_token);
    */
  }

  async function authenticationTest() {
    dispatch(authenticationAction(true))
  }

  const isAuthenticated = useSelector((state) => state.isAuth);

  function readCookies() {
    console.log('Cookies: ', document.cookie);
  }

  function clearCookies() {
    Cookies.remove('refreshToken');
  }

  return (
    <div className='test-panel'>
      <LoginButtons />
      <Button label='DarkMode' action={onChangeTheme} />
      <Button label='fetch' action={runFetch} />
      <Button label='Login' action={viewProfile} />
      <Button label='getAccessTokenByRefreshToken' action={() => getAccessTokenByRefreshToken()} />
      <Button label='Check Refresh Token' action={() => updateAccessToken()} />  
      <Button label='LogOut' action={() => logout()} />
      <Button label='authentication test' action={() => authenticationTest()} />
      <Button label='read Cookies' action={() => readCookies()} />
      <Button label='Clear Cookies' action={() => clearCookies()} />
      <Button label='getAccessTokenByRefreshToken' action={() => getAccessTokenByRefreshToken()} />   
      <div className= {isAuthenticated ? 'auth' : 'notAuth'} >authenticated</div>
    </div>
  )
}

