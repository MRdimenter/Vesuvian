import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { UserDropdown } from '../UserAccountMenu/UserDropdown/UserDropdown';

// import './styles.scss'; // Подключаем файл стилей для анимации
import './reactTransitionGroupMenu.scss';

const ReactTransitionGroupMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='dropdown_wrapper-transition'>
      <button className="dropdown-btn-transition" onClick={toggleVisibility}>
        Меню
      </button>
      <CSSTransition
        in={isVisible}
        timeout={100} // Время анимации в миллисекундах
        classNames="alert" // Имя класса для анимации (fade-enter, fade-enter-active, fade-exit, fade-exit-active)
        unmountOnExit // Если true, компонент будет удален из DOM после окончания анимации при скрытии
      >
      <div className={`btn_group-transition ${'name'}`}>
        <div className='reverse-rotation'>
          <UserDropdown />
        </div>
      </div>
      </CSSTransition>
    </div>
  );
};

export {
  ReactTransitionGroupMenu
};