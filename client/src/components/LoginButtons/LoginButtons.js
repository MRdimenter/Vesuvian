import React, { useState } from 'react';
import { Button } from '../Button/Button';

import './loginButtons.css';

export const LoginButtons = () => {

  const [token, setToken] = useState();

  const action = () => {
    console.log('action onClick');
    setToken((state) => !state)
  }

  if (!token) return (
    <div className='loginButtons'>
      <Button label='Регистрация' link={'/dashboard'} />
      <Button label='Вход' link={'/login'} action={action} />
    </div>
  )

  return <h3>Приветствую пользователь</h3>
}

