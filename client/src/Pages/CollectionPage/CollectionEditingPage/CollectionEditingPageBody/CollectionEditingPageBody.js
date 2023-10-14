
import { CollectionCard } from "../../../../components/CollectionCard/CollectionCard";
import { NumberedCard } from "./NumberedCard/NumberedCard"

import './collectionEditingPageBody.scss';

const CollectionEditingPageBody = ({ collectionData }) => {

  const getCards = (collectionData) => {
    return (
      <>
        {
          collectionData.map((card, index) => {
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
      {getCards(collectionData)}
      <div className="new-card">
        <CollectionCard collection={addingCardTitle} backgroundStyle='dark-card-bg'/>
      </div>
    </div>
  )
}

export {
  CollectionEditingPageBody,
}