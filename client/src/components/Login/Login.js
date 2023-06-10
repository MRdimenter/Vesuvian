import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './login.scss';

import { authenticationAction, authenticationStateAction } from '../../store/actions/authenticationActions';
import { OAuth2Servise } from '../../common/utils/OAuth2Servise';

//console.log('login: ', window.location, '!');
// TODO refactor like registration form

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState('user');
  const [password, setPassword] = useState('user');
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const oAuth2Servise = new OAuth2Servise();

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
      <div className={`login-pass-warning ${isWrongCredentials ? 'block' : 'none'}`}>
        <p>
          Неверный логин или пароль
          (если данные введены верно, пожалуйста, обратитесь 
          к разработчикам ...адрес почты)
        </p>
      </div>
      <h1>Please Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} value={username}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
        </label>
        <div className='login-button-wrapper'>
          <button type="submit">Submit</button>
        </div>        
      </form>
      <div className='registration-wrapper'>
          <p>
            Если вы еще не зарегистрировались, пожалуйста, зарегистрируйтесь. мы всегда рады новым пользователям!
          </p>
          <div className='registration-button-wrapper'>
            <button className='registration-button'>Регистрация</button>
          </div>
        </div>
    </div>
  )
}