import './collectionCard.scss';

const CollectionCard = ({title, backgroundStyle}) => {
  const cardStyle = `${backgroundStyle || 'light-card-bg'}`
  return (
    <div className={`collection-card ${cardStyle}`}>
      <span className={`collection-card-title middle-promo`}>{title}</span>
    </div>
  )
}

export {
  CollectionCard,
}