import { Button } from '../../../../../components/Button/Button';
import { PasswordInputBox } from '../../../../../components/Forms/InputBox';
import './personDataFormPassword.scss';

const PersonDataFormPassword = ({ className, labelContent, necessary, value, onChange, onValidationChange, hitnText, direction }) => {
  const openPersonData = () => {
    console.log('openPersonData');
  }
  const activeTab = 'personData'

  return (
    <div className="person-data-form-password">
        <PasswordInputBox
          className={className}
          labelContent={labelContent}
          necessary={necessary}
          value={value} 
          onChange={onChange}
          onValidationChange={onValidationChange}
          hitnText={hitnText}
          direction={direction}
        />
        <Button
          btnStyle='link'
          label='Изменить пароль'
          action={openPersonData}
          textColor={(activeTab === 'personData') ? 'white': 'grey'}
          fontSize='normal'
          disabled={(activeTab === 'personData')}
        />
      </div>
  )
}

export {
  PersonDataFormPassword,
}