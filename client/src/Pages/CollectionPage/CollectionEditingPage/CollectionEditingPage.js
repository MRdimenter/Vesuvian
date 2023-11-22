import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody';

import './collectionEditingPage.scss';

const CollectionEditingPage = ({collectionId, collectionCards, collectionTags, onStartTraining}) => {
  // TODO а чо компонент на каждую карточку вызывается?
  // TODO collectionId возможно временно (в зависимости где будет кнопка удаления коллекции)
  // console.log('CollectionEditingPage collectionData: ', collectionData);
  // const collectionId = collectionData[0]?.collection_id;
  console.log('CollectionEditingPage collectionId: ', collectionId);
  
  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader tags={collectionTags} onStartTraining={onStartTraining} collectionId={collectionId}/>
      <CollectionEditingPageBody collectionCards={collectionCards} />
    </div>
  )
}

export {
  CollectionEditingPage,
}