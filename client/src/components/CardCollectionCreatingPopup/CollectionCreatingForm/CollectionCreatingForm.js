import { useEffect, useState } from 'react';
import { ApiService } from '../../../common/utils/ApiService';
import { OAuth2Service } from '../../../common/utils/OAuth2Service'; 
import { Button } from '../../Button/Button';
import { InputBox } from '../../Forms/InputBox';
import { TextArea } from '../../InputComponents/TextArea/TextArea';
import { TagsCreatingForm } from './TagsCreatingForm/TagsCreatingForm';

import './collectionCreatingForm.scss';
import { useSelector } from 'react-redux';


const CollectionCreatingForm = ({ isCollectionSetting, collectionIdForAddition}) => {
  const collectionInfo = useSelector((state) => state.collectionInfo.collectionInfo)

  const [activeCreating, setActiveCreating] = useState('collectionCreating')
  const [colletionName, setColletionName] = useState(isCollectionSetting ? collectionInfo.name : '');
  const [collectionDescription, setCollectionDescription] = useState(isCollectionSetting ? collectionInfo.description : '');
  const [tags, setTags] = useState(isCollectionSetting ? collectionInfo.tags.map((tagObj) => tagObj.name) : []);

  //TODO сделать запрос через валидацию
  const handleValidationChange = () => {
    console.log('handleValidationChange');
  }


  const openCollectionCreating = (e) => {
    console.log('e.target: ', e.nativeEvent);
    if (activeCreating !== 'collectionCreating') {
      setActiveCreating('collectionCreating');
    }
  }

  const openCardCreating = () => {
    if (activeCreating !== 'cardCreating') {
      setActiveCreating('cardCreating');
    }
  }

  const submitCollectionCreation = async (e) => {
    e.preventDefault();
    console.log('submitCollectionCreation');
    //TODO попробую сначала так, а потом через Action
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    const getCollectionTags = (tags) => {
      return tags.map((tag) => {return {name: tag}});
    }

    console.log('getCollectionTags(tags): ', getCollectionTags(tags));

    const collectionData = {
      "name": colletionName,
      "is_public": true,
      "description": collectionDescription,
      "tags": getCollectionTags(tags),
    }

    if (!isCollectionSetting) {
      const response = await apiService.postCreateCollection(collectionData);
      console.log('postCreateCollection: response: ', response);
    }

    if (isCollectionSetting) {
      const collectionId = collectionInfo.collection_id;
      const response = await apiService.putCreateCollection(collectionData, collectionId);
      console.log('putCreateCollection: response: ', response); 
    }
  }

  const deleteTag = (tagComponent) => {
    const indexOfTagForDeleting = tagComponent.props.index;
    setTags((prevState) => {
      const processedTags = [...prevState];
      processedTags.splice(indexOfTagForDeleting, 1);
      return processedTags;
    });
  }

  const handleKeyEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // todo переход на следующий компонент
    }
  }

  const setNewTag = (newTagValue) => {
    setTags((prevState) => prevState.concat(newTagValue))
  }

  const collectionBtnStyle = (activeCreating === 'collectionCreating') ? 'underlined' : '';
  const cardBtnStyle = (activeCreating === 'cardCreating') ? 'underlined' : '';

  return (
    <div className="collection-creating-form-wrapper">
      <form className="collection-creating-form" onKeyDown={handleKeyEnter}>
        <InputBox 
          className="collectionName"
          labelContent="Название"
          necessary={true}
          value={colletionName} 
          onChange={(e) => setColletionName(e.target.value)}
          onValidationChange={handleValidationChange}
          disable={isCollectionSetting}
        />

        <TextArea 
          id="collectionDescription"
          label="Введите описание"
          placeholder='Введите описание'
          value={collectionDescription}
          onChange={(e) => setCollectionDescription(e.target.value)}
        />

        <div className="card-collection-creating-nav-buttons">
          <div className={`${collectionBtnStyle}`}>
            <Button btnStyle='link' label='Приватная' id='asdasd' action={openCollectionCreating} textColor='black' fontSize='big' />
          </div>
          <div className={`${cardBtnStyle}`}>
            <Button btnStyle='link' label='Общедоступная' action={openCardCreating} textColor='black' fontSize='big' />
          </div>
        </div>
        <div className='tags-creating-form'>
          <TagsCreatingForm
            tags={tags}
            setNewTag={setNewTag}
            deleteTag={deleteTag}
          />
        </div>
        <div className="buttons-submit-collection-creation">
          <Button btnStyle='btn' label={`${!isCollectionSetting ? 'Создать' : 'Изменить'}`} action={(e) => submitCollectionCreation(e)} />
          <Button btnStyle='btn' label='Отмена' link={'/'} />
        </div>
      </form>
    </div>
  )
}

export {
  CollectionCreatingForm,
}