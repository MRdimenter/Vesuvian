import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody';

import './collectionEditingPage.scss';

const CollectionEditingPage = ({ collectionId, collectionCards, onStartTraining }) => {
  // TODO important! при отсутствии карточек идет постоянный опрос сервера (да и при наличии тоже)
  // TODO а чо компонент на каждую карточку вызывается?
  // TODO collectionId возможно временно (в зависимости где будет кнопка удаления коллекции)
  // console.log('CollectionEditingPage collectionData: ', collectionData);
  // const collectionId = collectionData[0]?.collection_id;

  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader
        collectionId={collectionId}
        onStartTraining={onStartTraining}
      />
      <CollectionEditingPageBody
        collectionId={collectionId}
        collectionCards={collectionCards}
      />
    </div>
  )
}

export {
  CollectionEditingPage,
}