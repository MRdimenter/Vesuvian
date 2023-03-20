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

  const runFetch = () => {
    fetch('https://swapi.dev/api/people/1')
      .then((response) => {
        console.log('Got Response', response.status);
        return response.json();
      })
      .then((body) => {
        console.log(body);
      })
  }

  return (
    <div className='header'>
      <Link to={'/'}>Main page</Link>
      <LoginButtons />
      <Button action={onChangeTheme} />
      <Button label='fetch' action={runFetch} />
    </div>
  )
}

