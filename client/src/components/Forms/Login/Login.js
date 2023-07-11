import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './login.scss';

import { authenticationAction, authenticationStateAction } from '../../../store/actions/authenticationActions';
import { OAuth2Service } from '../../../common/utils/OAuth2Service';
import { InputBox } from '../InputBox';
import { WrongCredentialWarning } from './WrongCredentialWarning';
import { LoginFooter } from './LoginFooter';
import { WarningMessage } from './WarningMessage';
import { Button } from '../../Button/Button';
import { appendCurrentCustomerDataAction } from '../../../store/actions/appendCurrentCustomerDataAction';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('user'); // TODO default state 'user' for testing
  const [password, setPassword] = useState('user'); // TODO default state 'user' for testing

  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isInputsValidated, setIsInputsValidated] = useState(false);
  const [validationData, setValidationData] = useState({});


  const handleValidationChange = (inputId, isValid) => {
    setValidationData((prevData) => ({
      ...prevData,
      [inputId]: isValid,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = Object.values(validationData).every((isValid) => isValid);
    const oAuth2Servise = new OAuth2Service();

    setIsInputsValidated(false);
    setIsWrongCredentials(false);

    if (isFormValid) {
      try {
        const response = await oAuth2Servise.OAuth2Login(username, password);
        console.log('response: ', response);
        if (response) {
          console.log('login response ok');
          // Итак: что должна делать функция?
          // сохранять данные пользователя
          // как? 1. Запрос на сервер -> сохранение через dispatch
          /* updateCustomerData(dispatch) {
            const currentCustomerData = getCurrentCustomer(); // а тут наблюдается асинхронная функция, для этого, видимо и нужен thunk
            dispatch(appendCurrentCustomerDataAction(currentCustomerData)); // дык я же могу внутри Action обратиться за данными для Customer (НО зачем?)
          }
          */

          dispatch(appendCurrentCustomerDataAction());
          dispatch(authenticationAction());
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        if (error.message === '401') {
          setIsWrongCredentials(true);
        } else {
          navigate("/errorPage");
        }
      }
    } else {
      setIsInputsValidated(true);
    }
  }

  useEffect(() => {
    dispatch(authenticationStateAction(false));
    // componentWillUnmount
    return () => {
      dispatch(authenticationStateAction(true));
    }
  }, [dispatch]);

  return (
    <div className="login-wrapper">
      <div className='login-form-wrapper'>
        {isWrongCredentials && <WrongCredentialWarning />}
        <h1>Please Log In</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <InputBox className="username" labelContent="Username" value={username} onChange={(e) => setUsername(e.target.value)} onValidationChange={handleValidationChange} />
          <InputBox className="password" type="password" labelContent="Password" value={password} onChange={(e) => setPassword(e.target.value)} onValidationChange={handleValidationChange} />
          <div className='login-button-wrapper'>
            <Button btnStyle='link' label='Вход' action={handleSubmit} />
          </div>
        </form>
        <LoginFooter />
        {isInputsValidated && <WarningMessage />}
      </div>
    </div>
  )
}

export {
  Login,
}