import { Button } from '../../Button/Button';
import { SearchInput } from '../../Forms/InputBox';

import './navPanel.scss';

const NavPanel = () => {
  return (
    <nav className='header-nav'>
      {/* <Link className='Logo customer-list' to={'/listItem'}>Customers List</Link> */}
      {/* <Link className='Logo customer-list' to={'/userSettingsPage'}>userSettingsPage</Link> */}
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
  )
}

export {
  NavPanel,
}