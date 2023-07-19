import { Link } from 'react-router-dom';

import '../../common/styles/text.scss'
import './button.scss';

/**
* TODO Description
**/

export const Button = ({ label = 'btn', btnStyle='link', link, action }) => {
  const setStyle = `btn-link-font ${btnStyle ?? 'btn'}`;
  const setThemeDark = '';

  return (
    <Link to={link} className='link-button'>
      <button
        type="button"
        className={`${setStyle} ${setThemeDark}`}
        onClick={action}>
        {label}
      </button>
    </Link>
  )
}

