import { CardTag } from '../CardTag/CardTag';

import './collectionCard.scss';

const CollectionCard = ({title, tags, backgroundStyle}) => {
  const cardStyle = `${backgroundStyle || 'light-card-bg'}`

  const getCardTags = (tags) => {
    if (tags?.length) {
      return (
        <>
          {tags.map((tagObject) => {
            return (
            <div key={tagObject.id} className="collection-card-tags-wrapper">
              <CardTag tagText={tagObject.name}/>
            </div>
            )
          })}
        </>
      )
    }
    return null;
  }

  return (
    <div className={`collection-card ${cardStyle}`}>
      <span className={`collection-card-title middle-promo`}>{title}</span>
      {tags?.length && 
        <div className='collection-card-tags'>
          {getCardTags(tags)}
        </div>
      }
    </div>
  )
}

export {
  CollectionCard,
}