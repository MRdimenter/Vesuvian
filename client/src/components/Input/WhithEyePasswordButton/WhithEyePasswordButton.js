import { EyePasswordButton } from '../../Forms/RegistrationForm/EyePasswordButton/EyePasswordButton';

import './inputWhithEyePasswordButton.scss'

const WhithEyePasswordButton = ({passwordType, setPasswordType, children}) => {

  const passwordTypeToggle = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return (
    <>
      <EyePasswordButton
        passwordType={passwordType}
        onClick={passwordTypeToggle}
      />
      {children}
    </>
  )
}

export {
  WhithEyePasswordButton,
}