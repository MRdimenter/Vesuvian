import './header.scss';

import { Link } from 'react-router-dom';
import { LoginButtons } from '../LoginButtons/LoginButtons';

export const Header = () => {

  return (
    <div className='header'>
      <Link className='Logo' to={'/'}>Vesuvian :)</Link>
      <LoginButtons />
    </div>
  )
}

