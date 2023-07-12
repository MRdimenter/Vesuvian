import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationAction } from './store/actions/authenticationActions';

import './App.scss';

import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { RedirectPage } from './components/RedirectPage/RedirectPage';
import { TestPanel } from './components/TestPanel/TestPanel';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { Login } from './components/Forms/Login/Login';
import { RegistrationForm } from './components/Forms/RegistrationForm/RegistrationForm';
import { ReLoginPage } from './components/ErrorPage/ReLoginPage';
import { appendCurrentCustomerDataAction } from './store/actions/appendCurrentCustomerDataAction';
import { CustomersPage } from './components/CustomersPage/CustomersPage';

// TODO тестить на 3G:
// форма логин остается открытой после нажатия на кнопку Вход -> добавить компонент "входим в аккаунт"
// после откючения формы Логин кнопки Зарегестрироваться/вход активны и есть возможность снова нажать на Вход -> 
// решение: состояние аунтентификаци (типа лоадинг), в это время компоненты, которые зависят от состояния аутентификации должны ожидать результата!
// после нажатия на кнопку LogOut тоже непонятная пауза -> нужно активнее закрывать это поле

export const App = () => {
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);

  useEffect(() => {
    //TODO обсудить как обрабатывать ошибку: на работу не влияет, но ошибка в консоле выглядит не очень (она как бы ожидаемая)
    dispatch(authenticationAction());
    dispatch(appendCurrentCustomerDataAction());
  });

  return (
    <BrowserRouter>
      <div className={`main-wrapper ${!isDarkModeEnabled ? 'wrapper' : 'theme-dark'}`}>
        <Header />
        <TestPanel />
        <div className='main-container'>
          <Routes>
            <Route path='/' element={<Main />} exact />
            <Route path='/registrationForm' element={<RegistrationForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/redirect' element={<RedirectPage />}></Route>
            <Route path='/errorPage' element={<ErrorPage />}></Route>
            <Route path='/reLoginPage' element={<ReLoginPage />}></Route>
            <Route path='/listItem' element={<CustomersPage />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

