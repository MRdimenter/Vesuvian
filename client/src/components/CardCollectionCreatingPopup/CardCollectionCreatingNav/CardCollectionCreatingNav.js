import { Button } from '../../Button/Button';

import './cardCollectionCreatingNav.scss';

// TODO универсальный компонент возможно в компоненте whithNav
const CardCollectionCreatingNav = ({ activeCreating, setActiveCreating, isCollectionSetting, isCollectionAddition }) => {

  const openCollectionCreating = (e) => {
   if (activeCreating !== 'collectionCreating') {
    setActiveCreating('collectionCreating');
   } 
  }

  const openCardCreating = () => {
    if (activeCreating !== 'cardCreating') {
     setActiveCreating('cardCreating');
    } 
   }

  const collectionBtnStyle = (activeCreating === 'collectionCreating') ? 'underlined' : '';
  const cardBtnStyle = (activeCreating === 'cardCreating') ? 'underlined' : '';

  return (
    <div className="card-collection-creating-nav">
      <div className="card-collection-creating-nav-buttons">
        <div className={`${collectionBtnStyle}`}>
          <Button 
            btnStyle='link'
            label='Коллекция'
            id='asdasd' //TODO why? )
            action={openCollectionCreating}
            textColor={isCollectionAddition ? 'grey' : 'black'}
            fontSize='big'
            disabled={isCollectionAddition || isCollectionSetting}
          />
        </div>
        <div className={`${cardBtnStyle}`}>
          <Button
            btnStyle='link'
            label='Карточка'
            action={openCardCreating}
            textColor={isCollectionSetting ? 'grey' : 'black'}
            fontSize='big'
            disabled={isCollectionAddition || isCollectionSetting}
          />
        </div>
      </div>
    </div>
  ) 
}

export {
  CardCollectionCreatingNav,
}