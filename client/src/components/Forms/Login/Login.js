import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './login.scss';

import { authenticationAction, authenticationStateAction } from '../../../store/actions/authenticationActions';
import { OAuth2Servise } from '../../../common/utils/OAuth2Servise';
import { InputBox } from '../InputBox';
import { WrongCredentialWarning } from './WrongCredentialWarning';
import { LoginFooter } from './LoginFooter';
import { WarningMessage } from './WarningMessage';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('user');
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isInputsValidated, setIsInputsValidated] = useState(false);

  function isInputsValid(e) {
    for (const element of e.target.elements) {
      if (element.className.includes('warn')) {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const oAuth2Servise = new OAuth2Servise();
    /*
        if (isInputsValid(event)) {
          console.log('fetch');
        } else {
          console.log('no fetch');
        }
    */
    if (isInputsValid(event)) {
      setIsInputsValidated(true);

      try {
        const response = await oAuth2Servise.OAuth2Login(username, password);
        if (response) {
          dispatch(authenticationAction(true));
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        if (error.message === '401') {
          setIsWrongCredentials(true);
        } else {
          navigate("/errorPage");
        }
      }
    } else {
      setIsInputsValidated(false);
    }
  }

  useEffect(() => {
  }, [isWrongCredentials]);

  useEffect(() => {
    dispatch(authenticationStateAction(false));
    // componentWillUnmount
    return () => {
      dispatch(authenticationStateAction(true));
    }
  }, [dispatch]);

  return (
    <div className="login-wrapper">
      {isWrongCredentials && <WrongCredentialWarning />}
      <h1>Please Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <InputBox className="username" labelContent="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputBox className="password" type="password" labelContent="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className='login-button-wrapper'>
          <button type="submit">Submit</button>
        </div>
      </form>
      <LoginFooter/>
      {isInputsValidated ? null : <WarningMessage />}
    </div>
  )
}

export {
  Login,
}