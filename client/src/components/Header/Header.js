import './header.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { darkModeAction } from '../../store/actions/darkModeAction';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';


export const Header = () => {

  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(darkModeAction());
  }

  return (
    <div className='header'>
      <Link to={'main'}>Main page</Link>
      <LoginButtons />
      <Button action={onChangeTheme} />
    </div>
  )
}

