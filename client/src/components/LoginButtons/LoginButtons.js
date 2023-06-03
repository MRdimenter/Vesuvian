import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import './loginButtons.scss';

import { authenticationAction } from '../../store/actions/authenticationActions'; // изменить на абсолютные пути @...
import { postOAuth2Logout } from '../../common/utils/fetchWrapper';
import { REFRESH_TOKEN } from '../../common/constants/OAuth2Constants';

import { Button } from '../Button/Button';

const RegistrationButtons = () => {
  return (
    <>
      <Button btnStyle='link' label='Регистрироваться' link={'/dashboard'} />
      <Button btnStyle='link' label='Вход' link={'/login'} />
    </>
  )
}

const LogOutButton = () => {
  const dispatch = useDispatch();

  return (
    <Button btnStyle='link' label='LogOut' link={'/'} action={() => logout(dispatch)} />
  )
}

async function logout(dispatch) {
  const refresh_token = Cookies.get(REFRESH_TOKEN) || null;

  const response = await postOAuth2Logout(refresh_token); // нормальный ответ 204
  if (response.status === 204) {
    console.log('response from postOAuth2Logout is ok'); // TODO решил пока что оставить, пока не решу как обрабатывать ошибки
  }

  Cookies.remove(REFRESH_TOKEN);
  localStorage.clear();
  dispatch(authenticationAction(false));
}

export const LoginButtons = () => {
  const isAuthenticated = useSelector((state) => state.isAuth);

  return (
    <div className='loginButtons'>
      {!isAuthenticated ? <RegistrationButtons /> : <LogOutButton />}
    </div>
  )
}

