import { AUTH_ERROR } from './actionTypes';
import { useNavigate } from 'react-router-dom';

export const handleAuthError = () => {
  return (dispatch) => {
    // Диспатчим экшен для изменения состояния хранилища
    dispatch({ type: AUTH_ERROR });

    // Перенаправляем пользователя на страницу авторизации
    //dispatch(push('/login')); // Здесь предполагается использование React Router
    const navigate = useNavigate();
    navigate("/errorPage");
  };
};