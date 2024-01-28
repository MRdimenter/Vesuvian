import { Button } from '../../../../components/Button/Button';

import './userSettingsPageBodyNav.scss'

// TODO универсальный компонент возможно в компоненте whithNav
const UserSettingsPageBodyNav = ({ activeTab, setActiveTab, isCollectionSetting, isCollectionAddition }) => {
  
  const openPersonData = (e) => {
    console.log('openPersonData e.target: ', e.nativeEvent);
    setActiveTab('personData');
  }

  const personDataBtnStyle = (activeTab === 'personData') ? 'underlined-white' : '';

  return (
    <div className='user-settings-page-body-nav'>
      <div className="user-settings-page-body-nav-buttons">
        <div className={`${personDataBtnStyle}`}>
          <Button 
            btnStyle='link'
            label='Личные данные'
            action={openPersonData}
            textColor={(activeTab === 'personData') ? 'white': 'grey'}
            fontSize='big'
            disabled={(activeTab === 'personData')}
          />
        </div>
      </div>
    </div>
  )
}

export {
  UserSettingsPageBodyNav,
}