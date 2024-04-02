import { Icon } from "../../../Icon/Icon"

import './eyePasswordButton.scss'

const EyePasswordButton = ({ passwordType, onClick }) => {
  const iconName = (passwordType === 'password') ? 'hide' : 'view';
  
  return (
    <button onClick={onClick} className="button-eye" type="button">
      <div className="button-eye-container">
        <Icon iconName={iconName} width="20" height="20" />
      </div>
    </button>
  )
}

export {
  EyePasswordButton
}