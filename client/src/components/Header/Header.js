import { Link } from 'react-router-dom';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';
import { SearchInput } from '../Forms/InputBox';

import './header.scss';

export const Header = () => {
  return (
    <div className='header'>
      <Link className='Logo' to={'/'}> <h1 className='header-1'>VESUVIAN</h1> </Link>
      <nav className='header-nav'>
        <Link className='Logo customer-list' to={'/listItem'}>Customers List</Link>
        <div className='header-nav-button'>
          <Button btnStyle='btn' label='Коллекция' link={'/collectionPage'} />
        </div>
        <div className='header-nav-button'>
          <Button btnStyle='btn' label='Коллекции' link={'/collectionsPage'} />
        </div>
        <div className="header-nav-button">
          <Button btnStyle='btn' label='+' link={'/cardCreatingPage'} />
        </div>
        <SearchInput />
      </nav>
      <LoginButtons />
    </div>
  )
}

