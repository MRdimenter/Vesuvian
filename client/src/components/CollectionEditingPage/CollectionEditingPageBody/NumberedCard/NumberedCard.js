import { CollectionCard } from "../../../CollectionCard/CollectionCard"

import './numberedCard.scss';

//TODO rename cardTitle (and collection in CollectionCard.js)
const NumberedCard = ({title, number}) => {
  const cardTitle = {name: title}

  return (
    <div className="numbered-card">
      <CollectionCard collection={cardTitle}/>
      <div className="card-number h5-promo">
        <span>{number}</span>
      </div>
    </div>
  )
}

export {
  NumberedCard,
}