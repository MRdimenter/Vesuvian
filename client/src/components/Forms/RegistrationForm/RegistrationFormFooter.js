import { Button } from "../../Button/Button"

const RegistrationFormFooter = () => {
  return (
    <div className='registration-wrapper'>
      <p>Если Вы уже зарегистрировались, пожалуйста, авторизуйтесь</p>
      <div className='registration-button-wrapper'>
        <Button
          btnStyle='link'
          fontSize='small'
          label='ВХОД'
          link={'/login'}
        />
      </div>
    </div>
  )
}

export {
  RegistrationFormFooter
}