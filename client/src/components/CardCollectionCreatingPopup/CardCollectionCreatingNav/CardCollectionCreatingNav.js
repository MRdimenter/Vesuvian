import { Button } from '../../Button/Button';

import './cardCollectionCreatingNav.scss';

const CardCollectionCreatingNav = ({ activeCreating, setActiveCreating, isCollectionSetting, isCollictionAddition }) => {

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

  const collectionBtnStyle = (activeCreating === 'collectionCreating') ? 'undelined' : '';
  const cardBtnStyle = (activeCreating === 'cardCreating') ? 'undelined' : '';

  return (
    <div className="card-collection-creating-nav">
      <div className="card-collection-creating-nav-buttons">
        <div className={`${collectionBtnStyle}`}>
          <Button 
            btnStyle='link'
            label='Коллекция'
            id='asdasd'
            action={openCollectionCreating}
            textColor={isCollictionAddition ? 'grey' : 'black'}
            fontSize='big'
            disabled={isCollictionAddition || isCollectionSetting}
          />
        </div>
        <div className={`${cardBtnStyle}`}>
          <Button
            btnStyle='link'
            label='Карточка'
            action={openCardCreating}
            textColor={isCollectionSetting ? 'grey' : 'black'}
            fontSize='big'
            disabled={isCollictionAddition || isCollectionSetting}
          />
        </div>
      </div>
    </div>
  ) 
}

export {
  CardCollectionCreatingNav,
}