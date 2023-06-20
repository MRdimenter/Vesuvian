import './wrongCredentialWarning.scss';

const WrongCredentialWarning = () => {
  return (
    <div className="wrong-credential-warn">
        <p>
          Неверный логин или пароль
          (если данные введены верно, пожалуйста, обратитесь 
          к разработчикам ...адрес почты)
        </p>
      </div>
  )
}

export {
    WrongCredentialWarning
}