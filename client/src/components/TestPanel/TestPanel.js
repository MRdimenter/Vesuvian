import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { darkModeAction } from '../../store/actions/darkModeAction';
import { getAccessToken, setWrongAccessToken } from '../../common/utils/useOAuth2';

import './testPanel.scss';

import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';
import { TestLoginButtons } from './TestLoginButtons/TestLoginButtons';
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

  function readCookies() {
    console.log('Cookies: ', document.cookie);
  }

  function clearCookies() {
    Cookies.remove('refreshToken');
  }

  function getAccessTokenFromLocalStorage() {
    const accessToken = getAccessToken()
    console.log('accessToken: ', accessToken);
  }

  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();

    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  async function getAPICustomers(page) {
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
      <Button label='read Cookies' action={() => readCookies()} />
      <Button label='Clear Cookies' action={() => clearCookies()} />
      <Button label='getAccessTokenFromLocalStorage' action={() => getAccessTokenFromLocalStorage()} />
      <Button label='getAPICustomers' action={() => getAPICustomers()} />
      <Button label='setWrongAccessToken' action={() => setWrongAccessToken()} />
      <Button label='getCurrentCustomer' action={() => getCurrentCustomer()} />
      <TestLoginButtons />
    </div>
  )
}

