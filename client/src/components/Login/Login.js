import { useEffect, useState } from 'react';
import './login.css';

import { postOAuth2Login } from '../../common/utils/fetchWrapper';
import { useDispatch } from 'react-redux';
import { authenticationAction } from '../../store/actions/authenticationAction';
import { setRefreshToken } from '../../common/utils/useOAuth2';
import { useNavigate } from 'react-router-dom';

//console.log('login: ', window.location, '!');

export const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
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
      <div className={isWrongCredentials ? 'block' : 'none'}>
        <p>
          Неверный логин или пароль
          <br />
          (если данные введены верно, пожалуйста, обратитесь к разработчикам
          <br />
          ...адрес почты)
        </p>
      </div>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <p>
            Если вы еще не зарегистрировались,
            <br />
            пожалуйста, зарегистрируйтесь.
            <br />
            мы всегда рады новым пользователям! :)
          </p>
          <button>Регистрация</button>
        </div>
      </form>
    </div>
  )
}