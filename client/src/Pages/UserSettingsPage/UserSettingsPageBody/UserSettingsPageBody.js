import { useState } from 'react';
import { UserSettingsPageBodyNav } from './UserSettingsPageBodyNav/UserSettingsPageBodyNav';
import './userSettingsPageBody.scss';
import { PersonDataForm } from './PersonDataForm/PersonDataForm';

// TODO добавить компонент whithNav, в котором будет логика переключения между вкладками кнопками навгиации
// в нём будет, к примеру, массив доступных вкладо, и useState будет переключаться по ним - индексы универсальная кштука

const UserSettingsPageBody = () => {
  const [activeTab, setActiveTab] = useState('personData')

  return (
    <div className='user-settings-page-body'>
      <UserSettingsPageBodyNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {(activeTab === 'personData') && 
        <PersonDataForm
        />
      }
    </div>
  )
}

export {
  UserSettingsPageBody,
}