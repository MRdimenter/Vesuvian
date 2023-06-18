import { Button } from "../../Button/Button"

const LoginFooter = () => {
    return (
        <div className='registration-wrapper'>
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