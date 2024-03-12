import '../../common/styles/text.scss'

import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';

import './button.scss';

/**
* TODO Description
**/

const Button = ({ id, label = 'btn', btnStyle='link', link, action, textColor='white', fontSize='normal', disabled }) => {
  const textColors = {
    white: 'text-color-white',
    black: 'text-color-black',
  }
  const btnLinkFont = {
    normal: 'btn-link-font',
    big: 'btn-link-font-big',
  }

  const setStyle = `${btnLinkFont[fontSize]} ${btnStyle ?? 'btn'} ${textColors[textColor]}`;
  const setThemeDark = '';

  return (
    <Link to={link} className='link-button'>
      <button
        id={id}
        color={'black'}
        type="button"
        disabled={disabled}
        className={`${setStyle} ${setThemeDark}`}
        onClick={action}>
        {label}
      </button>
    </Link>
  )
}

//TODO cursor
const IconButton = ({ iconName, iconFormat, width='20', height='20', onClick, disabled, cursor }) => {
  return (
    <button onClick={onClick} className="icon-button" type="button" disabled={disabled}>
      <Icon iconName={iconName} iconFormat={iconFormat} width={width} height={height} />
    </button>
  )
}

export {
  Button,
  IconButton,
}