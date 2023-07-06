import { useEffect, useState } from 'react';
import { UserDropdown } from './UserDropdown/UserDropdown';
import { Button } from '../../Button/Button';

import './userAccountMenu.scss'
import { useSelector } from 'react-redux';

//TODO:
/*
1. добавить в состоянии приложения объект с данными user: username, id
2. добавить для UserDropdown возможность использовать children, хотя можети не обязательно
*/

const UserAccountMenu = () => { //TODO SideBar
  const currentCustomerData = useSelector((state) => state.currentCustomerData);

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setUserName(currentCustomerData?.username)  
  }, [currentCustomerData])

  const accountMenu = isOpen && <UserDropdown />;

  return (
    <div className="user-dropdown">
      <Button btnStyle='link' label={userName || 'Меню'} action={toggleDropdown} />
      {accountMenu}
    </div>
  );
};

export {
  UserAccountMenu,
}