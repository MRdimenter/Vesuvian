import { CollectionCard } from '../../../CollectionCard/CollectionCard.js';
import { Title } from '../../../Title/Title.js';

import './collectionPageGroup.scss';

const collections = [
  'Basic English',
  'Java',
  'Countries',
  'C++',
  'Cinema',
  'Cats',
]

const cardGroup = {
  title: 'B', //todo вычислять для каждой группы
  cardCollection: {
    title: 'BasicEnglish',
  }
}

function getAlfaFilterObjects(collections) {
  const firstLetters = new Map();
  const sortedCollections = {};
  collections.forEach(element => {
    firstLetters.set(element[0])
  });

  const sortedFirstLetters = Array.from(firstLetters.keys()).sort();  
  sortedFirstLetters.forEach(letter => {
    sortedCollections[letter] = [];
  });

  collections.forEach((collection) => {   //todo заменить collection скорее всего на collection.title
    sortedCollections[collection[0]].push(collection);
  })

  return Object.entries(sortedCollections);
}

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
  console.log('collection: ', collection);
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