import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Button/Button';
import { CardTransparentWhithBorder } from '../../Card/CardTransparentWhithBorder/CardTransparentWhithBorder';
import { Icon } from '../../Icon/Icon';
import { TextArea } from '../../InputComponents/TextArea/TextArea';
import { CardCreatingTextarea } from './CardCreatingTextarea/CardCreatingTextarea';

import { OAuth2Service } from '../../../common/utils/OAuth2Service';
import { ApiService } from '../../../common/utils/ApiService';
import { CollectionSelection } from './CollectionSelection/CollectionSelection';
import { useDispatch } from 'react-redux';
import { BadRequestError, RefreshTokenMissingError, ServerError } from '../../../common/utils/Errors/Errors';
import { authenticationAction } from '../../../store/actions/authenticationActions';

import './cardCreatingForm.scss';

const CardCreatingForm = ({ isCollictionAddition, collectionIdForAddition }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [frontSideCardValue, setFrontSideCardValue] = useState('');
  const [backSideCardValue, setBackSideCardValue] = useState('');
  const [definitionValue, setDefinitionValue] = useState('');
  const [selectedCollectionName, setSelectedCollectionName] = useState('');
  const [collectionsDataList, setCollectionsDataList] = useState([]);

  const attachingImage = () => {
    console.log('click attachingImage');
  }

  const cardData = {
    "term": frontSideCardValue,
    "definition": definitionValue,
    "hint": backSideCardValue
  }

  const handleSelectChange = (value) => {
    setSelectedCollectionName(value);
  };

  const handleSetFrontSideCardValue = (value) => {
    if (value?.length < 25) {
      setFrontSideCardValue(value);
    } else {
      //todo: при достижении максимума появляется предупреждение
    }
  }

  useEffect(() => {
    if (collectionsDataList?.length) {
      const firstCollectionName = collectionsDataList[0].name;
      setSelectedCollectionName(firstCollectionName);
    }
  }, [collectionsDataList])

  const submitCardCreation = async () => {
    //TODO попробую сначала так, а потом через Action
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);
    const collectionId = collectionsDataList.find((collection) => collection.name === selectedCollectionName).collectionId;
    const response = await apiService.postCreateCard(collectionId, cardData);
    //todo обработать response? и/или переделать на запрос с внутренней обработкой ошибок (через состояние redux)
  }

  async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();

    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  useEffect(() => {
    // todo вынести всю эту функцию и заменить на новый запрос через состояния запроса и встроенную переадресацию в Action
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    async function fetchCurrentCustomerCollections() {  //TODO rename (злой копипаст - не изменил название функции)
      // setLoading(true); // TODO if Loading
      try {
        const reponseCollectionList = await apiService.getCurrentCustomerCollections();

        if (reponseCollectionList) {
          //TODO сохранять только необходимые данные: тame и collection_id коллекции
          const collectionsDataList = reponseCollectionList.map((collection) => {
            return {collectionId: collection.collection_id, name: collection.name}
          })
          
          //TODO возможно изменить запрос на получение конкретной коллекции дабы уменьшить запрос
          if (isCollictionAddition && collectionsDataList.length) {
            const collectionForAddition = collectionsDataList.find((collection) => collection.collectionId === collectionIdForAddition)
            setCollectionsDataList([collectionForAddition]);
          } else {
            setCollectionsDataList(collectionsDataList);
          }

        } else {
          // setError(true); // TODO if Error
          throw new Error('Неверные данные');
        }
      } catch (error) {
        //TODO не дложно здесь этого быть - нужно делать через контроллер проверки загрузки
        if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
          logout(dispatch);
          navigate("/reLoginPage");
        }
        //TODO не дложно здесь этого быть - нужно делать через контроллер проверки загрузки
        if (error instanceof ServerError) {
          navigate("/errorPage");
        }
      } finally {
        // setLoading(false); // TODO 
      }
    }

    fetchCurrentCustomerCollections();
  }, [dispatch, navigate]);

  const options = collectionsDataList.map((collection) => collection.name);

  return (
    <form className="card-creating-form">
      <div className="two-sides-card">
        <CardTransparentWhithBorder>
          <CardCreatingTextarea
              id="front-side-card-textarea"
              placeholder='Введите текст лицевой стороны'
              value={frontSideCardValue}
              onChange={(e) => handleSetFrontSideCardValue(e.target.value)} //TODO ограничение на кол-во символов
            />
        </CardTransparentWhithBorder>
        <CardTransparentWhithBorder>
          <CardCreatingTextarea
              id="back-side-card-textarea"
              placeholder='Введите текст обратной стороны'
              value={backSideCardValue}
              onChange={(e) => setBackSideCardValue(e.target.value)}
            />
        </CardTransparentWhithBorder>
      </div>

      <div className="card-params">
        <div className="hint-column">
          <TextArea
            id="card-hint-textarea"
            label="Введите описание"
            placeholder='Введите описание'
            value={definitionValue}
            onChange={(e) => setDefinitionValue(e.target.value)}
          />
        </div>
        <div className="collection-additional-settings-column">
          <CollectionSelection
            label='Выбрать коллекцию'
            options={options}
            initSelectedValue={selectedCollectionName}
            onChange={handleSelectChange}
          />

          <div className="attaching-image" onClick={attachingImage}>
            <Icon iconName='paperclip-svg' iconFormat='svg' width="25" height="25" />
            <span className='attaching-image-text'>Прикрепить изображение</span>
          </div>

          
        </div>
      </div>

      <div className="button-submit-card-creation">
        <Button btnStyle='btn' label='Коллекция' action={submitCardCreation} />
        <Button btnStyle='btn' label='Отмена' link={'/'} />
      </div>
    </form>
  )
}

export {
  CardCreatingForm,
}