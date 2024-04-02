import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticationStateAction } from '../../../store/actions/authenticationActions';

import { InputBox, PasswordInputBox } from '../InputBox';
import { WarningMessageInput } from './WarningMessageInput';
import { WarningMessageUnoccupiedEmail } from './WarningMessageUnoccupiedEmail';
import { postRegistration } from '../../../common/utils/fetchWrapper';
import { REGISTR_URL_PATH } from '../../../common/constants/urlConstants';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Button/Button';
import { RegistrationFormFooter } from './RegistrationFormFooter';

import './registrationForm.scss'

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  
  const [isIncorrectInputs, setIsIncorrectInputs] = useState(false);
  const [isOccupiedEmail, setIsOccupiedEmail] = useState(false);
  const [validationData, setValidationData] = useState({});

  const firstNameHitnText = `Имя должно содержать только буквы, пробелы и дефисы \n Имя должно содержать от 2 до 50 символов`;
  const lastNameHitnText = `Фамилия должна содержать только буквы, пробелы и дефисы \n Фамилия должна содержать от 2 до 50 символов`;
  const emailNameHitnText = `Максимальная длина email-адреса составляет 254 символа`;
  const usernameNameHitnText = `Никнейм должен содержать только буквы, цифры и знак подчеркивания \n Никнейм должен содержать от 4 до 20 символов`;
  const passwordNameHitnText = `Пароль должен содержать от 8 до 128 символов \n Пароль должен содержать хотя бы одну прописную букву, одну строчную букву, одну цифру и один специальный символ`
  const confirmPasswordNameHitnText =`Значение поля "Введите пароль повторно" должно совпадать с введённым ранее паролем`;

  const handleValidationChange = (inputId, isValid) => {
    setValidationData((prevData) => ({
      ...prevData,
      [inputId]: isValid,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(validationData).every((isValid) => isValid);
    
    setIsIncorrectInputs(false);
    setIsOccupiedEmail(false);

    if (isFormValid) {
      const credentials = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        // todo удочнить за что отвечает этот "enabled": true
        "enabled": true,
        "username": username,
        "password": password
      }

      try {
        const response = await postRegistration(REGISTR_URL_PATH, credentials)
        if (response.status === 201) {
          // TODO переход на страничку "Пользователь {username} успешно зарегестрирован", кнопка перехода на login
          navigate("/login");
        }
        if (response.status === 409) {
          setIsOccupiedEmail(true);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    } else {
      console.log('else');
      console.log(validationData);
      setIsIncorrectInputs(true);
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
      {isOccupiedEmail && <WarningMessageUnoccupiedEmail />}
      <form className="registration-form" onSubmit={handleSubmit}>
        <InputBox
          className="firstName"
          labelContent="Имя"
          necessary={true}
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
          onValidationChange={handleValidationChange} 
          hitnText={firstNameHitnText}
        />
        <InputBox
          className="lastName"
          labelContent="Фамилия"
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)}
          onValidationChange={handleValidationChange}
          hitnText={lastNameHitnText}
        />
        <InputBox
          className="email"
          type="email"
          labelContent="Email"
          necessary={true}
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          onValidationChange={handleValidationChange}
          hitnText={emailNameHitnText}
        />
        <InputBox
          className="username"
          labelContent="Никнейм"
          necessary={true}
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          onValidationChange={handleValidationChange}
          hitnText={usernameNameHitnText}
        />
        <PasswordInputBox
          className="password"
          labelContent="Пароль"
          necessary={true}
          value={password} 
          onChange={setPassword}
          onValidationChange={handleValidationChange}
          hitnText={passwordNameHitnText}
        />
        <PasswordInputBox
          className="confirmPassword"
          labelContent="Введите пароль повторно"
          necessary={true}
          value={confirmPassword}
          onChange={setConfirmPassword}
          password={password}
          onValidationChange={handleValidationChange} 
          hitnText={confirmPasswordNameHitnText}
        />
        <p><span style={{ color: 'red' }}>*</span>- поля обязательные для заполнения</p>
        <div className="registration-button-wrapper">
          <Button
            btnStyle='link'
            label='Регистрация'
            action={handleSubmit}
          />
        </div>
      </form>
      <RegistrationFormFooter />
      {isIncorrectInputs && <WarningMessageInput />}
    </div>
  )
}

export {
  RegistrationForm,
}