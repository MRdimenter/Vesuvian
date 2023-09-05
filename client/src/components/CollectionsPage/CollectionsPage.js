import { CollectionPageBody } from './CollectionPageBody/CollectionPageBody';
import { CollectionPageHeader } from './CollectionPageHeader/CollectionPageHeader';

import './collectionsPage.scss';

const CollectionsPage = () => {
  

  return (
    <div className='collections-page'>
      <CollectionPageHeader />
      <CollectionPageBody />
    </div>
  )
}

export {
  CollectionsPage,
}