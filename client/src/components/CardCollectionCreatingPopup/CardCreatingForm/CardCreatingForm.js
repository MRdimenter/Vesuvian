import { Button } from '../../Button/Button';
import { CollectionCard } from '../../CollectionCard/CollectionCard';
import { Icon } from '../../Icon/Icon';

import './cardCreatingForm.scss';

const CardCreatingForm = () => {
  const attachingImage = () => {
    console.log('click attachingImage');
  }

  const submitCardCreation = () => {
    console.log('click submitCardCreation');
  }

  return (
    <form className="card-creating-form">
      <div className="two-sides-card">
        {/* TODO light-card-bg and border */}
        <CollectionCard title='+' backgroundStyle='dark-card-bg'/>
        <CollectionCard title='+' backgroundStyle='dark-card-bg'/>
      </div>
      <div className="card-params">
        <div className="hint-column">
          <span className='small-text'>Подсказка</span>
          <textarea className='card-hint-textarea' type="text" placeholder='Collection that contains basic english words' style={{padding: '10px 0'}}/>
        </div>
        <div className="collection-selection-column">
          <span className='small-text'>Выбрать коллекцию</span>
          <select className="collection-selection" id="collection">
            <option value="Englich">Englich</option>
          </select>
          <div className="attaching-image" onClick={attachingImage}>
            <Icon iconName='paperclip-svg' iconFormat='svg' width="25" height="25" />
            <span className='attaching-image-text'>Прикрепить изображение</span>
          </div>
        </div>
      </div>
      <div className="button-submit-card-creation">
        <Button btnStyle='btn' label='Коллекция' action={submitCardCreation} />
      </div>
    </form>
  )
}

export {
  CardCreatingForm,
}