import { CardTag } from '../CardTag/CardTag';

import './collectionCard.scss';

//TODO rename collection (используется теперь не только как карта (этикетка) коллекции, но и как экземпляр карты коллекции)
const CollectionCard = ({collection={name: '', tags: null}, onCollectionCardClick, backgroundStyle}) => {
  const {name, tags} = collection;
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

  const onCollectionCardClickHandle = () => {
    if (typeof onCollectionCardClick === 'function') {
      onCollectionCardClick(collection); 
    } else {
      console.log('onCollectionCardClickHandle');
    }
  }

  return (
    <div className={`collection-card ${cardStyle}`} onClick={onCollectionCardClickHandle}>
      <span className={`collection-card-title middle-promo`}>{name}</span>
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