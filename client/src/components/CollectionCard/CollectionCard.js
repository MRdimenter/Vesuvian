import './collectionCard.scss';

const CollectionCard = ({title}) => {
  console.log('CollectionCard: ', title);
  return (
    <div className="collection-card">
      <span className='collection-card-title middle-promo'>{title}</span>
    </div>
  )
}

export {
  CollectionCard,
}