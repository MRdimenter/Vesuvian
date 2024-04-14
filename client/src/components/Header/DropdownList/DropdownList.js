import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './dropdownList.scss'

const DropdownList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleList}>Открыть список</button>
      <CSSTransition in={isOpen} timeout={300} classNames="list">
        <ul className="list">
          <li>Пункт 1</li>
          <li>Пункт 2</li>
          <li>Пункт 3</li>
        </ul>
      </CSSTransition>
    </div>
  );
};

export {
  DropdownList
}