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

function isInputsValid(e) {
  for (const element of e.target.elements) {
    if (element.className.includes('warn')) {
      return false;
    }
  }
  return true;
}

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

  const handleSubmit = async (e) => {
    e.preventDefault();
/*
    if (isInputsValid(e)) {
      console.log('fetch');
      setIsInputsNotValidated(true);
    } else {
      console.log('no fetch');
      setIsInputsNotValidated(false);
    }
    
*/
    if (isInputsValid(e)) {
      setIsIncorrectInputs(false);

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
        //console.log('response: ', response);
        //console.log('response.status: ', response.status);
        if (response.status === 201) {
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
        <InputBox className="firstName" labelContent="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <InputBox className="lastName" labelContent="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <InputBox className="email" type="email" labelContent="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <InputBox className="username" labelContent="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <InputBox className="password" type="password" labelContent="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <InputBox className="confirmPassword" type="password" labelContent="Confirm Password" value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} password={password}/>
        <div className="registration-button-wrapper">
          <button type="submit" className="btn">Register</button>
        </div>
      </form>
      {isIncorrectInputs && <WarningMessageInput />}
    </div>
  )
}

export {
  RegistrationForm,
}