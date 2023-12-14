import { useState } from 'react';
import { Button } from '../../Button/Button';
import { CardTag } from '../../CardTag/CardTag';
import { InputBox } from '../../Forms/InputBox';
import { TextArea } from '../../InputComponents/TextArea/TextArea';
import { OAuth2Service } from '../../../common/utils/OAuth2Service';
import { ApiService } from '../../../common/utils/ApiService';
import { WhithCornerDeleteButton } from '../../WhithCornerDeleteButton/WhithCornerDeleteButton';
import { TagCreatingForm } from '../TagCreatingForm/TagCreatingForm';

import './collectionCreatingForm.scss';
import { CardCreatingTextarea } from '../CardCreatingForm/CardCreatingTextarea/CardCreatingTextarea';
import { TagsCreatingForm } from './TagsCreatingForm/TagsCreatingForm';


const CollectionCreatingForm = () => {
  const [activeCreating, setActiveCreating] = useState('collectionCreating')
  const [colletionName, setColletionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [tags, setTags] = useState([]);
  

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

  const submitCollectionCreation = async () => {
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

    const response = await apiService.postCreateCollection(collectionData);
    console.log('postCreateCollection: response: ', response);
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

  const collectionBtnStyle = (activeCreating === 'collectionCreating') ? 'undelined' : '';
  const cardBtnStyle = (activeCreating === 'cardCreating') ? 'undelined' : '';

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
        
        <TagsCreatingForm
          tags={tags}
          setTags={setTags}
          deleteTag={deleteTag}
        />
        <div className="buttons-submit-collection-creation">
          <Button btnStyle='btn' label='Создать' action={submitCollectionCreation} />
          <Button btnStyle='btn' label='Отмена' link={'/'} />
        </div>
      </form>
    </div>
  )
}

export {
  CollectionCreatingForm,
}