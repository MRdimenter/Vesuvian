import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { UserDropdown } from '../UserAccountMenu/UserDropdown/UserDropdown';

import './reactTransitionGroupMenu.scss';

function ReactTransitionGroupMenu() {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const toggleMenu = () => {
    setShowMessage(!showMessage);
  };


  return (
    <div style={{ paddingTop: '2rem' }} className='dropdown_wrapper-transition'>
      <button className="dropdown-btn-transition" onClick={() => toggleMenu()}>
        Меню
      </button>
      <CSSTransition
        in={showMessage}
        timeout={500}
        classNames="alert"
        // unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
      <div className={`btn_group-transition ${'name'}`}>
        <div className='reverse-rotation'>
          <UserDropdown />
        </div>
      
        {/* <ul className={`list ${listStyle}`}>
          <li>1!!!!!!!!</li>
          <li>1</li>
          <li>1</li>
        </ul> */}
      </div>
        
      </CSSTransition>
    </div>
  );
}

export {
  ReactTransitionGroupMenu
}