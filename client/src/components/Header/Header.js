import { Link } from 'react-router-dom';
import { LoginButtons } from '../LoginButtons/LoginButtons';

import './header.scss';

export const Header = () => {

  return (
    <div className='header'>
      <Link className='Logo' to={'/'}> <h1 className='header-1'>VESUVIAN</h1> </Link>
      <Link className='Logo' to={'/listItem'}>Customers List</Link>
      <LoginButtons />
    </div>
  )
}

