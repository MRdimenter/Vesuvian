import { CollectionPageGroup } from './CollectionsPageGroup/CollectionPageGroup';

import './collectionsPageBody.scss';

const getCollectionsPageGroups = (sortedCollections) => {
  return (
    <>
      {sortedCollections.map((sortedCollection) => {
        return (
          <CollectionPageGroup collection={sortedCollection}/>
        )
      })}
    </>
  )
}

const  CollectionsPageBody = ({sortedCollections}) => {
  return (
    <div className="collections-page-body">
      {getCollectionsPageGroups(sortedCollections)}
    </div>
  )
}

export {
  CollectionsPageBody,
}