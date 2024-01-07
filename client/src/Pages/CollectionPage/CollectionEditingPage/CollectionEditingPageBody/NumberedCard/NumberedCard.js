

import { CollectionCard } from '../../../../../components/CollectionCard/CollectionCard';

import './numberedCard.scss';

//TODO rename cardTitle (and collection in CollectionCard.js)
// todo why named NumberedCard? )
const NumberedCard = ({title, number}) => {
  const cardTitle = {name: title}

  const onCollectionCardClick = () => {
    console.log('onCollectionCardClick from NumberedCard');
  }

  return (
    <div className="numbered-card">
      <CollectionCard 
        collection={cardTitle}
        onCollectionCardClick={onCollectionCardClick}
      />
      <div className="card-number h5-promo">
        <span>{number}</span>
      </div>
    </div>
  )
}

export {
  NumberedCard,
}