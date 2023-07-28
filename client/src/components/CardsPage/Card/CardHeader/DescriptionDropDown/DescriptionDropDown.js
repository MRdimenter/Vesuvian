import { useEffect, useState } from 'react';
import { DropDown } from '../../../../DropDown/DropDown';
import { ToggleSwitch } from '../../../../ToggleSwitch/ToggleSwitch ';
import { IconButton } from '../../../../Button/Button';

import './descriptionDropDown.scss'

const DescriptionDropDown = ({ onChange }) => {
  const [descriptionToggle, setdescriptionToggle] = useState(true);
  const [checked, setChecked] = useState(false);

  return (
    <div className='description-drop-down-wrapper'>
      <div className="description-toggle">
        <IconButton iconName={'interrogation-mark'} width='30' height='30' onClick={() => {setdescriptionToggle((prev) => !prev)}} />
      </div>
      {
        descriptionToggle ?
        <div className='description-drop-down'>
          <DropDown width={280} padding={15} top={0} paddingTop={40}>
            <p>Первое слово при встречи</p>
          </DropDown>
        </div> : null
      }
    </div>
  )
}

export {
  DescriptionDropDown,
}