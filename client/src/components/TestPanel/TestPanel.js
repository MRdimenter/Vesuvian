import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeAction';
import { authenticationAction } from '../../store/actions/authenticationActions';
import { updateAccessToken, updateAccessTokenByRefreshToken } from '../../common/utils/useOAuth2';
import { KEYCLOAK_URL, REFRESH_TOKEN } from '../../common/constants/OAuth2Constants';

import './testPanel.scss';

import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';
import { TestLoginButtons } from './TestLoginButtons/TestLoginButtons';
import { get, getString } from '../../common/utils/fetchWrapper';


export const TestPanel = () => {

  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(darkModeAction());
  }

  
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

  function readCookies() {
    console.log('Cookies: ', document.cookie);
  }

  function clearCookies() {
    Cookies.remove('refreshToken');
  }

  async function getTestString() {
    let url = 'api/v1/customers/me';
    url = 'api/v1/customers/test';
    
    let response = await getString(url);
    console.log(response);
  }

  async function getDataMe() {
    let url = 'api/v1/customers/me';
    
    let response = await get(url);
    console.log(response);
  }

  return (
    <div className='test-panel'>
      <LoginButtons />
      <Button btnStyle='link' label='ErrorPage' link={'/errorPage'} />
      <Button label='DarkMode' action={onChangeTheme} />
      <Button label='getAccessTokenByRefreshToken' action={() => getAccessTokenByRefreshToken()} />
      <Button label='Check Refresh Token' action={() => updateAccessToken()} />
      <Button label='read Cookies' action={() => readCookies()} />
      <Button label='Clear Cookies' action={() => clearCookies()} />
      <Button label='getAccessTokenByRefreshToken' action={() => getAccessTokenByRefreshToken()} />
      <Button label='updateAccessTokenByRefreshToken' action={() => updateAccessTokenByRefreshToken()} />
      
      <Button label='getTestString' action={() => getTestString()} />
      <Button label='APIme' action={() => getDataMe()} />
      <TestLoginButtons/>
    </div>
  )
}

