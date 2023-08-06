import { useState } from 'react';
import { DropDown } from '../../../../DropDown/DropDown';
import { ToggleSwitch } from '../../../../ToggleSwitch/ToggleSwitch ';
import { IconButton } from '../../../../Button/Button';

import './settingsDropDown.scss'

const SettingsDropDown = () => {
  const [settingsShow, setSettingsShow] = useState(false);
  const [checked, setChecked] = useState(false);
  
  const settingsToggle = (e) => {
    e.stopPropagation();
    setSettingsShow((prev) => !prev);
  };

  return (
    <div className='settings-drop-down-wrapper'>
      <div className="settings-toggle">
        <IconButton iconName={'gear-wheel'} width='30' height='30' onClick={(e) => settingsToggle(e)} />
      </div>
      
      {
        settingsShow ?
        <div className='settings-drop-down'>
          <DropDown width={280} padding={15} top={0} paddingTop={40}>
            <ul className='settings-list'>
              <li className='settings-list-item'>
                Развернуть карточки
                <ToggleSwitch id="daily" small={true} checked={checked} onChange={() => { setChecked((prev) => !prev) }} />
              </li>
              <li className='settings-list-item'>
                Развернуть карточки
                <ToggleSwitch id="daily" small={true} checked={checked} onChange={() => { setChecked((prev) => !prev) }} />
              </li>
            </ul>
          </DropDown>
        </div> : null
      }
    </div>
  )
}

export {
  SettingsDropDown,
}