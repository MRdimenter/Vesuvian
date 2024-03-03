import { useSelector } from 'react-redux';
import { useState } from 'react';

import './accountMenu.scss';

const AccountMenu = () => {
  const currentCustomerData = useSelector((state) => state.currentCustomerData);

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const accountMenuStyle = !isOpen ? 'accountMenuOpen' : 'accountMenuClose'

  const toggleOpen = () => {
    console.log('click');
    setIsOpen(!isOpen);
  };
  const zIndex = isOpen ? 'aboveElementsStyle' : '';

  return (
    <div
      className={`container ${isOpen ? 'open' : ''}`}
      onClick={toggleOpen}
    >
      <div className="content">Content</div>
    </div>
  );
}

export {
  AccountMenu,
}