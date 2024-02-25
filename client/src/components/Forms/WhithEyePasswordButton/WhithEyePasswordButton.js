import { EyePasswordButton } from '../RegistrationForm/EyePasswordButton/EyePasswordButton'

import './whithEyePasswordButton.scss'

const WhithEyePasswordButton = ({ children, passwordType, setPasswordType }) => {

  const passwordTypeToggle = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }
  
  return (
    <>
    <div className='whith-eye-password-button'>
      {children}
      <div className='whith-eye-password-button-button'>
        <EyePasswordButton
          passwordType={passwordType}
          onClick={passwordTypeToggle}
        />
      </div>
    </div>
    </>
    
  )
}

export {
  WhithEyePasswordButton,
}