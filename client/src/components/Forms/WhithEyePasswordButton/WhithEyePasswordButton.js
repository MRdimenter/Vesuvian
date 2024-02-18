import { EyePasswordButton } from '../RegistrationForm/EyePasswordButton/EyePasswordButton'

import './whithEyePasswordButton.scss'

const WhithEyePasswordButton = ({ children, passwordType, passwordTypeToggle }) => {
  return (
    <div className='whith-eye-password-button'>
      {children}
      <div className='whith-eye-password-button-button'>
        <EyePasswordButton
          passwordType={passwordType}
          onClick={passwordTypeToggle}
        />
      </div>
    </div>
  )
}

export {
  WhithEyePasswordButton,
}