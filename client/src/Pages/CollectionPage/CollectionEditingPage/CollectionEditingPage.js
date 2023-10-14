import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody';

import './collectionEditingPage.scss';

const collectionTags_1 = [
  'English',
  'Nature',
  'Animals'
]

const CollectionEditingPage = ({collectionData}) => {
  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader tags={collectionTags_1} />
      <CollectionEditingPageBody collectionData={collectionData} />
    </div>
  )
}

export {
  CollectionEditingPage,
}