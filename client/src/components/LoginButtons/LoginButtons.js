import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import { Button } from '../Button/Button';

import { authenticationAction } from '../../store/actions/authenticationAction';
import { postOAuth2Logout } from '../../common/utils/fetchWrapper';
import { REFRESH_TOKEN } from '../../common/constants/OAuth2Constants';

import './loginButtons.scss';

export const LoginButtons = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuth);
  

  function getRefreshTokenFromCookie() {
    return Cookies.get(REFRESH_TOKEN) || null;
  }

  async function logout() {
    const refresh_token = getRefreshTokenFromCookie();
    
    const response = await postOAuth2Logout(refresh_token); // нормальный ответ 204
    if (response.status === 204) {
      console.log('response from postOAuth2Logout is ok'); // TODO решил пока что оставить, пока не решу как обрабатывать ошибки
    }
    
    Cookies.remove(REFRESH_TOKEN);
    localStorage.clear();
    dispatch(authenticationAction(false));
}

  return (
    <div className='loginButtons'>
      <div className= {isAuthenticated ? 'none' : 'auth'} >
        <Button btnStyle='link' label='Регистрироваться' link={'/dashboard'} />
        <Button btnStyle='link' label='Вход' link={'/login'} />
      </div>
      <div className= {isAuthenticated ? 'auth' : 'none'}>
        <Button btnStyle='link' label='LogOut' link={'/'} action={() => logout() } />
      </div>
    </div>
  )
}

