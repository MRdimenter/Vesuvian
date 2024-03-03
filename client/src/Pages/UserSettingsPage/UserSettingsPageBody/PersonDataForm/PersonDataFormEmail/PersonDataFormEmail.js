import { Button } from '../../../../../components/Button/Button';
import { InputBox } from '../../../../../components/Forms/InputBox';

import './personDataFormEmail.scss';

const PersonDataFormEmail = ({
  className,
  labelContent,
  inputBoxLabelWidth,
  necessary,
  value,
  onChange,
  onValidationChange,
  hitnText,
  direction
}) => {
  const openPersonData = () => {
    console.log('openPersonData');
  }
  const activeTab = 'personData';

  return (
    <div className="person-data-form-email">
      <InputBox
        className={className}
        labelContent={labelContent}
        inputBoxLabelWidth={inputBoxLabelWidth}
        necessary={necessary}
        value={value} 
        onChange={onChange}
        onValidationChange={onValidationChange}
        hitnText={hitnText}
        direction={direction}
      />
      {/* <span style={{color: 'green'}}>Подтверждён</span> */}
      {/* <Button
          btnStyle='link'
          label='Изменить E-mail'
          action={openPersonData}
          textColor={(activeTab === 'personData') ? 'white': 'grey'}
          fontSize='normal'
          disabled={(activeTab === 'personData')}
        /> */}
    </div>
  )
}

export {
  PersonDataFormEmail,
}