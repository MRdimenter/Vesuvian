import moment from 'moment';
import { CollectionPageGroup } from './CollectionsPageGroup/CollectionPageGroup';

import './collectionsPageBody.scss';
import { sortObjectValues } from '../helpers/sortObjectValues';
import { DESC } from '../CollectionsPage';
import { convertObjectToArray } from '../helpers/convertObjectToArray';

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

function getAlfaFilterObjects(collections, groupingProp, sortingProp) {
  const groupTitles = new Map();
  const groupedCollections = {};

  collections.forEach((element) => {
    switch (groupingProp) {
      case 'name':
        groupTitles.set(element.name[0].toUpperCase())
        break;
      // группировка по дате
      // case 'created_at':
      //   const dateObj = new Date(element.created_at);
      //   const momentObj = moment(dateObj);
      //   const momentString = momentObj.format('YYYY.MM.DD');
      //   groupTitles.set(momentString)
      //   break;
      default:
        break;
    }
  });

  const groupTitlesArray = Array.from(groupTitles.keys());

  groupTitlesArray.forEach(letter => {
    groupedCollections[letter] = [];
  });

  console.log('groupedCollections: ', groupedCollections);

  collections.forEach((collection) => {
    switch (groupingProp) {
      case 'name':
        groupedCollections[collection.name[0].toUpperCase()].push(collection);
        break;
      // для группировки по дате
      // case 'created_at':
      //   const dateObj = new Date(collection.created_at);
      //   const momentObj = moment(dateObj);
      //   const momentString = momentObj.format('YYYY.MM.DD');
      //   groupedCollections[momentString].push(collection);
      //   break;
      default:
        break;
    }
  })
  
  const descending = sortingProp.sortDirection === DESC;
  console.log('!!! sortingProp: ', sortingProp);
  // created_at
  const sortedGoups = sortObjectValues(groupedCollections, descending, sortingProp.prop)

  // TODO переделать на массив объектов
  return Object.entries(sortedGoups);
}

const CollectionsPageBody = ({onCollectionCardClick, sortedCollections, groupingProp, sortingProp}) => {
  const groupedCollections = getAlfaFilterObjects(sortedCollections, groupingProp, sortingProp);
  console.log('groupedCollections: ', groupedCollections);

  return (
    <div className="collections-page-body">
      {getCollectionsPageGroups(groupedCollections, onCollectionCardClick)}
    </div>
  )
}

export {
  CollectionsPageBody,
}