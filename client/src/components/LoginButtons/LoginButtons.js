import { useDispatch } from 'react-redux';

import { Button } from '../Button/Button';
import { UserAccountMenu } from '../Header/UserAccountMenu/UserAccountMenu';

import './loginButtons.scss';

/*
Компонент отображает кнопки для авторизации и регистрации в пользовательском интерфейсе. 
Компонент проверяет статус аутентификации пользователя и отображает соответствующие кнопки в зависимости от этого статуса.
Если пользователь аутентифицирован, отображается кнопка для выхода из системы (LogOutButton),
иначе отображаются кнопки для регистрации (RegistrationButtons).

LogOutButton выполняет выход пользователя и очищает локальное хранилище при нажатии на кнопку выхода
RegistrationButtons содержит кнопки для перехода к форме Регистриции или Аутентификации пользователя
*/

const RegistrationButtons = () => {
  return (
    <>
      <Button
        btnStyle='link'
        fontSize='small'
        label='ВХОД'
        link={'/login'}
      />
      <Button
        btnStyle='btn'
        fontSize='small'
        label='РЕГИСТРАЦИЯ'
        link={'/registrationForm'}
      />
    </>
  )
}

export const LoginButtons = ({ isAuth }) => {
  const dispatch = useDispatch();
  const content = isAuth ? <UserAccountMenu /> : <RegistrationButtons dispatch={dispatch}/>;

  return (
    <div className='login-buttons'>
      {content}
    </div>
  )
}

