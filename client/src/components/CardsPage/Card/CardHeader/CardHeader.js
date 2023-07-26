import { IconButton } from '../../../Button/Button';

import './cardHeader.scss';

const CardHeader = () => {

  const settingsToggle = () => {
    console.log('click on settingsToggle');
  }

  const inputHintToggle = () => {
    console.log('click on inputHintToggle');
  }

  
  return (
    <div className="card-header">
      <IconButton iconName={'gear-wheel'} width='30' height='30' onClick={settingsToggle} />
      <IconButton iconName={'interrogation-mark'} width='30' height='30' onClick={inputHintToggle} />
    </div>
  )
}

export {
  CardHeader,
}