import '../../common/styles/text.scss'

import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

import './button.scss';

/**
* TODO Description
**/

const Button = ({ label = 'btn', btnStyle='link', link, action }) => {
  const setStyle = `btn-link-font btn-link-font ${btnStyle ?? 'btn'}`;
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

const IconButton = ({ iconName, width='20', height='20', onClick, disabled }) => {
  return (
    <button onClick={onClick} className="icon-button" type="button" disabled={disabled}>
      <Icon iconName={iconName} width={width} height={height} />
    </button>
  )
}

export {
  Button,
  IconButton,
}