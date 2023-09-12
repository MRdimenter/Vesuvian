import { CollectionCard } from '../../../CollectionCard/CollectionCard.js';
import { Title } from '../../../Title/Title.js';

import './collectionPageGroup.scss';

const getCollectionCards = (titles) => {
  return (
    <>
      {titles.map((title) => {
        return (
          <div className='collection-card-wrapper'>
            <CollectionCard title={title}/>
          </div>
        )
      })}
    </>
  )
}

const CollectionPageGroup = ({collection}) => {
  const firstLetterOfCollectionTitle = collection[0];
  const collectionTitles = collection[1];

  return (
    <div className="collection-page-group">
      <Title text={firstLetterOfCollectionTitle} />
      <div className='collection-cards-wrapper'>
        {getCollectionCards(collectionTitles)}
        
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