import { CollectionCard } from "../../CollectionCard/CollectionCard";
import { NumberedCard } from "./NumberedCard/NumberedCard"

import './collectionPageBody.scss';

const CollectionPageBody = ({ collection }) => {

  const getCards = (collection) => {
    return (
      <>
        {
          collection.map((card, index) => {
            const {term} = card;
              return (
                <NumberedCard title={term} number={index + 1} />
              )
          })
        }
      </>
    )
  }

  return (
    <div className="collection-page-body">
      {getCards(collection)}
      <div className="new-card">
        <CollectionCard title='+' backgroundStyle='dark-card-bg'/>
      </div>
    </div>
  )
}

export {
  CollectionPageBody,
}