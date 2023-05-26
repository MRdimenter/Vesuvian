import { useState } from 'react';
import './login.css';

import { postOAuth2Login } from '../../common/utils/fetchWrapper';
import { useDispatch } from 'react-redux';
import { authenticationAction } from '../../store/actions/authenticationAction';
import { setRefreshToken } from '../../common/utils/useOAuth2';

//TODO - сообщение о неверном логине или пароле
console.log('login: ', window.location, '!');


export const Login = () => {
  const dispatch = useDispatch();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postOAuth2Login(username, password);
      const { refresh_token } = response;
    
      if (refresh_token) {
        setRefreshToken(refresh_token);
        dispatch(authenticationAction(true));
      } else {
        console.log('NE prishel', refresh_token);
      }
    } catch(err) {

      // перехватит любую ошибку в блоке try: и в fetch, и в response.json
      //console.log(err);
    }

    /*
    const response = await postOAuth2(KEYCLOAK_URL, username, password);
    const { refresh_token } = response;
    
    

    if (refresh_token) {
      console.log('Yra prishel', refresh_token);
      setRefreshToken(refresh_token);
    } else {
      console.log('NE prishel', refresh_token);
    }

    */
    //getTestDataFromResourceServer(access_token);

    //dispatch(authenticationAction()); //todo временно комментируем, чтобы проверить первоначальное открытие приложения
  }

  return (
    <div className="login-wrapper">
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
      </form>
    </div>
  )
}