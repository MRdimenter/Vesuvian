import validator from 'validator';
import { EyePasswordButton } from './RegistrationForm/EyePasswordButton/EyePasswordButton';
import { useState } from 'react';
import { Icon } from '../Icon/Icon';

import './InputBox.scss';
import { WhithHintButton } from '../Input/WhithCornerDeleteButton/WhithHintButton';
import { WhithLabel } from '../Input/WhithLabel/WhithLabel';
import { WhithEyePasswordButton } from './WhithEyePasswordButton/WhithEyePasswordButton';

function validateInput(id, value, password) {
  const alphaExp = /^[a-zA-Zа-яА-Я-\s]+$/;
  const usernameExp = /^[a-zA-Z1-9_]+$/;

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

const InputBox = ({
  type = "text",
  className,
  labelContent,
  inputBoxLabelWidth = 'auto',
  necessary,
  value,
  onChange,
  password = '',
  onValidationChange,
  hitnText,
  disabled,
  direction = 'columnInputBox'
}) => {
  
  const disabledStyle = disabled ? 'disabled' : '';
  return (
    <div className={`inputBox ${className} ${direction}`}>
      <WhithLabel
        labelContent={labelContent}
        necessary={necessary}
        classNameFor={className}
        inputBoxLabelWidth={inputBoxLabelWidth}
      >
        <WhithHintButton hitnText={hitnText}>
          <input 
            className={`form-input ${disabledStyle}`}
            id={className}
            type={type}
            value={value}
            onChange={(e) => onChange(e)}
            onFocus={(e) => clearWarn(e)}
            onBlur={(e) => inputValidation(e, password, onValidationChange)}
            disabled={disabled}
          />
        </WhithHintButton>
      </WhithLabel>
    </div>
    
  )
}

const PasswordInputBox = ({
  className,
  labelContent,
  necessary,
  value,
  onChange,
  password = '',
  onValidationChange,
  hitnText,
  inputBoxLabelWidth,
  disabled,
  direction = 'columnInputBox'
}) => {
  const [passwordType, setPasswordType] = useState('password');

  const disabledStyle = disabled ? 'disabled' : '';
  
  return (
    <div className={`inputBox ${className} ${direction}`}>
      <WhithLabel
        labelContent={labelContent}
        necessary={necessary}
        classNameFor={className}
        inputBoxLabelWidth={inputBoxLabelWidth}
      >
        <WhithHintButton hitnText={hitnText}>
          <WhithEyePasswordButton
            passwordType={passwordType}
            setPasswordType={setPasswordType}
          >
            <input 
              className={`form-input ${disabledStyle}`}
              id={className}
              type={passwordType}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={(e) => clearWarn(e)}
              onBlur={(e) => inputValidation(e, password, onValidationChange)}
              disabled={disabled}
            />
          </WhithEyePasswordButton>
        </WhithHintButton>
      </WhithLabel>
    </div>
  )
}

const PasswordInputBox_old = ({ className, labelContent, necessary, value, onChange, password = '', onValidationChange, hitnText, direction, inputBoxLabelWidth, disabled }) => {
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
      <EyePasswordButton
        passwordType={passwordType}
        onClick={passwordTypeToggle}
      />
      <InputBox
        className={className}
        type={passwordType}
        labelContent={labelContent}
        inputBoxLabelWidth={inputBoxLabelWidth}
        necessary={necessary}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        password={password}
        onValidationChange={onValidationChange}
        hitnText={hitnText}
        direction={direction}
        disabled={disabled}
      />
    </>
  )
}

const SearchInput = () => {
  return (
    <div className="search-input">
      <Icon iconName='loupe' width="25" height="25" />
      <input type='text' className='search-input-field btn-link-font' placeholder='Поиск'></input>
    </div>
  )
}

export {
  InputBox,
  PasswordInputBox,
  SearchInput,
}