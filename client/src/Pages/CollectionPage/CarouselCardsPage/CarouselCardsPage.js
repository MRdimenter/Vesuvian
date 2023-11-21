import { useState } from 'react';
import { CardsPageHeader } from './CardsPageHeader/CardsPageHeader';
import { CardsPageContent } from './CardsPageContent/CardsPageContent';

import './cardsPage.scss';

const getContent = (collectionData) => {
  return {
    frontSide: {
      text: collectionData.term,
    },
    backSide: {
      text: collectionData.definition,
    },
    hint: collectionData.hint,
    imageURL: collectionData.imageURL && null,
  }
}

const CarouselCardsPage = ({collectionData}) => {
  const collectionInfo = {
    cardsInCollection: collectionData.length,
  }

  console.log('collectionData: ', collectionData);

  const content = getContent(collectionData);

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
          collectionData={collectionData}
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