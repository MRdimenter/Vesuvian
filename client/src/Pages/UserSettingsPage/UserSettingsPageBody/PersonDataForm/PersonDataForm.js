import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputBox, PasswordInputBox } from '../../../../components/Forms/InputBox'
import { REGISTR_URL_PATH } from '../../../../common/constants/urlConstants';
import { postRegistration } from '../../../../common/utils/fetchWrapper';
import './personDataForm.scss'

const PersonDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <form className="person-data-form">
      <InputBox 
        className="first-name-setting"
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
    </form>
  )
}

export {
  PersonDataForm
}