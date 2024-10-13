import { Button } from '../../../Button/Button';
import { useLogOut } from '../../../../common/hooks/useLogOut';

import './userDropdown.scss'

const UserDropdown = () => {
  const { logout } = useLogOut();

  return (
    <ul className="dropdown-menu">
      <li className="dropdown-item">Профиль</li>
      <li className="dropdown-item">
        <Button
          btnStyle='link'
          textColor='black'
          label='Настройки'
          link={'/userSettingsPage'}
          action={logout}
        />
        {/* <Route path='/userSettingsPage' element={<UserSettingsPage />}></Route> */}
      </li>
      <li className="dropdown-item">
        <Button 
          btnStyle='link'
          textColor='red'
          label='Выйти'
          link={'/'}
          action={logout}
        />
      </li>
    </ul>
  );
};

export {
  UserDropdown,
}
