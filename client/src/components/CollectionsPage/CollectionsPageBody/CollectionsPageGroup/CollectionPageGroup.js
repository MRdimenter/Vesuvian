import { CollectionCard } from '../../../CollectionCard/CollectionCard.js';
import { Title } from '../../../Title/Title.js';

import './collectionPageGroup.scss';

const getCollectionCards = (firstLetterOfCollection) => {
  return (
    <>
      {firstLetterOfCollection.map((collection) => {
        const collectionTitles = collection.name;
        const collectionTags = collection.tags;
        return (
          <div className='collection-card-wrapper'>
            <CollectionCard title={collectionTitles} tags={collectionTags}/>
          </div>
        )
      })}
    </>
  )
}

const CollectionPageGroup = ({collection}) => {
  const firstLetterOfCollectionTitle = collection[0];
  const collectionsByFirstLetter = collection[1];

  return (
    <div className="collection-page-group">
      <Title text={firstLetterOfCollectionTitle} />
      <div className='collection-cards-wrapper'>
        {getCollectionCards(collectionsByFirstLetter)}
      </div>
      
    </div>
  )
}

export {
  CollectionPageGroup,
}

/*
      <div className="collection-page-group-title h2-promo">
        <span>{cardGroup.title}</span>
      </div>
      <div className='collection-cards-wrapper'>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
        <div className='collection-card-wrapper'>
          <CollectionCard />
        </div>
      </div>
*/