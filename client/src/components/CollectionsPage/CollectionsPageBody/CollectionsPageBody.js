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

const CollectionsPageBody = ({sortedCollections, onCollectionCardClick}) => {
  return (
    <div className="collections-page-body">
      {getCollectionsPageGroups(sortedCollections, onCollectionCardClick)}
    </div>
  )
}

export {
  CollectionsPageBody,
}