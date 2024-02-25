import { Button } from '../../../../../components/Button/Button';
import { InputBox } from '../../../../../components/Forms/InputBox';

import './personDataFormPassword.scss';

// в качестве InputBox заглушка, т.к. изменение пароля производится в отдельной форме
const PersonDataFormPassword = ({ className, labelContent, necessary, value, onChange, onValidationChange, hitnText, direction }) => {
  const openPersonData = () => {
    console.log('openPersonData');
  }
  const activeTab = 'personData'

  return (
    <div className="person-data-form-password">
        <InputBox
          className="password"
          labelContent="Пароль"
          inputBoxLabelWidth='100px'
          value={`*********`}
          hitnText={null}
          direction='rowInputBox'
          disabled={true}
        />
        {/* <PasswordInputBox
          className={className}
          labelContent={labelContent}
          inputBoxLabelWidth='100px'
          necessary={necessary}
          value={value} 
          onChange={onChange}
          onValidationChange={onValidationChange}
          hitnText={hitnText}
          direction={direction}
          disabled={true}
        /> */}
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