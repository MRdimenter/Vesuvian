import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import './login.scss';

import { authenticationAction, authenticationStateAction } from '../../store/actions/authenticationActions';
import { OAuth2Servise } from '../../common/utils/OAuth2Servise';
import { Button } from '../Button/Button';

//console.log('login: ', window.location, '!');
// TODO refactor like registration form

const WarningMessage = () => {
  return <div className='waning-message'>
      <p>Неверно заполнены поля для авторизации</p>
    </div>
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState('user');
  const [password, setPassword] = useState('user');
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isInputsValidated, setIsInputsValidated] = useState(false);

  function clearWarn(event) {
    event.target.className = event.target.className.replace(' warn', '');
  }

  function isInputValid(value) {
    return validator.isEmpty(value) ? false : true;
  }
  
  function inputValidation(event) {
    const { value } = event.target;
  
    if (isInputValid(value)) {
      return;
    } else {
      event.target.className = event.target.className.concat(' warn');
    }
  }
  
  function isInputsValid(e) {
    for (const element of e.target.elements) {
      if (element.className.includes('warn')) {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const oAuth2Servise = new OAuth2Servise();

    if (isInputsValid(event)) {
      console.log('fetch');
    } else {
      console.log('no fetch');
    }

    if (isInputsValid(event)) {
      setIsInputsValidated(true);
      
      try {
        const response = await oAuth2Servise.OAuth2Login(username, password);
        if (response) {
          dispatch(authenticationAction(true));
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
      setIsInputsValidated(false);
    }

    }
    

  useEffect(() => {
  }, [isWrongCredentials]);

  
  useEffect(() => {
    dispatch(authenticationStateAction(false));
    // componentWillUnmount
    return () => {
      dispatch(authenticationStateAction(true));
    }
  }, [dispatch]);
  
  return (
    <div className="login-wrapper">
      <div className={`login-pass-warning ${isWrongCredentials ? 'block' : 'none'}`}>
        <p>
          Неверный логин или пароль
          (если данные введены верно, пожалуйста, обратитесь 
          к разработчикам ...адрес почты)
        </p>
      </div>
      <h1>Please Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>

      <div className="username">
          <label className="form-label" htmlFor="username">Username </label>
          <input className="form-input"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>

        <div className="password">
          <label className="form-label" htmlFor="password">Password </label>
          <input className="form-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>

        <div className='login-button-wrapper'>
          <button type="submit">Submit</button>
        </div>        
      </form>
      <div className='registration-wrapper'>
          <p>
            Если вы еще не зарегистрировались, пожалуйста, зарегистрируйтесь. мы всегда рады новым пользователям!
          </p>
          <div className='registration-button-wrapper'>
          <Button btnStyle='link' label='Регистрироваться' link={'/registrationForm'} />
          </div>
        </div>
        {isInputsValidated ? null : <WarningMessage />}
    </div>
  )
}

export {
  Login,
}