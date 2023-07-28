import { useState } from 'react';
import { IconButton } from '../../../Button/Button';
import { SettingsDropDown } from './SettingsDropDown/SettingsDropDown';

import './cardHeader.scss';

const CardHeader = () => {
  const [checked, setChecked] = useState(false);

  const settingsToggle = () => {
    console.log('click on settingsToggle');
  }

  const inputHintToggle = () => {
    console.log('click on inputHintToggle');
  }

  return (
    <div className="card-header">
      <SettingsDropDown />
      <IconButton iconName={'interrogation-mark'} width='30' height='30' onClick={inputHintToggle} />
    </div>
  )
}

export {
  CardHeader,
}