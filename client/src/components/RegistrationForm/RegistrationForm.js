import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticationStateAction } from '../../store/actions/authenticationActions';
import validator from 'validator';

import './registrationForm.scss'
import { post } from '../../common/utils/fetchWrapper';
import { REGISTR_URL_PATH } from '../../common/constants/urlConstants';

//TODO возможно стоит добавит проверку не при отправке формы, а при потери фокуса с input (с неболшим замечанием что что-то не так, а не громким "ЧТО-ТО ПОШЛО НЕ ТАК")

const RegistrationForm = () => {
  const dispatch = useDispatch();

  /*
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  */
  const [firstName, setFirstName] = useState('servertest');
  const [lastName, setLastName] = useState('servertest');
  const [email, setEmail] = useState('servertest@test.com');
  const [username, setUsername] = useState('servertest');
  const [password, setPassword] = useState('servertest');
  const [confirmPassword, setConfirmPassword] = useState('servertest');
  //const [isInputsValidated, setIsInputsValidated] = useState(false);
  //const [isInputsValidated, setIsInputsValidated] = useState(true);
  // TODO перенесение курсора на первый (если не единственный) невалидный input

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }

  function clearWarn(event) {
    event.target.className = event.target.className.replace(' warn', '');
  }

  function isInputValid(id, value) {
    if (validator.isEmpty(value)) {
      return false;
    } else {
      switch (id) {
        case "email":
          return validator.isEmail(value) ? true : false;
        case "confirmPassword":
          return (password === confirmPassword) ? true : false;
        default:
          break;
      }
    }

    return true;
  }

  function inputValidation(event) {
    const { id, value } = event.target;

    if (isInputValid(id, value)) {
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

  const handleSubmit = async (e) => { //TODO заблокировать пока не будут выполнены все проверки (возможно через состояние)
    e.preventDefault();

    /*
    if (isInputsValid(e)) {
      console.log('fetch');
    } else {
      console.log('no fetch');
    }
    */
    
    if (isInputsValid(e)) {
      const credentials = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "enabled": true,
        "username": username,
        "password": password
      }

      try {
        const response = await post(REGISTR_URL_PATH, credentials)
        console.log('response: ', response);
      } catch (error) {
        console.log('error: ', error);
      }
    } else {
      //TODO предупреждение что не все поля заполнены верно
    }

  }

  useEffect(() => {
    dispatch(authenticationStateAction(false));
    // componentWillUnmount
    return () => {
      dispatch(authenticationStateAction(true));
    }
  }, [dispatch]);

  return (  // TODO copypast (static html)
    <div className="registration-wrapper">
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="username">
          <label className="form__label" htmlFor="firstName">First Name </label>
          <input className="form__input"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            onFocus={e => clearWarn(e)}
            onBlur={e => inputValidation(e)} />
        </div>
        <div className="lastname">
          <label className="form__label" htmlFor="lastName">Last Name </label>
          <input className="form__input"
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => handleInputChange(e)}
            onFocus={e => clearWarn(e)}
            onBlur={e => inputValidation(e)} />
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">Email </label>
          <input className="form__input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            onFocus={e => clearWarn(e)}
            onBlur={e => inputValidation(e)} />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="username">Username </label>
          <input className="form__input"
            id="username"
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e)}
            onFocus={e => clearWarn(e)}
            onBlur={e => inputValidation(e)} />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">Password </label>
          <input className="form__input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            onFocus={e => clearWarn(e)}
            onBlur={e => inputValidation(e)} />
        </div>
        <div className="confirm-password">
          <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
          <input className="form__input"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            onFocus={e => clearWarn(e)}
            onBlur={e => inputValidation(e)} />
        </div>
        <div className="registration-button-wrapper">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>

    </div>
  )
}

export {
  RegistrationForm,
}