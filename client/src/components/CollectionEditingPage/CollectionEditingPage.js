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

const CollectionEditingPage = () => {
  return (
    <div className='collection-page'>
      <CollectionEditingPageHeader />
      <CollectionEditingPageBody collection={collection}/>
    </div>
  )
}

export {
  CollectionEditingPage,
}