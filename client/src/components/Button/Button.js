import { Link } from 'react-router-dom';

import './button.scss';

/**
* TODO Description
**/

export const Button = ({ label = 'btn', btnStyle='link', link, action }) => {
  //const isDarkModeEnabled = useSelector((state) => state.DarkMode);
  const setStyle = btnStyle ?? 'btn';

  //const setThemeDark = !isDarkModeEnabled ? '' : 'theme-dark';
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

