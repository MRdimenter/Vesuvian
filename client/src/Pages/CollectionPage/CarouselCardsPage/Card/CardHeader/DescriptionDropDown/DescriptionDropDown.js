import { useState } from 'react';
import { DropDown } from '../../../../../../components/DropDown/DropDown';
import { IconButton } from '../../../../../../components/Button/Button';

import './descriptionDropDown.scss'

const DescriptionDropDown = ({hint}) => {
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
            <p>{hint}</p>
          </DropDown>
        </div> : null
      }
    </div>
  )
}

export {
  DescriptionDropDown,
}