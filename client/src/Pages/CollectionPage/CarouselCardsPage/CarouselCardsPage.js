import { useState } from 'react';
import { CardsPageHeader } from './CardsPageHeader/CardsPageHeader';
import { CardsPageContent } from './CardsPageContent/CardsPageContent';

import './cardsPage.scss';

const getContent = (collectionCards) => {
  return {
    frontSide: {
      text: collectionCards.term,
    },
    backSide: {
      text: collectionCards.definition,
    },
    hint: collectionCards.hint,
    imageURL: collectionCards.imageURL && null,
  }
}

const CarouselCardsPage = ({collectionCards}) => {
  const collectionInfo = {
    cardsInCollection: collectionCards.length,
  }

  console.log('collectionCards: ', collectionCards);

  const content = getContent(collectionCards);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='cards-page'>
      <CardsPageHeader currentPage={currentPage} cardsInCollection={collectionInfo.cardsInCollection} />
      <div className="cards-page-body">
        <CardsPageContent
          collectionCards={collectionCards}
          content={content}
          collectionInfo={collectionInfo}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage} />
      </div>
    </div>
  )
}

export {
  CarouselCardsPage,
}