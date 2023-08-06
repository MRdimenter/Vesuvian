import { useState } from 'react';
import { DropDown } from '../../../../DropDown/DropDown';
import { IconButton } from '../../../../Button/Button';

import './descriptionDropDown.scss'

const DescriptionDropDown = () => {
  const [descriptionShow, setDescriptionShow] = useState(false);
  
  const descriptionToggle = (e) => {
    e.stopPropagation();
    setDescriptionShow((prev) => !prev);
  };

  return (
    <div className='description-drop-down-wrapper'>
      <div className="description-toggle">
        <IconButton iconName={'interrogation-mark'} width='30' height='30' onClick={(e) => descriptionToggle(e)} />
      </div>
      {
        descriptionShow ?
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