import './header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { LoginButtons } from '../LoginButtons/LoginButtons';

export const Header = () => {

  return (
    <div className='header'>
      <Link to={'main'}>Main page</Link>
      <LoginButtons />
    </div>
  )
}

