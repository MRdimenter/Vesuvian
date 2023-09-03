import { CollectionCard } from './CollectionCard/CollectionCard';

import './collectionPageGroup.scss';

const cardGroup = {
  title: 'B', //todo вычислять для каждой группы
  cardCollection: {
    title: 'BasicEnglish',
  }
}

const CollectionPageGroup = () => {
  return (
    <div className="collection-page-group">
      <div className="collection-page-group-title">
        <span>{cardGroup.title}</span>
      </div>
      <div className='collection-card-wrapper'></div>
        <CollectionCard />
    </div>
  )
}

export {
  CollectionPageGroup,
}