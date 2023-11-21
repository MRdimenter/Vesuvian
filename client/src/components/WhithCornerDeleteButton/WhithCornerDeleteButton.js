import { IconButton } from '../Button/Button';
import './whithCornerDeleteButton.scss';

const WhithCornerDeleteButton = ({children}) => {

  const settingsToggle = () => {
    console.log('settingsToggle');
  }

  return (
    <div className="whith-corner-delete-button">
      <div className="corner-delete-button">
        <IconButton iconName={'corner-delete-button'} iconFormat='svg' width='13' height='13' onClick={(e) => settingsToggle(e)} />
      </div>
      {children}
    </div>
  )
}

export {
  WhithCornerDeleteButton
}