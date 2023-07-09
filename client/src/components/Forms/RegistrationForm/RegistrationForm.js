import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authenticationStateAction } from '../../../store/actions/authenticationActions';

import './registrationForm.scss'
import { InputBox } from '../InputBox';
import { WarningMessageInput } from './WarningMessageInput';
import { WarningMessageUnoccupiedEmail } from './WarningMessageUnoccupiedEmail';
import { postRegistration } from '../../../common/utils/fetchWrapper';
import { REGISTR_URL_PATH } from '../../../common/constants/urlConstants';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Button/Button';
import { RegistrationFormFooter } from './RegistrationFormFooter';

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
        <InputBox className="firstName" labelContent="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} onValidationChange={handleValidationChange} />
        <InputBox className="lastName" labelContent="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} onValidationChange={handleValidationChange} />
        <InputBox className="email" type="email" labelContent="Email" value={email} onChange={(e) => setEmail(e.target.value)} onValidationChange={handleValidationChange} />
        <InputBox className="username" labelContent="Username" value={username} onChange={(e) => setUsername(e.target.value)} onValidationChange={handleValidationChange} />
        <InputBox className="password" type="password" labelContent="Password" value={password} onChange={(e) => setPassword(e.target.value)} onValidationChange={handleValidationChange} />
        <InputBox className="confirmPassword" type="password" labelContent="Confirm Password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} password={password} onValidationChange={handleValidationChange} />
        <div className="registration-button-wrapper">
          <Button btnStyle='link' label='Register' action={handleSubmit} />
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