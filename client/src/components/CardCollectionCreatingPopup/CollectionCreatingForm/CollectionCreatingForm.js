import { useState } from 'react';
import { Button } from '../../Button/Button';
import { CardTag } from '../../CardTag/CardTag';
import { InputBox } from '../../Forms/InputBox';
import { TextArea } from '../../InputComponents/TextArea/TextArea';
import { OAuth2Service } from '../../../common/utils/OAuth2Service';
import { ApiService } from '../../../common/utils/ApiService';

import './collectionCreatingForm.scss';


const CollectionCreatingForm = () => {
  const [activeCreating, setActiveCreating] = useState('collectionCreating')
  const [colletionName, setColletionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

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

  const tags = ['English']
  const getTags = (tags) => {
    return (
      <>
        {tags.map((tag) => {
          return (<CardTag key={tag} tagText={tag} />) //TODO bad key
        })}
      </>
    )
  }

  const handleSubmit = () => {
    console.log('handleSubmit');
  }

  const submitCollectionCreation = async () => {
    console.log('submitCollectionCreation');
    //TODO попробую сначала так, а потом через Action
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    const response = await apiService.postCreateCollection();
    console.log('postCreateCollection: response: ', response);
  }

  const submitCollectionCancel = () => {
    console.log('submitCollectionCancel');
  }

  const collectionBtnStyle = (activeCreating === 'collectionCreating') ? 'undelined' : '';
  const cardBtnStyle = (activeCreating === 'cardCreating') ? 'undelined' : '';

  return (
    <div className="collection-creating-form-wrapper">
      <form className="collection-creating-form">

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
        <div className="adding-collection-tags">
          {getTags(tags)}
          {tags.length < 3 && <Button btnStyle='link' label='+добавить тег' action={handleSubmit} />}
        </div>
        <div className="buttons-submit-collection-creation">
          <Button btnStyle='btn' label='Создать' action={submitCollectionCreation} />
          <Button btnStyle='btn' label='Отмена' action={submitCollectionCancel} />
        </div>
      </form>
    </div>
  )
}

export {
  CollectionCreatingForm,
}