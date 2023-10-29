import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody';

import './collectionEditingPage.scss';

const CollectionEditingPage = ({collectionData, collectionTags, onStartTraining}) => {
  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader tags={collectionTags} onStartTraining={onStartTraining} />
      <CollectionEditingPageBody collectionData={collectionData} />
    </div>
  )
}

export {
  CollectionEditingPage,
}