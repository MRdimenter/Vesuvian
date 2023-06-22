import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeAction';
import { getAccessToken, updateAccessTokenByRefreshToken } from '../../common/utils/useOAuth2';
import { KEYCLOAK_URL } from '../../common/constants/OAuth2Constants';

import './testPanel.scss';

import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';
import { TestLoginButtons } from './TestLoginButtons/TestLoginButtons';
import { get, getString, getTestDataFromResourceServer } from '../../common/utils/fetchWrapper';


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

  function readCookies() {
    console.log('Cookies: ', document.cookie);
  }

  function clearCookies() {
    Cookies.remove('refreshToken');
  }

  async function getTestString() {
    let url = 'api/v1/customers/me';
    //let url = 'api/v1/customers/test';
    
    let response = await getString(url);
    //let response = await getTestDataFromResourceServer(url);
    //console.log(response);
  }

  async function testDataFromResourceServer() {
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUzZVLXFOVXFOZ1ZybnJTUGwzc0FJWko1NVliUUFRNHl2ekgzRTFyNmNNIn0.eyJleHAiOjE2ODc0MzEzMjcsImlhdCI6MTY4NzQzMTAyNywianRpIjoiZjBjODM2M2EtMmE3NS00YzE2LTgzMjktYzFjZDk0NzA0MGJkIiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1ZDczMmM0Zi0xMzVlLTRmZGQtOTdlZS0xYjkzNDY2YzBiNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzd2FnZ2VyLXVpIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCB1c2VyIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMjEzLjIzNC4yNTIuMTEyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIn0.D3DpbCKyhxiROsryibEXcNh5ZDw6DereDm3lnfkauugsoiB6kj-xx0yvPSdcNfhhjF_VZdiSPYiukvp1PsW8-LvKtzPIfXQPUs6kLiezET8AFqESJKTSoYUqzDeZzB0BxQKbH45nB3iD-tRCtiLivvt3Q1as4SzuZGOjQytig3XeA9y_kA9ir8fqp68ezyHKTJDdH-vR12FPAOhgrxxAg2N7HXiEqalOqlVj_beU7tQX343wp_yIpTVthx4EDUVwYJ9TJ6GcR4zpX2CuFR0lCpr83mSVnXfwPkwBaa4kUaDrrUsLeq7WaE2gO9Rh9baKXd6HhmTEuEhDP_MAxJqj3Q'
//    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUzZVLXFOVXFOZ1ZybnJTUGwzc0FJWko1NVliUUFRNHl2ekgzRTFyNmNNIn0.eyJleHAiOjE2ODc0MzEzMjcsImlhdCI6MTY4NzQzMTAyNywianRpIjoiZjBjODM2M2EtMmE3NS00YzE2LTgzMjktYzFjZDk0NzA0MGJkIiwiaXNzIjoiaHR0cDovLzQ1LjE0MS4xMDMuMTM0OjgyODIvcmVhbG1zL2RldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1ZDczMmM0Zi0xMzVlLTRmZGQtOTdlZS0xYjkzNDY2YzBiNzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzd2FnZ2VyLXVpIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWRldiIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCB1c2VyIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMjEzLjIzNC4yNTIuMTEyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3dhZ2dlci11aSIsImNsaWVudEFkZHJlc3MiOiIyMTMuMjM0LjI1Mi4xMTIiLCJjbGllbnRfaWQiOiJzd2FnZ2VyLXVpIn0.D3DpbCKyhxiROsryibEXcNh5ZDw6DereDm3lnfkauugsoiB6kj-xx0yvPSdcNfhhjF_VZdiSPYiukvp1PsW8-LvKtzPIfXQPUs6kLiezET8AFqESJKTSoYUqzDeZzB0BxQKbH45nB3iD-tRCtiLivvt3Q1as4SzuZGOjQytig3XeA9y_kA9ir8fqp68ezyHKTJDdH-vR12FPAOhgrxxAg2N7HXiEqalOqlVj_beU7tQX343wp_yIpTVthx4EDUVwYJ9TJ6GcR4zpX2CuFR0lCpr83mSVnXfwPkwBaa4kUaDrrUsLeq7WaE2gO9Rh9baKXd6HhmTEuEhDP_MAxJqj3Q'

    getTestDataFromResourceServer(accessToken)
  }

  async function getDataMe() {
    let url = 'api/v1/customers/me';
    
    let response = await get(url);
    console.log(response);
  }

  function getAccessTokenFromLocalStorage() {
    const accessToken = getAccessToken()
    console.log('accessToken: ', accessToken);
  }

  return (
    <div className='test-panel'>
      <LoginButtons />
      <Button btnStyle='link' label='ErrorPage' link={'/errorPage'} />
      <Button label='DarkMode' action={onChangeTheme} />
      <Button label='getAccessTokenByRefreshToken' action={() => getAccessTokenByRefreshToken()} />
      <Button label='read Cookies' action={() => readCookies()} />
      <Button label='Clear Cookies' action={() => clearCookies()} />
      <Button label='getAccessTokenFromLocalStorage' action={() => getAccessTokenFromLocalStorage()} />
      <Button label='updateAccessTokenByRefreshToken' action={() => updateAccessTokenByRefreshToken()} />
      
      <Button label='getTestString' action={() => getTestString()} />
      <Button label='getTestString' action={() => testDataFromResourceServer()} />
      
      <Button label='APIme' action={() => getDataMe()} />
      <TestLoginButtons/>
    </div>
  )
}

