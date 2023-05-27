import { Link } from 'react-router-dom';

import './button.scss';

/**
* TODO Description
**/

export const Button = ({ label = 'btn', btnStyle='link', link, action }) => {
  const setStyle = btnStyle ?? 'btn';
  const setThemeDark = '';

  return (
    <Link to={link}>
      <button
        type="button"
        className={`${setStyle} ${setThemeDark}`}
        onClick={action}>
        {label}
      </button>
    </Link>
  )
}

