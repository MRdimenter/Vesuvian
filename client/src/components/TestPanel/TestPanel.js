import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeAction';
import { getAccessToken, setWrongAccessToken, updateAccessTokenByRefreshToken } from '../../common/utils/useOAuth2';
import { KEYCLOAK_URL } from '../../common/constants/OAuth2Constants';

import './testPanel.scss';

import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';
import { TestLoginButtons } from './TestLoginButtons/TestLoginButtons';
import { get, getAuth, getString, getTestDataFromResourceServer } from '../../common/utils/fetchWrapper';
import { ApiService } from '../../common/utils/ApiService';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { BadRequestError, RefreshTokenMissingError } from '../../common/utils/Errors/Errors';
import { useNavigate } from 'react-router-dom';
import { authenticationAction } from '../../store/actions/authenticationActions';


export const TestPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeTheme = () => {
    dispatch(darkModeAction());
  }

  async function getAccessTokenByRefreshToken() {
    console.log('НЕ АКТУАЛЬНАЯ, т.к. refresh_token статический');
    const response = await postOAuth2RefreshToken(KEYCLOAK_URL);
    console.log(response);
    let { access_token } = response;

    console.log('Hello new access_token:', access_token);
  }

  function postOAuth2RefreshToken(url) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams({
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

  async function testDataFromResourceServer() {

    const accessToken = getAccessToken();

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

  async function getCustomers() { //TODO refactor into clear func
    let url = 'api/v1/customers'
    const accessToken = getAccessToken();
    
    let response = await getAuth(url, accessToken);
    console.log(response);
  }

  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();

    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  async function getAPICustomers(page) { //TODO refactor into clear func
    try {
      let response = await apiService.getAllCustomers(page);
      console.log('getAPICustomers response', response);  

      //apiService.getAllCustomers(page).then(res => console.log('log', res))

    } catch (error) {
      console.log('ELSE error: ', error);
      if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
        //TODO хорошо бы указать, что не удалось обновить именно accessToken (из-за ошибки в updateAccessTokenByRefreshToken)
        //TODO ну и проверить, что это именно из-за него ошибка
        console.log('HERE');
        logout(dispatch); // не обязательно, но желательно привести приложение в состояние LogOut
        navigate("/reLoginPage"); //TODO но лучше на страницу с предупреждением (чтобы не было неожиданностью почему так)
      }
    }
  }

  async function getCurrentCustomer() {
    try {
      let response = await apiService.getCurrentCustomer();
      console.log('getAPICustomers response', response);  //TODO: передача данных в state приложения при авторизации пользователя (только необходимое)
    } catch (error) {
      if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
        logout(dispatch);
        navigate("/reLoginPage");
      }
    }
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

      <Button label='getCustomers' action={() => getCustomers()} />
      <Button label='getAPICustomers' action={() => getAPICustomers()} />
      <Button label='setWrongAccessToken' action={() => setWrongAccessToken()} />

      <Button label='getCurrentCustomer' action={() => getCurrentCustomer()} />

      <Button label='testDataFromResourceServer' action={() => testDataFromResourceServer()} />

      <Button label='APIme' action={() => getDataMe()} />
      <TestLoginButtons />
    </div>
  )
}

