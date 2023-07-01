import { useEffect, useState } from 'react';
import { UserDropdown } from './UserDropdown/UserDropdown';
import { Button } from '../../Button/Button';

import './userAccountMenu.scss'
import { useDispatch } from 'react-redux';

//TODO:
/*
1. добавить в состоянии приложения объект с данными user: username, id
2. добавить для UserDropdown возможность использовать children, хотя можети не обязательно
*/

const UserAccountMenu = () => { //TODO SideBar
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const accountMenu = isOpen && <UserDropdown />;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    //dispatch(authenticationAction(true));
  }, [userName])

  return (
    <div className="user-dropdown">
      <Button btnStyle='link' label='?Username?' action={toggleDropdown} />
      {accountMenu}
    </div>
  );
};

export {
  UserAccountMenu,
}

/*
<button className="user-dropdown-btn" onClick={toggleDropdown}>
    <span className="username">Username</span>
    <span className="arrow-icon">&#9662;</span>
</button>
*/