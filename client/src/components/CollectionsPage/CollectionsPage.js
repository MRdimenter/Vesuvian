import { CollectionsPageBody } from './CollectionsPageBody/CollectionsPageBody';
import { CollectionsPageHeader } from './CollectionsPageHeader/CollectionsPageHeader';
import './collectionsPage.scss';

const collections = [
  'Basic English',
  'Countries',
  'C++',
  'Cinema',
  'Cats',
  'Java',
]

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

const CollectionsPage = () => {
  const sortedCollections = getAlfaFilterObjects(collections);

  return (
    <div className='collections-page'>
      <CollectionsPageHeader />
      <CollectionsPageBody sortedCollections={sortedCollections}/>
    </div>
  )
}

export {
  CollectionsPage,
}