import { CollectionCard } from '../../../CollectionCard/CollectionCard.js';
import { Title } from '../../../Title/Title.js';

import './collectionPageGroup.scss';

const CollectionPageGroup = ({collection, onCollectionCardClick}) => {
  const firstLetterOfCollectionTitle = collection[0];
  const collectionsByFirstLetter = collection[1];

  return (
    <div className="collection-page-group">
      <Title text={firstLetterOfCollectionTitle} />
      <div className='collection-cards-wrapper'>
        {getCollectionCards(collectionsByFirstLetter, onCollectionCardClick)}
      </div>
      
    </div>
  )
}

function getCollectionCards(firstLetterOfCollection, onCollectionCardClick) {
  return (
    <>
      {firstLetterOfCollection.map((collection) => {
        return (
          <div className='collection-card-wrapper'>
            <CollectionCard collection={collection} onCollectionCardClick={onCollectionCardClick}/>
          </div>
        )
      })}
    </>
  )
}

export {
  CollectionPageGroup,
}