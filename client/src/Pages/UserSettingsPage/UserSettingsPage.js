import { UserSettingsPageBody } from './UserSettingsPageBody/UserSettingsPageBody';
import { UserSettingsPageHeader } from './UserSettingsPageHeader/UserSettingsPageHeader';

import './userSettingsPage.scss';

// TODO интересная штука! у нас половина приложения User, а половина Customer! ))
const UserSettingsPage = () => {

  return (
    <div className='user-settings-page'>
      <UserSettingsPageHeader />
      <UserSettingsPageBody />
    </div>
  )
}

export {
  UserSettingsPage,
}