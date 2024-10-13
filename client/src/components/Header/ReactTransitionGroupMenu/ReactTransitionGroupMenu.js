import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { UserDropdown } from '../UserAccountMenu/UserDropdown/UserDropdown';

import './reactTransitionGroupMenu.scss';
import { Icon } from '../../Icon/Icon';
import { UserName } from './UserName/UserName';

const ReactTransitionGroupMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible((prevVisible) => !prevVisible);
  };

  const handleClickOutside = (event) => {
    // Проверяем, был ли клик вне меню и кнопки
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsVisible(false); // Закрываем меню, если клик вне меню и кнопки
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Очистка при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className='dropdown_wrapper-transition'>
      <button
        ref={buttonRef}
        className="dropdown-btn-transition"
        onClick={toggleVisibility}
      >
        <Icon iconName='user_avatar_temp' iconFormat='png' width="50" height="50" />
      </button>
      <CSSTransition
        in={isVisible}
        timeout={100}
        classNames="alert"
        unmountOnExit
      >
        <div ref={dropdownRef} className={`btn_group-transition ${'name'}`}>
          <div style={{ width: '100%', height: '100%' }}>
            <div className='reverse-rotation'>
              {/* _______________________ */}
              <div className='username'>
                <UserName />
              </div>
                
              <hr />
              <UserDropdown />
              {/* <div>asdasd</div> */}
              {/* asdasdasdasdasdasd */}
            </div>
          </div>
        </div>

      </CSSTransition>
    </div>
  );
};

export {
  ReactTransitionGroupMenu
};