import { Button } from "../../Button/Button"

import './loginFooter.scss';

const LoginFooter = () => {
    return (
        <div className='login-footer'>
            <p>Если Вы еще не зарегистрировались, пожалуйста, зарегистрируйтесь. мы всегда рады новым пользователям!</p>
            <div className='registration-button-wrapper'>
                <Button btnStyle='link' label='Регистрироваться' link={'/registrationForm'} />
            </div>
        </div>
    )
}

export {
    LoginFooter
}