import { useDispatch, useSelector } from 'react-redux';

import './loginButtons.scss';

import { authenticationAction } from '../../store/actions/authenticationActions';
import { Button } from '../Button/Button';
import { OAuth2Servise } from '../../common/utils/OAuth2Servise';

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
  const oAuth2Servise = new OAuth2Servise();

  oAuth2Servise.OAuth2LogOut();
  localStorage.clear();
  dispatch(authenticationAction(false));
}

export const LoginButtons = () => {
  let content;
  const {AUTH_STATUS: isAuthenticated, AUTH_REQUEST_STATUS: isAuthenticationVerified} = useSelector((state) => state.isAuth);

  if (isAuthenticationVerified) {
    content = isAuthenticated ? <LogOutButton /> : <RegistrationButtons />;
  } else {
    content = null;
  }

  return (
    <div className='loginButtons'>
      {content}
    </div>
  )
}

