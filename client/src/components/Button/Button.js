import React from 'react';
import { Link } from 'react-router-dom';

import './button.scss';
import { useSelector } from 'react-redux';

export const Button = ({ label = 'button', link, action }) => {
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);

  //const setThemeDark = !isDarkModeEnabled ? '' : 'theme-dark';
  const setThemeDark = '';

  return (
    <Link to={link}>
      <button
        type="button"
        className={`btn ${setThemeDark}`}
        onClick={action}>
        {label}
      </button>
    </Link>
  )
}

