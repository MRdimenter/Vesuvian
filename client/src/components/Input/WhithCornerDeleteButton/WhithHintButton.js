import { useState } from 'react';
import { WhithCornerDeleteButton } from '../../WhithCornerDeleteButton/WhithCornerDeleteButton';

import './whithHintButton.scss';

const WhithHintButton = ({ hitnText, children }) => {
  const [showInputHint, setShowInputHint] = useState(false);

  const inputHintToggle = () => {
    setShowInputHint((prev) => !prev);
  }

  if (hitnText) {
    return (
      <>
        <WhithCornerDeleteButton
          deleteTag={inputHintToggle}
          icon='interrogation-mark-in-circle'
          iconFormat='png'
        >
          {children}
        </WhithCornerDeleteButton>
        {showInputHint && <pre className='input-hint small-small-text'>{hitnText}</pre>}
      </>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}

export {
  WhithHintButton,
}