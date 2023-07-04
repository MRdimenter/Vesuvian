import { useDispatch, useSelector } from 'react-redux';

import './loginButtons.scss';

import { authenticationAction } from '../../store/actions/authenticationActions';
import { Button } from '../Button/Button';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { useEffect } from 'react';
import { UserAccountMenu } from '../Header/UserAccountMenu/UserAccountMenu';

/*
Компонент отображает кнопки для авторизации и регистрации в пользовательском интерфейсе. 
Компонент проверяет статус аутентификации пользователя и отображает соответствующие кнопки в зависимости от этого статуса.
Если пользователь аутентифицирован, отображается кнопка для выхода из системы (LogOutButton),
иначе отображаются кнопки для регистрации (RegistrationButtons).

LogOutButton выполняет выход пользователя и очищает локальное хранилище при нажатии на кнопку выхода
RegistrationButtons содержит кнопки для перехода к форме Регистриции или Аутентификации пользователя
*/

//TODO вынести функцию (т.к. может использоваться при неудачных запросах и запросе последующей авторизации)
async function logout(dispatch) {
  const oAuth2Servise = new OAuth2Service();

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
    //<Button btnStyle='link' label='LogOut' link={'/'} action={() => logout(dispatch)} />
    //<UserAccountMenu userName={userName}/>
    <UserAccountMenu />
  )
}

export const LoginButtons = () => {
  const dispatch = useDispatch();

  const {authStatus: isAuthenticated, authState: isAuthenticationVerified} = useSelector((state) => state.isAuth);
  //const { username: userName } = useSelector((state) => state.currentCustomerData);
  
  const content = isAuthenticationVerified && (isAuthenticated ? <LogOutButton dispatch={dispatch}/> : <RegistrationButtons dispatch={dispatch}/>);

  useEffect(() => {
  }, [isAuthenticated])

  /*
  useEffect(() => {
    console.log(currentCustomerData);
  }, [currentCustomerData])
*/
  return (
    <div className='loginButtons'>
      {content}
    </div>
  )
}

