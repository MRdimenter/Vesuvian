import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticationAction } from './store/actions/authenticationActions';

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
import { CollectionsPage } from './components/CollectionsPage/CollectionsPage';
import { CardCollectionCreatingPage } from './components/Pages/CardCollectionCreatingPage/CardCollectionCreatingPage';
import { CollectionPage } from './Pages/CollectionPage/CollectionPage';

import './App.scss';
import { UserSettingsPage } from './Pages/UserSettingsPage/UserSettingsPage';

// TODO тестить на 3G:
// форма логин остается открытой после нажатия на кнопку Вход -> добавить компонент "входим в аккаунт"
// после откючения формы Логин кнопки Зарегестрироваться/вход активны и есть возможность снова нажать на Вход -> 
// решение: состояние аунтентификаци (типа лоадинг), в это время компоненты, которые зависят от состояния аутентификации должны ожидать результата!
// после нажатия на кнопку LogOut тоже непонятная пауза -> нужно активнее закрывать это поле
// TODO: добавить общее состояние загрузки для всего App (чтобы было понятно в случае любой загрузки, что "идет загрузка", а не просто приложение тупит)

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
      <div className={`main-wrapper`}>
        <div className="main">
          <Header />
          {/* <TestPanel /> */}
          <div className='main-container'>
            <Routes>
              <Route path='/' element={<Main />} exact />
              <Route path='/registrationForm' element={<RegistrationForm />} />
              <Route path='/login' element={<Login />} />
              <Route path='/redirect' element={<RedirectPage />}></Route>
              <Route path='/errorPage' element={<ErrorPage />}></Route>
              <Route path='/reLoginPage' element={<ReLoginPage />}></Route>
              <Route path='/listItem' element={<CustomersPage />}></Route>
              <Route path='/collectionPage' element={<CollectionPage />}></Route>
              <Route path='/collectionsPage' element={<CollectionsPage />}></Route>
              <Route path='/cardCreatingPage' element={<CardCollectionCreatingPage />}></Route>
              <Route path='/userSettingsPage' element={<UserSettingsPage />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

//TODO при потере refreshtoken на http://localhost:3000/collectionPage не происходит редиректа на страницу авторизации
//TODO и вообще почему такое происходит?