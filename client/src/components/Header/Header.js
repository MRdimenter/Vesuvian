import { Link } from 'react-router-dom';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';

import './header.scss';
import { SearchInput } from '../Forms/InputBox';

export const Header = () => {
  return (
    <div className='header'>
      <Link className='Logo' to={'/'}> <h1 className='header-1'>VESUVIAN</h1> </Link>
      <nav className='header-nav'>
        <Link className='Logo customer-list' to={'/listItem'}>Customers List</Link>
        <Button btnStyle='btn' label='Коллекции' link={'/cards'} />
        <SearchInput />
      </nav>
      <LoginButtons />
    </div>
  )
}

