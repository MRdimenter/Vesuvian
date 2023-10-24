import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody';

import './collectionEditingPage.scss';

const collectionTags_1 = [
  'English',
  'Nature',
  'Animals'
]

const CollectionEditingPage = ({collectionData, onStartTraining}) => {
  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader tags={collectionTags_1} onStartTraining={onStartTraining} />
      <CollectionEditingPageBody collectionData={collectionData} />
    </div>
  )
}

export {
  CollectionEditingPage,
}