import React from 'react';
import { Link } from 'react-router-dom';

import './button.css';

export const Button = ({ label = 'button', link, action }) => {
  return (
    <Link to={link}>
      <button
        type="button"
        className="button"
        onClick={action}>
        {label}
      </button>
    </Link>
  )
}

