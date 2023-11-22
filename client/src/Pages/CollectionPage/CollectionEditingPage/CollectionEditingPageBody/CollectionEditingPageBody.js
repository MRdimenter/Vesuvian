
import { CollectionCard } from "../../../../components/CollectionCard/CollectionCard";
import { NumberedCard } from "./NumberedCard/NumberedCard"

import './collectionEditingPageBody.scss';

const CollectionEditingPageBody = ({ collectionCards }) => {

  const getCards = (collectionCards) => {
    return (
      <>
        {
          collectionCards.map((card, index) => {
            const {term} = card;
              return (
                <NumberedCard key={term + index} title={term} number={index + 1} />
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
        <CollectionCard collection={addingCardTitle} backgroundStyle='dark-card-bg'/>
      </div>
    </div>
  )
}

export {
  CollectionEditingPageBody,
}