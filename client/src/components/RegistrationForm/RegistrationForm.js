import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticationStateAction } from '../../store/actions/authenticationActions';
import validator from 'validator';

import './registrationForm.scss'
import { postRegistration } from '../../common/utils/fetchWrapper';
import { REGISTR_URL_PATH } from '../../common/constants/urlConstants';
import { InputBoxConfirmPassword, InputBox } from '../Forms/InputBox';

//TODO возможно стоит добавит проверку не при отправке формы, а при потери фокуса с input (с неболшим замечанием что что-то не так, а не громким "ЧТО-ТО ПОШЛО НЕ ТАК")

const WarningMessageInput = () => {
  return <div className='waning-message'>
    <p>Неверно заполнены поля для регистрации</p>
  </div>
}

const WarningMessageUnoccupiedEmail = () => {
  return <div className='waning-message'>
    <p>Указанный email или Username уже зарегестрированы</p>
  </div>
}

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
  const [isInputsValidated, setIsInputsValidated] = useState(true);

  const [isUnoccupiedEmail, setIsUnoccupiedEmail] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
    if (isInputsValid(e)) {
      console.log('fetch');
    } else {
      console.log('no fetch');
    }
    */

    if (isInputsValid(e)) {
      setIsInputsValidated(true);

      const credentials = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "enabled": true,
        "username": username,
        "password": password
      }

      try {
        const response = await postRegistration(REGISTR_URL_PATH, credentials)
        console.log('response: ', response);
        console.log('response.status: ', response.status);
        if (response.status === 409) {
          setIsUnoccupiedEmail(false);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    } else {
      setIsInputsValidated(false);
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
    <div className="registration-wrapper">
      {isUnoccupiedEmail ? null : <WarningMessageUnoccupiedEmail />}

      

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="firstName">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input className="form-input"
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>
        <div className="lastname">
          <label className="form-label" htmlFor="lastName">Last Name </label>
          <input className="form-input"
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>
        <div className="email">
          <label className="form-label" htmlFor="email">Email </label>
          <input className="form-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>
        <div className="username">
          <label className="form-label" htmlFor="username">Username </label>
          <input className="form-input"
            id="username"
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>
        <div className="password">
          <label className="form-label" htmlFor="password">Password </label>
          <input className="form-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>
        <div className="confirm-password">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password </label>
          <input className="form-input"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e)} />
        </div>

        <InputBoxConfirmPassword
        className="confirmPassword"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => handleInputChange(e)}
        password={password}
        />

        <div className="registration-button-wrapper">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
      {isInputsValidated ? null : <WarningMessageInput />}
    </div>
  )
}

export {
  RegistrationForm,
}