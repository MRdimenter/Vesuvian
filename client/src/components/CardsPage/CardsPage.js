import { useState } from 'react';
import { CardsPageHeader } from './CardsPageHeader/CardsPageHeader';
import { CardsPageContent } from './CardsPageContent/CardsPageContent';

import './cardsPage.scss';

const cardsInCollection = 3;
const collectionInfo = {
  cardsInCollection: 3,
}

//TODO: временная заглушка
const content = {
  frontSide: {
    text: 'Hello'
  },
  backSide: {
    text: 'Привет'
  }
}

const CardsPage = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, cardsInCollection));
  };

  return (
    <div className='cards-page'>
      <CardsPageHeader currentPage={currentPage} cardsInCollection={collectionInfo.cardsInCollection} />
      <div className="cards-page-body">
        <CardsPageContent content={content} collectionInfo={collectionInfo} currentPage={currentPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
      </div>
    </div>
  )
}

export {
  CardsPage,
}