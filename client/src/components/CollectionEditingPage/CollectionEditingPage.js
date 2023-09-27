import { useSelector } from 'react-redux';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody copy';
import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';

import './collectionEditingPage.scss';

const collection = [
  {
    term: 'Hello'
  },
  {
    term: 'It'
  },
  {
    term: 'Is'
  },
  {
    term: 'Me'
  },
  {
    term: 'I'
  },
  {
    term: 'Have'
  },
  {
    term: 'Thought'
  },
  {
    term: 'About'
  },
  {
    term: 'Us'
  },
  {
    term: 'For'
  },
  {
    term: 'A'
  },
  {
    term: 'Long'
  },
  {
    term: 'Time'
  },
]

const collectionTags = [
  'English',
  'Nature',
  'Animals'
]

const CollectionEditingPage = () => {
  //const dispatch = useDispatch();
  const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  console.log('loadingCollectionData: ', loadingCollectionData);
  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader tags={collectionTags}/>
      <CollectionEditingPageBody collection={collection}/>
    </div>
  )
}

export {
  CollectionEditingPage,
}