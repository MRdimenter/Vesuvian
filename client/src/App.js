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
import { ListItem } from './components/ItemList/ItemList';
import { appendCurrentCustomerDataAction } from './store/actions/appendCurrentCustomerDataAction';

export const App = () => {
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector((state) => state.DarkMode);

  useEffect(() => {
    dispatch(authenticationAction());
    dispatch(appendCurrentCustomerDataAction());
  });

  return (
    <BrowserRouter>
      <div className={!isDarkModeEnabled ? 'wrapper' : 'theme-dark'}>
        <Header />
        <TestPanel />
        <div className='main-wrapper'>
          <Routes>
            <Route path='/' element={<Main />} exact />
            <Route path='/registrationForm' element={<RegistrationForm />} />
            <Route path='/login' element={<Login />} />
            <Route path='/redirect' element={<RedirectPage />}></Route>
            <Route path='/errorPage' element={<ErrorPage />}></Route>
            <Route path='/reLoginPage' element={<ReLoginPage />}></Route>
            <Route path='/listItem' element={<ListItem />}></Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

