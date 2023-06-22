import { useDispatch, useSelector } from 'react-redux';

import './loginButtons.scss';

import { authenticationAction } from '../../store/actions/authenticationActions';
import { Button } from '../Button/Button';
import { OAuth2Servise } from '../../common/utils/OAuth2Servise';
import { useEffect } from 'react';

/*
Компонент отображает кнопки для авторизации и регистрации в пользовательском интерфейсе. 
Компонент проверяет статус аутентификации пользователя и отображает соответствующие кнопки в зависимости от этого статуса.
Если пользователь аутентифицирован, отображается кнопка для выхода из системы (LogOutButton),
иначе отображаются кнопки для регистрации (RegistrationButtons).

LogOutButton выполняет выход пользователя и очищает локальное хранилище при нажатии на кнопку выхода
RegistrationButtons содержит кнопки для перехода к форме Регистриции или Аутентификации пользователя
*/

async function logout(dispatch) {
  const oAuth2Servise = new OAuth2Servise();

  oAuth2Servise.OAuth2LogOut();
  localStorage.clear();
  dispatch(authenticationAction(false));
}

const RegistrationButtons = ({}) => {
  return (
    <>
      <Button btnStyle='link' label='Регистрироваться' link={'/registrationForm'} />
      <Button btnStyle='link' label='Вход' link={'/login'} />
    </>
  )
}

const LogOutButton = ({dispatch}) => {
  return (
    <Button btnStyle='link' label='LogOut' link={'/'} action={() => logout(dispatch)} />
  )
}

export const LoginButtons = () => {
  const dispatch = useDispatch();
  
  let content;
  const {authStatus: isAuthenticated, authState: isAuthenticationVerified} = useSelector((state) => {
    return state.isAuth
  });

  if (isAuthenticationVerified) {
    content = isAuthenticated ? <LogOutButton dispatch={dispatch}/> : <RegistrationButtons dispatch={dispatch}/>;
  } else {
    content = null;
  }

  useEffect(() => {
  }, [isAuthenticated])

  return (
    <div className='loginButtons'>
      {content}
    </div>
  )
}

