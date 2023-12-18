import moment from 'moment';
import { CollectionPageGroup } from './CollectionsPageGroup/CollectionPageGroup';

import './collectionsPageBody.scss';

const getCollectionsPageGroups = (sortedCollections, onCollectionCardClick) => {
  return (
    <>
      {sortedCollections.map((sortedCollection) => {
        return (
          <CollectionPageGroup key={sortedCollection[0]} collection={sortedCollection} onCollectionCardClick={onCollectionCardClick}/>
        )
      })}
    </>
  )
}

function getAlfaFilterObjects(collections, sortingProp) {
  const groupTitles = new Map();
  const sortedCollections = {};

  collections.forEach((element) => {
    switch (sortingProp) {
      case 'name':
        groupTitles.set(element.name[0].toUpperCase())
        break;
      case 'created_at':
        const dateObj = new Date(element.created_at);
        const momentObj = moment(dateObj);
        const momentString = momentObj.format('YYYY.MM.DD');
        groupTitles.set(momentString)
        break;
      default:
        break;
    }
  });

  const groupTitlesArray = Array.from(groupTitles.keys());

  groupTitlesArray.forEach(letter => {
    sortedCollections[letter] = [];
  });

  collections.forEach((collection) => {
    switch (sortingProp) {
      case 'name':
        sortedCollections[collection.name[0].toUpperCase()].push(collection);
        break;
      case 'created_at':
        const dateObj = new Date(collection.created_at);
        const momentObj = moment(dateObj);
        const momentString = momentObj.format('YYYY.MM.DD');
        sortedCollections[momentString].push(collection);
        break;
      default:
        break;
    }
  })

  // TODO переделать на массив объектов
  return Object.entries(sortedCollections);
}

const CollectionsPageBody = ({onCollectionCardClick, sortedCollections, sortingProp}) => {

  const groupedCollections = getAlfaFilterObjects(sortedCollections, sortingProp);

  return (
    <div className="collections-page-body">
      {getCollectionsPageGroups(groupedCollections, onCollectionCardClick)}
    </div>
  )
}

export {
  CollectionsPageBody,
}