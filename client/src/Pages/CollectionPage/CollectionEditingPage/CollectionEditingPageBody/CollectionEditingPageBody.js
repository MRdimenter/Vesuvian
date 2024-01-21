import { useLocation, useNavigate } from 'react-router-dom';
import { CollectionCard } from "../../../../components/CollectionCard/CollectionCard";
import { NumberedCard } from "./NumberedCard/NumberedCard"

import './collectionEditingPageBody.scss';

const CollectionEditingPageBody = ({ collectionId, collectionCards }) => {
  const navigate = useNavigate();
  const location = useLocation()
  
  const onCollectionCardClick = () => {
    navigate('/cardCreatingPage', { state: { from: 'CollectionEditingPageBody', collectionIdForAddition: collectionId } });
  }

  const getCards = (collectionCards) => {
    return (
      <>
        {
          collectionCards.map((card, index) => {
            const {term} = card;
              return (
                <NumberedCard 
                  key={term + index}
                  title={term}
                  number={index + 1}
                  onCollectionCardClick={onCollectionCardClick}
                />
              )
          })
        }
      </>
    )
  }

  const addingCardTitle = {name: '+'}

  return (
    <div className="collection-page-body">
      {getCards(collectionCards)}
      <div className="new-card">
        <CollectionCard 
          collection={addingCardTitle}
          backgroundStyle='dark-card-bg'
          onCollectionCardClick={onCollectionCardClick}
        />
      </div>
    </div>
  )
}

export {
  CollectionEditingPageBody,
}