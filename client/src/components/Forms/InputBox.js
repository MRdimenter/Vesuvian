import validator from 'validator';


function isInputValid(id, value, password) {
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

  function inputValidation(event) {
    const { id, value } = event.target;

    if (isInputValid(id, value)) {
      return;
    } else {
      event.target.className = event.target.className.concat(' warn');
    }
  }

const InputBox = ({ type, className, labelContent, value, onChange }) => {
    

  return (
      <div className={className}>
        <label className="form-label" htmlFor={className}>{labelContent}</label>
        <input className="form-input"
          id={className}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={(e) => clearWarn(e)}
          onBlur={(e) => inputValidation(e)} />
      </div>
    )
  }

  const InputBoxConfirmPassword = ({ type, className, labelContent, value, onChange, password }) => {


/*
    //return (password === value) ? true : false;
    if (password === value) {
      return;
    } else {
      console.log('pass:', password, ' value: ', value);
      className = className.concat(' warn');
    }
*/

function isInputValid(id, value) {
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

function inputValidation(event) {
  const { id, value } = event.target;

  if (isInputValid(id, value)) {
    return;
  } else {
    event.target.className = event.target.className.concat(' warn');
  }
}
    return <InputBox type={type} className={className} labelContent={labelContent} value={value} onChange={onChange} onBlur={(e) => inputValidation(e)} />
  }

  export {
    InputBox,
    InputBoxConfirmPassword,
  }