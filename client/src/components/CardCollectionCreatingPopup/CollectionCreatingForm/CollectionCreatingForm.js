import { useState } from 'react';
import { Button } from '../../Button/Button';
import { CardTag } from '../../CardTag/CardTag';

import './collectionCreatingForm.scss';

const CollectionCreatingForm = () => {
  const [activeCreating, setActiveCreating] = useState('collectionCreating')

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

  const submitCollectionCreation = () => {
    console.log('submitCollectionCreation');
  }

  const submitCollectionCancel = () => {
    console.log('submitCollectionCancel');
  }

  const collectionBtnStyle = (activeCreating === 'collectionCreating') ? 'undelined' : '';
  const cardBtnStyle = (activeCreating === 'cardCreating') ? 'undelined' : '';

  return (
    <div className="collection-creating-form-wrapper">
      <form className="collection-creating-form">
        <label className='colletion-name-label' for="colletionName">Название</label>
        <input className='colletion-name-input' type="text" id="colletionName" name="colletionName" required minlength="4" maxlength="8" size="10" />
        <span className='small-text'>Подсказка</span>
        <textarea className='collection-description-textarea' type="text" placeholder='Введите описание' style={{ padding: '10px 0' }} />
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