import { Link } from 'react-router-dom';
import { LoginButtons } from '../LoginButtons/LoginButtons';
import { Button } from '../Button/Button';
import { SearchInput } from '../Forms/InputBox';

import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavPanel } from './NavPanel/NavPanel';

const Header = () => {

  const dispatch = useDispatch();
  // todo оригинально - две константы разные по названию, но с одинаковым значением! ))
  const {authStatus, authStatus: isAuthenticated, authState: isAuthenticationVerified} = useSelector((state) => state.isAuth);
  
  // const content = isAuthenticationVerified && (isAuthenticated ? <UserAccountMenu /> : <RegistrationButtons dispatch={dispatch}/>);

  const isAuth = isAuthenticationVerified && isAuthenticated;

  return (
    <div className='header'>
      <Link className='Logo' to={'/'}> <h1 className='header-1'>VESUVIAN</h1> </Link>
      {isAuth && <NavPanel />}
      <LoginButtons isAuth={isAuth} />
    </div>
  )
}

export {
  Header,
}