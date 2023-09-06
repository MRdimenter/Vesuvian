import { CollectionPageBody } from './CollectionPageBody/CollectionPageBody';
import { CollectionPageHeader } from './CollectionPageHeader/CollectionPageHeader';

import './collectionPage.scss';

const CollectionPage = () => {
  return (
    <div className='collection-page'>
      <CollectionPageHeader />
      <CollectionPageBody />
    </div>
  )
}

export {
  CollectionPage,
}