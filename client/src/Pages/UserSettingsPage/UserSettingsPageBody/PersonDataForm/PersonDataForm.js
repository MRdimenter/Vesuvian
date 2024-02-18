import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputBox, PasswordInputBox } from '../../../../components/Forms/InputBox'
import { REGISTR_URL_PATH } from '../../../../common/constants/urlConstants';
import { postRegistration } from '../../../../common/utils/fetchWrapper';
import { PersonDataFormPassword } from './PersonDataFormPassword/PersonDataFormPassword';
import { PersonDataFormEmail } from './PersonDataFormEmail/PersonDataFormEmail';
import { CollectionSelection } from '../../../../components/CardCollectionCreatingPopup/CardCreatingForm/CollectionSelection/CollectionSelection';
import { Button } from '../../../../components/Button/Button';
import { OAuth2Service } from '../../../../common/utils/OAuth2Service';
import { ApiService } from '../../../../common/utils/ApiService';
import { appendCurrentCustomerDataAction } from '../../../../store/actions/appendCurrentCustomerDataAction';
import { DropDownMenuGrouping } from '../../../../components/DropDownMenu/DropDownMenuGrouping';
import { WhithLabel } from '../../../../components/WhithLabel/WhithLabel';

import './personDataForm.scss'

// todo откуда берутся два похожих поля currentCustomerData и customerDataState?
// todo думается, одно нужно ликвидировать (попробовать, но возможно они из разных источников и разные по актуальности)

const collectionsDataListDefault = [
  {
    collectionId: 1,
    name: 'Мне',
  },
  {
    collectionId: 2,
    name: 'Друзьям',
  },
  {
    collectionId: 3,
    name: 'Всем',
  },
]

const languageOptions = [
  {
    collectionId: 1,
    name: 'Русский',
  },
]

const PersonDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state)
  const customerDataState = useSelector((state) => state.customerDataState)

  const [firstName, setFirstName] = useState(customerDataState.customerData.firstName);
  const [lastName, setLastName] = useState(customerDataState.customerData.lastName);
  const [email, setEmail] = useState(customerDataState.customerData.email);
  const [username, setUsername] = useState(customerDataState.customerData.userName);
  const [password, setPassword] = useState('servertest');
  const [confirmPassword, setConfirmPassword] = useState('servertest');
  
  const [isIncorrectInputs, setIsIncorrectInputs] = useState(false);
  const [isOccupiedEmail, setIsOccupiedEmail] = useState(false);
  const [validationData, setValidationData] = useState({});
  const [collectionsDataList, setCollectionsDataList] = useState([]);
  const [selectedCollectionName, setSelectedCollectionName] = useState('');

  const firstNameHitnText = `Имя должно содержать только буквы, пробелы и дефисы \n Имя должно содержать от 2 до 50 символов`;
  const lastNameHitnText = `Фамилия должна содержать только буквы, пробелы и дефисы \n Фамилия должна содержать от 2 до 50 символов`;
  const emailNameHitnText = `Максимальная длина email-адреса составляет 254 символа`;
  const usernameNameHitnText = `Никнейм должен содержать только буквы, цифры и знак подчеркивания \n Никнейм должен содержать от 4 до 20 символов`;
  const passwordNameHitnText = `Пароль должен содержать от 8 до 128 символов \n Пароль должен содержать хотя бы одну прописную букву, одну строчную букву, одну цифру и один специальный символ`
  const confirmPasswordNameHitnText =`Значение поля "Введите пароль повторно" должно совпадать с введённым ранее паролем`;

  const currentCustomerData = useSelector((state) => state.currentCustomerData);

  const handleValidationChange = (inputId, isValid) => {
    setValidationData((prevData) => ({
      ...prevData,
      [inputId]: isValid,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = Object.values(validationData).every((isValid) => isValid);
    // todo вынести из субмита пожалуй - это что ж каждый раз будет oauthService и apiService создаваться?
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    setIsIncorrectInputs(false);
    setIsOccupiedEmail(false);

    if (isFormValid) {
      const credentials = {
        "firstName": firstName,
        "lastName": lastName,
        // ждем обновления запроса (пока что запрос не позволяет обновлять это поле)
        // "username": username,
        // будет обновляться отдельным запросом?
        "email": email,
        // нужно уточнить что это за поле
        // "enabled": true,
        // обновляется отдельным запросом
        // "password": password
      }

      const response = await apiService.putCustomerData(credentials);
      console.log('putCreateCollection: response: ', response);
      // если данные успешно обновились на сервере - обновить CustomerData в приложении
      if (response) {
        dispatch(appendCurrentCustomerDataAction());
      }
    } else {
      console.log('else');
      console.log(validationData);
      setIsIncorrectInputs(true);
    }
  }

  const visibilityOptions = collectionsDataList.map((collection) => collection.name);

  useEffect(() => {
    const { firstName, lastName, email, userName} = currentCustomerData;
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    // setPassword(password)
    setUsername(userName);

    // setCollectionsDataList(['Мне', 'Друзьям', 'Всем'])
    setCollectionsDataList(collectionsDataListDefault);
  }, [])

  // todo вообще у меня сомнения, что на столько высоко должно это обрабатываться
  useEffect(() => {
    if (collectionsDataList?.length) {
      const firstCollectionName = collectionsDataList[0].name;
      setSelectedCollectionName(firstCollectionName);
    }
  }, [collectionsDataList])

  const handleSelectChange = (value) => {
    console.log('handleSelectChange: value: ', value);
    setSelectedCollectionName(value);
  };

  return (
    <form className="person-data-form">
      <InputBox 
        className="first-name-setting"
        labelContent="Имя"
        inputBoxLabelWidth='100px'
        necessary={true}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        onValidationChange={handleValidationChange} 
        hitnText={firstNameHitnText}
        direction='rowInputBox'
      />
      <InputBox 
        className="lastName"
        labelContent="Фамилия"
        inputBoxLabelWidth='100px'
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)}
        onValidationChange={handleValidationChange}
        hitnText={lastNameHitnText}
        direction='rowInputBox'
      />
      <InputBox
        className="username"
        labelContent="Никнейм"
        inputBoxLabelWidth='100px'
        necessary={true}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onValidationChange={handleValidationChange}
        hitnText={usernameNameHitnText}
        direction='rowInputBox'
      />
      <PersonDataFormEmail
        className="email"
        type="email"
        labelContent="Email"
        inputBoxLabelWidth='100px'
        necessary={true}
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        onValidationChange={handleValidationChange}
        hitnText={emailNameHitnText}
        direction='rowInputBox'
      />
      <PersonDataFormPassword
        className="password"
        labelContent="Пароль"
        necessary={true}
        value={password} 
        onChange={setPassword}
        onValidationChange={handleValidationChange}
        hitnText={passwordNameHitnText}
        direction='rowInputBox'
      />
      <WhithLabel label="Видимость">
        <DropDownMenuGrouping
          groupingOptions={collectionsDataListDefault}
          selectedGroupOtionIndex={selectedCollectionName}
          setSelectedGroupOtionIndex={handleSelectChange}
          width={'159px'}
        />
      </WhithLabel>
      <div className="person-data-form-common">
        <span className='person-data-form-common-label btn-link-font-big'>Общие</span>
        <WhithLabel label="Язык">
        <DropDownMenuGrouping
          groupingOptions={languageOptions}
          selectedGroupOtionIndex={selectedCollectionName}
          setSelectedGroupOtionIndex={handleSelectChange}
          width={'159px'}
        />
      </WhithLabel>
      </div>
      <div className='person-data-form-button'>
        <Button btnStyle='btn' label='СОХРАНИТЬ ИЗМЕНЕНИЯ' action={e => handleSubmit(e)} />
      </div>
    </form>
  )
}

export {
  PersonDataForm
}