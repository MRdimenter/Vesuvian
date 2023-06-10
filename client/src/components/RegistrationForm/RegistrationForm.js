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
  const [isInputsValidated, setIsInputsValidated] = useState(true);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (id === "username")
      setUsername(value);
  }

  const inputValidation = (event) => {
    console.log('noBlur');
    const { id, value } = event.target;
    if (id === "firstName") {
      if (validator.isEmpty(firstName)) {
        event.target.className = event.target.className.concat(' warn')  
      }
    }
  }


  const handleSubmit = async () => { //TODO заблокировать пока не будут выполнены все проверки (возможно через состояние)

    //e.preventDefault();
    //getTestDataFromResourceServer(access_token);
    // TODO вынести всё в функцию валидации формы
    if (!validator.isEmail(email)) {
      console.log("You did not enter email") //todo состояние для неверно введенного мейла
    }
    if (password !== confirmPassword) {
      console.log("Repeated password incorrectly") //todo состояние для неверно введенного подтвержденного пароля (можно предупреждение через switch обернуть)
    }

    const credentials = {
      "firstName": firstName,
      "lastName": lastName, 
      "email": email, 
      "enabled": true, 
      "username": username, 
      "password": password
     }
    //TODO add validator.isEmpty()
    if (isInputsValidated) {
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

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" htmlFor="firstName">First Name </label>
          <input  className="form__input" 
                  type="text" value={firstName} 
                  onChange={(e) => handleInputChange(e)} 
                  id="firstName" 
                  placeholder="First Name"
                  onBlur={e => inputValidation(e)} />
        </div>
        <div className="lastname">
          <label className="form__label" htmlFor="lastName">Last Name </label>
          <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">Email </label>
          <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
        </div>
        <div className="username">
          <label className="form__label" htmlFor="username">Username </label>
          <input type="text" name="" id="username" value={username} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">Password </label>
          <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
        </div>
        <div className="confirm-password">
          <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
          <input  className="form__input" 
                  type="password" 
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Confirm Password"
                  onBlur={e => inputValidation(e)} />
        </div>
      </div>
      <div className="footer">
        <button onClick={() => handleSubmit()} type="submit" className="btn">
                Register
        </button>
      </div>
    </div>
  )
}

export {
  RegistrationForm,
}