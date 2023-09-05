import { CollectionPageGroup } from './CollectionPageGroup/CollectionPageGroup';

import './collectionPageBody.scss';

const content = [
  'Basic English',
  'Countries',
  'C++',
  'Cinema',
  'Cats',
  'Java',
]

const CollectionPageBody = () => {
  
  return (
    <div className="collection-page-body">
      <CollectionPageGroup />
    </div>
  )
}

export {
  CollectionPageBody,
}