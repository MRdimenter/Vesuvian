import { CollectionCard } from "../../../CollectionCard/CollectionCard"

import './numberedCard.scss';

const NumberedCard = ({title, number}) => {
  return (
    <div className="numbered-card">
      <CollectionCard title={title}/>
      <div className="card-number h5-promo">
        <span>{number}</span>
      </div>
    </div>
  )
}

export {
  NumberedCard,
}