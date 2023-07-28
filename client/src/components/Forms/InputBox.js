import validator from 'validator';
import { EyePasswordButton } from './RegistrationForm/EyePasswordButton/EyePasswordButton';
import { useState } from 'react';
import { IconButton } from '../Button/Button';
import { Icon } from '../Icon/Icon';

import './InputBox.scss';

function validateInput(id, value, password) {
  var alphaExp = /^[a-zA-Zа-яА-Я-\s]+$/;
  var usernameExp = /^[a-zA-Zа-яА-Я1-9_]+$/;

  switch (id) {
    case "firstName":
      return (validator.isLength(value, { min: 2, max: 50 }) && value.match(alphaExp));
    case "lastName":
      return (!value || (validator.isLength(value, { min: 2, max: 50 }) && value.match(alphaExp)));
    case "email":
      return (validator.isEmail(value) && value.length <= 254);
    case "username":
      return (validator.isLength(value, { min: 4, max: 20 }) && value.match(usernameExp));
    case "password":
      const strongPasswordOptions = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      }
      return (validator.isStrongPassword(value, strongPasswordOptions) && (value.length <= 128));
    case "confirmPassword":
      return (password === value);
    default:
      break;
  }

  return true;
}

function clearWarn(event) {
  event.target.className = event.target.className.replace(' warn', '');
}

function inputValidation(event, password, onValidationChange) {
  const { id, value } = event.target;
  const isInputValid = validateInput(id, value, password);

  onValidationChange(id, isInputValid);

  if (isInputValid) {
    return;
  } else {
    event.target.className = event.target.className.concat(' warn');
  }
}

const InputBox = ({ type = "text", className, labelContent, necessary, value, onChange, password = '', onValidationChange, hitnText }) => {
  const [showInputHint, setShowInputHint] = useState(false);

  const inputHintToggle = () => {
    setShowInputHint((prev) => !prev);
  }

  const star = <span style={{ color: 'red' }}>*</span>
  return (
    <div className={`inputBox ${className}`}>
      <div className='inputBox-header'>
        <label className="form-label" htmlFor={className}>{labelContent} {necessary && star}</label>
        <IconButton iconName={'interrogation-mark-in-circle'} width='12' height='12' onClick={inputHintToggle}/>
      </div>
      {showInputHint && <pre className='input-hint small-small-text'>{ hitnText }</pre>}
      <input className="form-input"
        id={className}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        onFocus={(e) => clearWarn(e)}
        onBlur={(e) => inputValidation(e, password, onValidationChange)} />
    </div>
  )
}

const PasswordInputBox = ({ className, labelContent, necessary, value, onChange, password = '',onValidationChange, hitnText }) => {
  const [passwordType, setPasswordType] = useState('password');

  const passwordTypeToggle = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return (
    <>
      <EyePasswordButton passwordType={passwordType} onClick={passwordTypeToggle}/>
      <InputBox className={className} type={passwordType} labelContent={labelContent} necessary={necessary} value={value} 
        onChange={(e) => onChange(e.target.value)} password={password} onValidationChange={onValidationChange} hitnText={hitnText} />
    </>   
  )
}

const SearchInput = () => {
  return (
    <div className="search-input">
      <Icon iconName='loupe' width="25" height="25" />
      <input type='text'  className='search-input-field btn-link-font' placeholder='Поиск'></input>
    </div>
  )
}

export {
  InputBox,
  PasswordInputBox,
  SearchInput,
}