import { CollectionPageBody } from './CollectionPageBody/CollectionPageBody';
import { CollectionPageHeader } from './CollectionPageHeader/CollectionPageHeader';

import './collectionPage.scss';

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

const CollectionPage = () => {
  return (
    <div className='collection-page'>
      <CollectionPageHeader />
      <CollectionPageBody collection={collection}/>
    </div>
  )
}

export {
  CollectionPage,
}