import validator from 'validator';

import './InputBox.scss'

function validateInput(id, value, password) {
  if (validator.isEmpty(value)) {
    return false;
  } else {
    switch (id) {
      case "email":
        return validator.isEmail(value) ? true : false;
      case "confirmPassword":
        return (password === value) ? true : false;
      default:
        break;
    }
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

const InputBox = ({ type = "text", className, labelContent, value, onChange, password='', onValidationChange}) => {
  return (
    <div className={`InputBox ${className}`}>
      <label className="form-label" htmlFor={className}>{labelContent}</label>
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

export {
  InputBox,
}