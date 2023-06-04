import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationAction } from './store/actions/authenticationActions';
import { updateAccessToken, updateAccessTokenByRefreshToken } from './common/utils/useOAuth2';

import './App.scss';

import { Main } from './components/Main/Main';
import { Login } from './components/Login/Login';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { RedirectPage } from './components/RedirectPage/RedirectPage';
import { TestPanel } from './components/TestPanel/TestPanel';

export const App = () => {
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);

  const undateAuthenticationState = async () => {
    try {
      const access_token = await updateAccessTokenByRefreshToken(); // пока что есть проблемка: не ясно по какой причине нет access_token (может сервер лежит), данные обработчики нужно добавить в обработку ошибок 

      if (access_token) {
        updateAccessToken(access_token);
        dispatch(authenticationAction(true));
      } else {
        dispatch(authenticationAction(false));
      }
    } catch (error) {
      // TODO что если проверка авторизации не удалась
      // authState: false и/или предупреждение, что "Аутентификация не удалась" (но можно продолжить работу без аутентификации)
    }
  }

  useEffect(() => {
    undateAuthenticationState();
  });

  return (
    <BrowserRouter>
      <div className={!isDarkModeEnabled ? 'wrapper' : 'theme-dark'}>
        <Header />
        <TestPanel />
        <div className='main-wrapper'>
          <Routes>
            <Route path='/' element={<Main />} exact />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/redirect' element={<RedirectPage />}></Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

