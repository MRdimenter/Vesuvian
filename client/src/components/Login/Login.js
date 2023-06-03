import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './login.scss';

import { postOAuth2Login } from '../../common/utils/fetchWrapper';
import { authenticationAction } from '../../store/actions/authenticationActions';
import { setRefreshToken } from '../../common/utils/useOAuth2';

//console.log('login: ', window.location, '!');

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState('user');
  const [password, setPassword] = useState('user');
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postOAuth2Login(username, password);
      const { refresh_token } = response;

      if (refresh_token) {
        setRefreshToken(refresh_token);
        dispatch(authenticationAction(true));
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.message === 'Unauthorized') {
        setIsWrongCredentials(true);
      } else {
        setIsWrongCredentials(true);
      }
    }
  }

  useEffect(() => {
  }, [isWrongCredentials]);

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
          <input type="password" onChange={e => setPassword(e.target.value)} value={username}/>
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