import { useState } from 'react';
import { CardsPageHeader } from './CardsPageHeader/CardsPageHeader';
import { CardsPageContent } from './CardsPageContent/CardsPageContent';

import './cardsPage.scss';

const cardsInCollection = 10;
const collectionInfo = {
  cardsInCollection: 10,
}

//TODO: временная заглушка
const content_last = {
  frontSide: {
    text: 'Hello'
  },
  backSide: {
    text: 'Привет'
  }
}

const request = {
  "term": "Term 1", // термин
  "definition": "Definition 1", //определение
  "hint": "Hint 1", //подсказка
  "imageURL": "http://example.com/image1.jpg" //url картинки если она присутствует, проверка на null  
}

const getContent = (request) => {
  return {
    frontSide: {
      text: request.term,
    },
    backSide: {
      text: request.definition,
    },
    hint: request.hint,
    imageURL: request.imageURL && null,
  }
}

const content = getContent(request);

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